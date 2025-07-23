import { NoopLogger, PdfTaskHelper, PdfErrorCode, Task, Rotation, PdfAnnotationSubtype, stripPdfUnwantedMarkers, PdfAnnotationBorderStyle, dateToPdfDate, PdfAnnotationColorType, PdfPageObjectType, pdfAlphaColorToWebAlphaColor, webAlphaColorToPdfAlphaColor, quadToRect, pdfDateToDate, flagsToNames, PDF_FORM_FIELD_TYPE, toIntRect, transformRect, makeMatrix, AppearanceMode, toIntSize, transformSize, PdfActionType, PdfZoomMode, MatchFlag, rectToQuad, swap, PdfPageFlattenResult } from '@embedpdf/models';
import { init } from '@embedpdf/pdfium';

/**
 * Read string from WASM heap
 * @param wasmModule - pdfium wasm module instance
 * @param readChars - function to read chars
 * @param parseChars - function to parse chars
 * @param defaultLength - default length of chars that needs to read
 * @returns string from the heap
 *
 * @public
 */
function readString(wasmModule, readChars, parseChars, defaultLength = 100) {
    let buffer = wasmModule.wasmExports.malloc(defaultLength);
    for (let i = 0; i < defaultLength; i++) {
        wasmModule.HEAP8[buffer + i] = 0;
    }
    const actualLength = readChars(buffer, defaultLength);
    let str;
    if (actualLength > defaultLength) {
        wasmModule.wasmExports.free(buffer);
        buffer = wasmModule.wasmExports.malloc(actualLength);
        for (let i = 0; i < actualLength; i++) {
            wasmModule.HEAP8[buffer + i] = 0;
        }
        readChars(buffer, actualLength);
        str = parseChars(buffer);
    }
    else {
        str = parseChars(buffer);
    }
    wasmModule.wasmExports.free(buffer);
    return str;
}
/**
 * Read arraybyffer from WASM heap
 * @param wasmModule - pdfium wasm module instance
 * @param readChars - function to read chars
 * @returns arraybuffer from the heap
 *
 * @public
 */
function readArrayBuffer(wasmModule, readChars) {
    const bufferSize = readChars(0, 0);
    const bufferPtr = wasmModule.wasmExports.malloc(bufferSize);
    readChars(bufferPtr, bufferSize);
    const arrayBuffer = new ArrayBuffer(bufferSize);
    const view = new DataView(arrayBuffer);
    for (let i = 0; i < bufferSize; i++) {
        view.setInt8(i, wasmModule.getValue(bufferPtr + i, 'i8'));
    }
    wasmModule.wasmExports.free(bufferPtr);
    return arrayBuffer;
}

class PdfCache {
    constructor(pdfium) {
        this.pdfium = pdfium;
        this.docs = new Map();
    }
    /** Open (or re-use) a document */
    setDocument(id, filePtr, docPtr) {
        let ctx = this.docs.get(id);
        if (!ctx) {
            ctx = new DocumentContext(filePtr, docPtr, this.pdfium);
            this.docs.set(id, ctx);
        }
    }
    /** Retrieve the DocumentContext for a given PdfDocumentObject */
    getContext(docId) {
        return this.docs.get(docId);
    }
    /** Close & fully release a document and all its pages */
    closeDocument(docId) {
        const ctx = this.docs.get(docId);
        if (!ctx)
            return false;
        ctx.dispose(); // tears down pages first, then FPDF_CloseDocument, free()
        this.docs.delete(docId);
        return true;
    }
}
class DocumentContext {
    constructor(filePtr, docPtr, pdfium) {
        this.filePtr = filePtr;
        this.docPtr = docPtr;
        this.pageCache = new PageCache(pdfium, docPtr);
    }
    /** Main accessor for pages */
    acquirePage(pageIdx) {
        return this.pageCache.acquire(pageIdx);
    }
    /** Tear down all pages + this document */
    dispose() {
        // 1️⃣ release all pages (with their TTL or immediate)
        this.pageCache.forceReleaseAll();
        // 2️⃣ close the PDFium document
        this.pageCache.pdf.FPDF_CloseDocument(this.docPtr);
        // 3️⃣ free the file handle
        this.pageCache.pdf.pdfium.wasmExports.free(this.filePtr);
    }
}
class PageCache {
    constructor(pdf, docPtr) {
        this.pdf = pdf;
        this.docPtr = docPtr;
        this.cache = new Map();
    }
    acquire(pageIdx) {
        let ctx = this.cache.get(pageIdx);
        if (!ctx) {
            const pagePtr = this.pdf.FPDF_LoadPage(this.docPtr, pageIdx);
            ctx = new PageContext(this.pdf, this.docPtr, pageIdx, pagePtr, () => {
                this.cache.delete(pageIdx);
            });
            this.cache.set(pageIdx, ctx);
        }
        ctx.clearExpiryTimer(); // cancel any pending teardown
        ctx.bumpRefCount(); // bump ref‐count
        return ctx;
    }
    forceReleaseAll() {
        for (const ctx of this.cache.values()) {
            ctx.disposeImmediate();
        }
        this.cache.clear();
    }
}
const PAGE_TTL = 5000; // 5 seconds
class PageContext {
    constructor(pdf, docPtr, pageIdx, pagePtr, onFinalDispose) {
        this.pdf = pdf;
        this.docPtr = docPtr;
        this.pageIdx = pageIdx;
        this.pagePtr = pagePtr;
        this.onFinalDispose = onFinalDispose;
        this.refCount = 0;
        this.disposed = false;
    }
    /** Called by PageCache.acquire() */
    bumpRefCount() {
        if (this.disposed)
            throw new Error('Context already disposed');
        this.refCount++;
    }
    /** Called by PageCache.acquire() */
    clearExpiryTimer() {
        if (this.expiryTimer) {
            clearTimeout(this.expiryTimer);
            this.expiryTimer = undefined;
        }
    }
    /** Called by PageCache.release() internally */
    release() {
        if (this.disposed)
            return;
        this.refCount--;
        if (this.refCount === 0) {
            // schedule the one-and-only timer for the page
            this.expiryTimer = setTimeout(() => this.disposeImmediate(), PAGE_TTL);
        }
    }
    /** Tear down _all_ sub-pointers & the page. */
    disposeImmediate() {
        if (this.disposed)
            return;
        this.disposed = true;
        // 2️⃣ close text-page if opened
        if (this.textPagePtr !== undefined) {
            this.pdf.FPDFText_ClosePage(this.textPagePtr);
        }
        // 3️⃣ close form-fill if opened
        if (this.formHandle !== undefined) {
            this.pdf.FORM_OnBeforeClosePage(this.pagePtr, this.formHandle);
            this.pdf.PDFiumExt_ExitFormFillEnvironment(this.formHandle);
        }
        if (this.formInfoPtr !== undefined) {
            this.pdf.PDFiumExt_CloseFormFillInfo(this.formInfoPtr);
        }
        // 4️⃣ finally close the page itself
        this.pdf.FPDF_ClosePage(this.pagePtr);
        // 5️⃣ remove from the cache
        this.onFinalDispose();
    }
    // ── public helpers ──
    /** Always safe: opens (once) and returns the text-page ptr. */
    getTextPage() {
        this.ensureAlive();
        if (this.textPagePtr === undefined) {
            this.textPagePtr = this.pdf.FPDFText_LoadPage(this.pagePtr);
        }
        return this.textPagePtr;
    }
    /** Always safe: opens (once) and returns the form-fill handle. */
    getFormHandle() {
        this.ensureAlive();
        if (this.formHandle === undefined) {
            this.formInfoPtr = this.pdf.PDFiumExt_OpenFormFillInfo();
            this.formHandle = this.pdf.PDFiumExt_InitFormFillEnvironment(this.docPtr, this.formInfoPtr);
            this.pdf.FORM_OnAfterLoadPage(this.pagePtr, this.formHandle);
        }
        return this.formHandle;
    }
    /**
     * Safely execute `fn` with an annotation pointer.
     * Pointer is ALWAYS closed afterwards.
     */
    withAnnotation(annotIdx, fn) {
        this.ensureAlive();
        const annotPtr = this.pdf.FPDFPage_GetAnnot(this.pagePtr, annotIdx);
        try {
            return fn(annotPtr);
        }
        finally {
            this.pdf.FPDFPage_CloseAnnot(annotPtr);
        }
    }
    ensureAlive() {
        if (this.disposed)
            throw new Error('PageContext already disposed');
    }
}

/**
 * Format of bitmap
 */
var BitmapFormat;
(function (BitmapFormat) {
    BitmapFormat[BitmapFormat["Bitmap_Gray"] = 1] = "Bitmap_Gray";
    BitmapFormat[BitmapFormat["Bitmap_BGR"] = 2] = "Bitmap_BGR";
    BitmapFormat[BitmapFormat["Bitmap_BGRx"] = 3] = "Bitmap_BGRx";
    BitmapFormat[BitmapFormat["Bitmap_BGRA"] = 4] = "Bitmap_BGRA";
})(BitmapFormat || (BitmapFormat = {}));
/**
 * Pdf rendering flag
 */
var RenderFlag;
(function (RenderFlag) {
    RenderFlag[RenderFlag["ANNOT"] = 1] = "ANNOT";
    RenderFlag[RenderFlag["LCD_TEXT"] = 2] = "LCD_TEXT";
    RenderFlag[RenderFlag["NO_NATIVETEXT"] = 4] = "NO_NATIVETEXT";
    RenderFlag[RenderFlag["GRAYSCALE"] = 8] = "GRAYSCALE";
    RenderFlag[RenderFlag["DEBUG_INFO"] = 128] = "DEBUG_INFO";
    RenderFlag[RenderFlag["NO_CATCH"] = 256] = "NO_CATCH";
    RenderFlag[RenderFlag["RENDER_LIMITEDIMAGECACHE"] = 512] = "RENDER_LIMITEDIMAGECACHE";
    RenderFlag[RenderFlag["RENDER_FORCEHALFTONE"] = 1024] = "RENDER_FORCEHALFTONE";
    RenderFlag[RenderFlag["PRINTING"] = 2048] = "PRINTING";
    RenderFlag[RenderFlag["REVERSE_BYTE_ORDER"] = 16] = "REVERSE_BYTE_ORDER";
})(RenderFlag || (RenderFlag = {}));
const LOG_SOURCE$2 = 'PDFiumEngine';
const LOG_CATEGORY$2 = 'Engine';
/**
 * Error code of pdfium library
 */
var PdfiumErrorCode;
(function (PdfiumErrorCode) {
    PdfiumErrorCode[PdfiumErrorCode["Success"] = 0] = "Success";
    PdfiumErrorCode[PdfiumErrorCode["Unknown"] = 1] = "Unknown";
    PdfiumErrorCode[PdfiumErrorCode["File"] = 2] = "File";
    PdfiumErrorCode[PdfiumErrorCode["Format"] = 3] = "Format";
    PdfiumErrorCode[PdfiumErrorCode["Password"] = 4] = "Password";
    PdfiumErrorCode[PdfiumErrorCode["Security"] = 5] = "Security";
    PdfiumErrorCode[PdfiumErrorCode["Page"] = 6] = "Page";
    PdfiumErrorCode[PdfiumErrorCode["XFALoad"] = 7] = "XFALoad";
    PdfiumErrorCode[PdfiumErrorCode["XFALayout"] = 8] = "XFALayout";
})(PdfiumErrorCode || (PdfiumErrorCode = {}));
const browserImageDataToBlobConverter = (pdfImageData, imageType = 'image/webp') => {
    // Check if we're in a browser environment
    if (typeof OffscreenCanvas === 'undefined') {
        throw new Error('OffscreenCanvas is not available in this environment. ' +
            'This converter is intended for browser use only. ' +
            'Please use createNodeImageDataToBlobConverter() or createNodeCanvasImageDataToBlobConverter() for Node.js.');
    }
    const imageData = new ImageData(pdfImageData.data, pdfImageData.width, pdfImageData.height);
    const off = new OffscreenCanvas(imageData.width, imageData.height);
    off.getContext('2d').putImageData(imageData, 0, 0);
    return off.convertToBlob({ type: imageType });
};
/**
 * Pdf engine that based on pdfium wasm
 */
class PdfiumEngine {
    /**
     * Create an instance of PdfiumEngine
     * @param wasmModule - pdfium wasm module
     * @param logger - logger instance
     * @param imageDataToBlobConverter - function to convert ImageData to Blob
     */
    constructor(pdfiumModule, logger = new NoopLogger(), imageDataConverter = browserImageDataToBlobConverter) {
        this.pdfiumModule = pdfiumModule;
        this.logger = logger;
        this.imageDataConverter = imageDataConverter;
        this.cache = new PdfCache(this.pdfiumModule);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.initialize}
     *
     * @public
     */
    initialize() {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'initialize');
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `Initialize`, 'Begin', 'General');
        this.pdfiumModule.PDFiumExt_Init();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `Initialize`, 'End', 'General');
        return PdfTaskHelper.resolve(true);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.destroy}
     *
     * @public
     */
    destroy() {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'destroy');
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `Destroy`, 'Begin', 'General');
        this.pdfiumModule.FPDF_DestroyLibrary();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `Destroy`, 'End', 'General');
        return PdfTaskHelper.resolve(true);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocumentUrl}
     *
     * @public
     */
    openDocumentUrl(file, options) {
        const mode = options?.mode ?? 'auto';
        const password = options?.password ?? '';
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'openDocumentUrl called', file.url, mode);
        // We'll create a task to wrap asynchronous steps
        const task = PdfTaskHelper.create();
        // Start an async procedure
        (async () => {
            try {
                // Decide on approach
                if (mode === 'full-fetch') {
                    const fetchFullTask = await this.fetchFullAndOpen(file, password);
                    fetchFullTask.wait((doc) => task.resolve(doc), (err) => task.reject(err.reason));
                }
                else if (mode === 'range-request') {
                    const openDocumentWithRangeRequestTask = await this.openDocumentWithRangeRequest(file, password);
                    openDocumentWithRangeRequestTask.wait((doc) => task.resolve(doc), (err) => task.reject(err.reason));
                }
                else {
                    // mode: 'auto'
                    const { supportsRanges, fileLength, content } = await this.checkRangeSupport(file.url);
                    if (supportsRanges) {
                        const openDocumentWithRangeRequestTask = await this.openDocumentWithRangeRequest(file, password, fileLength);
                        openDocumentWithRangeRequestTask.wait((doc) => task.resolve(doc), (err) => task.reject(err.reason));
                    }
                    else if (content) {
                        // If we already have the content from the range check, use it
                        const pdfFile = { id: file.id, content };
                        this.openDocumentFromBuffer(pdfFile, password).wait((doc) => task.resolve(doc), (err) => task.reject(err.reason));
                    }
                    else {
                        const fetchFullTask = await this.fetchFullAndOpen(file, password);
                        fetchFullTask.wait((doc) => task.resolve(doc), (err) => task.reject(err.reason));
                    }
                }
            }
            catch (err) {
                this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, 'openDocumentUrl error', err);
                task.reject({
                    code: PdfErrorCode.Unknown,
                    message: String(err),
                });
            }
        })();
        return task;
    }
    /**
     * Check if the server supports range requests:
     * Sends a HEAD request and sees if 'Accept-Ranges: bytes'.
     */
    async checkRangeSupport(url) {
        try {
            this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'checkRangeSupport', url);
            // First try HEAD request
            const headResponse = await fetch(url, { method: 'HEAD' });
            const fileLength = headResponse.headers.get('Content-Length');
            const acceptRanges = headResponse.headers.get('Accept-Ranges');
            // If server explicitly supports ranges, we're done
            if (acceptRanges === 'bytes') {
                return {
                    supportsRanges: true,
                    fileLength: parseInt(fileLength ?? '0'),
                    content: null,
                };
            }
            // Test actual range request support
            const testResponse = await fetch(url, {
                headers: { Range: 'bytes=0-1' },
            });
            // If we get 200 instead of 206, server doesn't support ranges
            // Return the full content since we'll need it anyway
            if (testResponse.status === 200) {
                const content = await testResponse.arrayBuffer();
                return {
                    supportsRanges: false,
                    fileLength: parseInt(fileLength ?? '0'),
                    content: content,
                };
            }
            // 206 Partial Content indicates range support
            return {
                supportsRanges: testResponse.status === 206,
                fileLength: parseInt(fileLength ?? '0'),
                content: null,
            };
        }
        catch (e) {
            this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, 'checkRangeSupport failed', e);
            throw new Error('Failed to check range support: ' + e);
        }
    }
    /**
     * Fully fetch the file (using fetch) into an ArrayBuffer,
     * then call openDocumentFromBuffer.
     */
    async fetchFullAndOpen(file, password) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'fetchFullAndOpen', file.url);
        // 1. fetch entire PDF as array buffer
        const response = await fetch(file.url);
        if (!response.ok) {
            throw new Error(`Could not fetch PDF: ${response.statusText}`);
        }
        const arrayBuf = await response.arrayBuffer();
        // 2. create a PdfFile object
        const pdfFile = {
            id: file.id,
            content: arrayBuf,
        };
        // 3. call openDocumentFromBuffer (the method you already have)
        //    that returns a PdfTask, but let's wrap it in a Promise
        return this.openDocumentFromBuffer(pdfFile, password);
    }
    /**
     * Use your synchronous partial-loading approach:
     * - In your snippet, it's done via `openDocumentFromLoader`.
     * - We'll do a synchronous XHR read callback that pulls
     *   the desired byte ranges.
     */
    async openDocumentWithRangeRequest(file, password, knownFileLength) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'openDocumentWithRangeRequest', file.url);
        // We first do a HEAD or a partial fetch to get the fileLength:
        const fileLength = knownFileLength ?? (await this.retrieveFileLength(file.url)).fileLength;
        // 2. define the callback function used by openDocumentFromLoader
        const callback = (offset, length) => {
            // Perform synchronous XHR:
            const xhr = new XMLHttpRequest();
            xhr.open('GET', file.url, false); // note: block in the Worker
            xhr.overrideMimeType('text/plain; charset=x-user-defined');
            xhr.setRequestHeader('Range', `bytes=${offset}-${offset + length - 1}`);
            xhr.send(null);
            if (xhr.status === 206 || xhr.status === 200) {
                return this.convertResponseToUint8Array(xhr.responseText);
            }
            throw new Error(`Range request failed with status ${xhr.status}`);
        };
        // 3. call `openDocumentFromLoader`
        return this.openDocumentFromLoader({
            id: file.id,
            fileLength,
            callback,
        }, password);
    }
    /**
     * Helper to do a HEAD request or partial GET to find file length.
     */
    async retrieveFileLength(url) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'retrieveFileLength', url);
        // We'll do a HEAD request to get Content-Length
        const resp = await fetch(url, { method: 'HEAD' });
        if (!resp.ok) {
            throw new Error(`Failed HEAD request for file length: ${resp.statusText}`);
        }
        const lenStr = resp.headers.get('Content-Length') || '0';
        const fileLength = parseInt(lenStr, 10) || 0;
        if (!fileLength) {
            throw new Error(`Content-Length not found or zero.`);
        }
        return { fileLength };
    }
    /**
     * Convert response text (x-user-defined) to a Uint8Array
     * for partial data.
     */
    convertResponseToUint8Array(text) {
        const array = new Uint8Array(text.length);
        for (let i = 0; i < text.length; i++) {
            // & 0xff ensures we only get the lower 8 bits
            array[i] = text.charCodeAt(i) & 0xff;
        }
        return array;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocument}
     *
     * @public
     */
    openDocumentFromBuffer(file, password = '') {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'openDocumentFromBuffer', file, password);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `OpenDocumentFromBuffer`, 'Begin', file.id);
        const array = new Uint8Array(file.content);
        const length = array.length;
        const filePtr = this.malloc(length);
        this.pdfiumModule.pdfium.HEAPU8.set(array, filePtr);
        const docPtr = this.pdfiumModule.FPDF_LoadMemDocument(filePtr, length, password);
        if (!docPtr) {
            const lastError = this.pdfiumModule.FPDF_GetLastError();
            this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, `FPDF_LoadMemDocument failed with ${lastError}`);
            this.free(filePtr);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `OpenDocumentFromBuffer`, 'End', file.id);
            return PdfTaskHelper.reject({
                code: lastError,
                message: `FPDF_LoadMemDocument failed`,
            });
        }
        const pageCount = this.pdfiumModule.FPDF_GetPageCount(docPtr);
        const pages = [];
        const sizePtr = this.malloc(8);
        for (let index = 0; index < pageCount; index++) {
            const result = this.pdfiumModule.FPDF_GetPageSizeByIndexF(docPtr, index, sizePtr);
            if (!result) {
                const lastError = this.pdfiumModule.FPDF_GetLastError();
                this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, `FPDF_GetPageSizeByIndexF failed with ${lastError}`);
                this.free(sizePtr);
                this.pdfiumModule.FPDF_CloseDocument(docPtr);
                this.free(filePtr);
                this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `OpenDocumentFromBuffer`, 'End', file.id);
                return PdfTaskHelper.reject({
                    code: lastError,
                    message: `FPDF_GetPageSizeByIndexF failed`,
                });
            }
            const page = {
                index,
                size: {
                    width: this.pdfiumModule.pdfium.getValue(sizePtr, 'float'),
                    height: this.pdfiumModule.pdfium.getValue(sizePtr + 4, 'float'),
                },
            };
            pages.push(page);
        }
        this.free(sizePtr);
        const pdfDoc = {
            id: file.id,
            pageCount,
            pages,
        };
        this.cache.setDocument(file.id, filePtr, docPtr);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `OpenDocumentFromBuffer`, 'End', file.id);
        return PdfTaskHelper.resolve(pdfDoc);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocumentFromLoader}
     *
     * @public
     */
    openDocumentFromLoader(fileLoader, password = '') {
        const { fileLength, callback, ...file } = fileLoader;
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'openDocumentFromLoader', file, password);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `OpenDocumentFromLoader`, 'Begin', file.id);
        const readBlock = (_pThis, // Pointer to the FPDF_FILEACCESS structure
        offset, // Pointer to a buffer to receive the data
        pBuf, // Offset position from the beginning of the file
        length) => {
            try {
                this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'readBlock', offset, length, pBuf);
                if (offset < 0 || offset >= fileLength) {
                    this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, 'Offset out of bounds:', offset);
                    return 0;
                }
                // Get data chunk using the callback
                const data = callback(offset, length);
                // Copy the data to PDFium's buffer
                const dest = new Uint8Array(this.pdfiumModule.pdfium.HEAPU8.buffer, pBuf, data.length);
                dest.set(data);
                return data.length;
            }
            catch (error) {
                this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, 'ReadBlock error:', error);
                return 0;
            }
        };
        const callbackPtr = this.pdfiumModule.pdfium.addFunction(readBlock, 'iiiii');
        // Create FPDF_FILEACCESS struct
        const structSize = 12;
        const fileAccessPtr = this.malloc(structSize);
        // Set up struct fields
        this.pdfiumModule.pdfium.setValue(fileAccessPtr, fileLength, 'i32');
        this.pdfiumModule.pdfium.setValue(fileAccessPtr + 4, callbackPtr, 'i32');
        this.pdfiumModule.pdfium.setValue(fileAccessPtr + 8, 0, 'i32');
        // Load document
        const docPtr = this.pdfiumModule.FPDF_LoadCustomDocument(fileAccessPtr, password);
        if (!docPtr) {
            const lastError = this.pdfiumModule.FPDF_GetLastError();
            this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, `FPDF_LoadCustomDocument failed with ${lastError}`);
            this.free(fileAccessPtr);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `OpenDocumentFromLoader`, 'End', file.id);
            return PdfTaskHelper.reject({
                code: lastError,
                message: `FPDF_LoadCustomDocument failed`,
            });
        }
        const pageCount = this.pdfiumModule.FPDF_GetPageCount(docPtr);
        const pages = [];
        const sizePtr = this.malloc(8);
        for (let index = 0; index < pageCount; index++) {
            const result = this.pdfiumModule.FPDF_GetPageSizeByIndexF(docPtr, index, sizePtr);
            if (!result) {
                const lastError = this.pdfiumModule.FPDF_GetLastError();
                this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, `FPDF_GetPageSizeByIndexF failed with ${lastError}`);
                this.free(sizePtr);
                this.pdfiumModule.FPDF_CloseDocument(docPtr);
                this.free(fileAccessPtr);
                this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `OpenDocumentFromLoader`, 'End', file.id);
                return PdfTaskHelper.reject({
                    code: lastError,
                    message: `FPDF_GetPageSizeByIndexF failed`,
                });
            }
            const page = {
                index,
                size: {
                    width: this.pdfiumModule.pdfium.getValue(sizePtr, 'float'),
                    height: this.pdfiumModule.pdfium.getValue(sizePtr + 4, 'float'),
                },
            };
            pages.push(page);
        }
        this.free(sizePtr);
        const pdfDoc = {
            id: file.id,
            pageCount,
            pages,
        };
        this.cache.setDocument(file.id, fileAccessPtr, docPtr);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `OpenDocumentFromLoader`, 'End', file.id);
        return PdfTaskHelper.resolve(pdfDoc);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getMetadata}
     *
     * @public
     */
    getMetadata(doc) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getMetadata', doc);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetMetadata`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetMetadata`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const metadata = {
            title: this.readMetaText(ctx.docPtr, 'Title'),
            author: this.readMetaText(ctx.docPtr, 'Author'),
            subject: this.readMetaText(ctx.docPtr, 'Subject'),
            keywords: this.readMetaText(ctx.docPtr, 'Keywords'),
            producer: this.readMetaText(ctx.docPtr, 'Producer'),
            creator: this.readMetaText(ctx.docPtr, 'Creator'),
            creationDate: this.readMetaText(ctx.docPtr, 'CreationDate'),
            modificationDate: this.readMetaText(ctx.docPtr, 'ModDate'),
        };
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetMetadata`, 'End', doc.id);
        return PdfTaskHelper.resolve(metadata);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getDocPermissions}
     *
     * @public
     */
    getDocPermissions(doc) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getDocPermissions', doc);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `getDocPermissions`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `getDocPermissions`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const permissions = this.pdfiumModule.FPDF_GetDocPermissions(ctx.docPtr);
        return PdfTaskHelper.resolve(permissions);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getDocUserPermissions}
     *
     * @public
     */
    getDocUserPermissions(doc) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getDocUserPermissions', doc);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `getDocUserPermissions`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `getDocUserPermissions`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const permissions = this.pdfiumModule.FPDF_GetDocUserPermissions(ctx.docPtr);
        return PdfTaskHelper.resolve(permissions);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getSignatures}
     *
     * @public
     */
    getSignatures(doc) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getSignatures', doc);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetSignatures`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetSignatures`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const signatures = [];
        const count = this.pdfiumModule.FPDF_GetSignatureCount(ctx.docPtr);
        for (let i = 0; i < count; i++) {
            const signatureObjPtr = this.pdfiumModule.FPDF_GetSignatureObject(ctx.docPtr, i);
            const contents = readArrayBuffer(this.pdfiumModule.pdfium, (buffer, bufferSize) => {
                return this.pdfiumModule.FPDFSignatureObj_GetContents(signatureObjPtr, buffer, bufferSize);
            });
            const byteRange = readArrayBuffer(this.pdfiumModule.pdfium, (buffer, bufferSize) => {
                return (this.pdfiumModule.FPDFSignatureObj_GetByteRange(signatureObjPtr, buffer, bufferSize) * 4);
            });
            const subFilter = readArrayBuffer(this.pdfiumModule.pdfium, (buffer, bufferSize) => {
                return this.pdfiumModule.FPDFSignatureObj_GetSubFilter(signatureObjPtr, buffer, bufferSize);
            });
            const reason = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
                return this.pdfiumModule.FPDFSignatureObj_GetReason(signatureObjPtr, buffer, bufferLength);
            }, this.pdfiumModule.pdfium.UTF16ToString);
            const time = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
                return this.pdfiumModule.FPDFSignatureObj_GetTime(signatureObjPtr, buffer, bufferLength);
            }, this.pdfiumModule.pdfium.UTF8ToString);
            const docMDP = this.pdfiumModule.FPDFSignatureObj_GetDocMDPPermission(signatureObjPtr);
            signatures.push({
                contents,
                byteRange,
                subFilter,
                reason,
                time,
                docMDP,
            });
        }
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetSignatures`, 'End', doc.id);
        return PdfTaskHelper.resolve(signatures);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getBookmarks}
     *
     * @public
     */
    getBookmarks(doc) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getBookmarks', doc);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetBookmarks`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `getBookmarks`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const bookmarks = this.readPdfBookmarks(ctx.docPtr, 0);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetBookmarks`, 'End', doc.id);
        return PdfTaskHelper.resolve({
            bookmarks,
        });
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderPage}
     *
     * @public
     */
    renderPage(doc, page, scaleFactor = 1, rotation = Rotation.Degree0, dpr = 1, options = { withAnnotations: false }, imageType = 'image/webp') {
        const task = new Task();
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'renderPage', doc, page, scaleFactor, rotation, dpr, options);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderPage`, 'Begin', `${doc.id}-${page.index}`);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderPage`, 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const imageData = this.renderPageRectToImageData(ctx, page, {
            origin: { x: 0, y: 0 },
            size: page.size,
        }, scaleFactor, rotation, dpr, options);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderPage`, 'End', `${doc.id}-${page.index}`);
        this.imageDataConverter(imageData, imageType).then((blob) => task.resolve(blob));
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderPageRect}
     *
     * @public
     */
    renderPageRect(doc, page, scaleFactor, rotation, dpr, rect, options, imageType = 'image/webp') {
        const task = new Task();
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'renderPageRect', doc, page, scaleFactor, rotation, dpr, rect, options);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderPageRect`, 'Begin', `${doc.id}-${page.index}`);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderPageRect`, 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const imageData = this.renderPageRectToImageData(ctx, page, rect, scaleFactor, rotation, dpr, options);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderPageRect`, 'End', `${doc.id}-${page.index}`);
        this.imageDataConverter(imageData, imageType).then((blob) => task.resolve(blob));
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getAllAnnotations}
     *
     * @public
     */
    getAllAnnotations(doc) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getAllAnnotations', doc);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetAllAnnotations`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetAllAnnotations`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const annotations = this.readAllAnnotations(doc, ctx);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetAllAnnotations`, 'End', doc.id);
        return PdfTaskHelper.resolve(annotations);
    }
    readAllAnnotations(doc, ctx) {
        const annotationsByPage = {};
        for (let i = 0; i < doc.pageCount; i++) {
            const pageAnnotations = this.readPageAnnotations(ctx, doc.pages[i]);
            annotationsByPage[i] = pageAnnotations;
        }
        return annotationsByPage;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageAnnotations}
     *
     * @public
     */
    getPageAnnotations(doc, page) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getPageAnnotations', doc, page);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetPageAnnotations`, 'Begin', `${doc.id}-${page.index}`);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetPageAnnotations`, 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const annotations = this.readPageAnnotations(ctx, page);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetPageAnnotations`, 'End', `${doc.id}-${page.index}`);
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, `GetPageAnnotations`, `${doc.id}-${page.index}`, annotations);
        return PdfTaskHelper.resolve(annotations);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.createPageAnnotation}
     *
     * @public
     */
    createPageAnnotation(doc, page, annotation) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'createPageAnnotation', doc, page, annotation);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `CreatePageAnnotation`, 'Begin', `${doc.id}-${page.index}`);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `CreatePageAnnotation`, 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const pageCtx = ctx.acquirePage(page.index);
        const annotationPtr = this.pdfiumModule.FPDFPage_CreateAnnot(pageCtx.pagePtr, annotation.type);
        if (!annotationPtr) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `CreatePageAnnotation`, 'End', `${doc.id}-${page.index}`);
            pageCtx.release();
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantCreateAnnot,
                message: 'can not create annotation with specified type',
            });
        }
        if (!this.setPageAnnoRect(page, pageCtx.pagePtr, annotationPtr, annotation.rect)) {
            this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
            pageCtx.release();
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `CreatePageAnnotation`, 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantSetAnnotRect,
                message: 'can not set the rect of the annotation',
            });
        }
        let isSucceed = false;
        switch (annotation.type) {
            case PdfAnnotationSubtype.INK:
                isSucceed = this.addInkStroke(page, pageCtx.pagePtr, annotationPtr, annotation);
                break;
            case PdfAnnotationSubtype.STAMP:
                isSucceed = this.addStampContent(ctx.docPtr, page, pageCtx.pagePtr, annotationPtr, annotation.rect, annotation.contents);
                break;
            case PdfAnnotationSubtype.UNDERLINE:
            case PdfAnnotationSubtype.STRIKEOUT:
            case PdfAnnotationSubtype.SQUIGGLY:
            case PdfAnnotationSubtype.HIGHLIGHT:
                isSucceed = this.addTextMarkupContent(page, pageCtx.pagePtr, annotationPtr, annotation);
                break;
        }
        if (!isSucceed) {
            this.pdfiumModule.FPDFPage_RemoveAnnot(pageCtx.pagePtr, annotationPtr);
            pageCtx.release();
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `CreatePageAnnotation`, 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantSetAnnotContent,
                message: 'can not add content of the annotation',
            });
        }
        this.pdfiumModule.EPDFAnnot_GenerateAppearance(annotationPtr);
        this.pdfiumModule.FPDFPage_GenerateContent(pageCtx.pagePtr);
        const annotId = this.pdfiumModule.FPDFPage_GetAnnotIndex(pageCtx.pagePtr, annotationPtr);
        this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
        pageCtx.release();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `CreatePageAnnotation`, 'End', `${doc.id}-${page.index}`);
        return annotId >= 0
            ? PdfTaskHelper.resolve(annotId)
            : PdfTaskHelper.reject({
                code: PdfErrorCode.CantCreateAnnot,
                message: 'annotation created but index could not be determined',
            });
    }
    /**
     * Update an existing page annotation in-place
     *
     *  • Locates the annot by page-local index (`annotation.id`)
     *  • Re-writes its /Rect and type-specific payload
     *  • Calls FPDFPage_GenerateContent so the new appearance is rendered
     *
     * @returns PdfTask<boolean>  –  true on success
     */
    updatePageAnnotation(doc, page, annotation) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'updatePageAnnotation', doc, page, annotation);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'UpdatePageAnnotation', 'Begin', `${doc.id}-${page.index}`);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'UpdatePageAnnotation', 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const pageCtx = ctx.acquirePage(page.index);
        const annotPtr = this.pdfiumModule.FPDFPage_GetAnnot(pageCtx.pagePtr, annotation.id);
        if (!annotPtr) {
            pageCtx.release();
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'UpdatePageAnnotation', 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({ code: PdfErrorCode.NotFound, message: 'annotation not found' });
        }
        /* 1 ── (re)set bounding-box ────────────────────────────────────────────── */
        if (!this.setPageAnnoRect(page, pageCtx.pagePtr, annotPtr, annotation.rect)) {
            this.pdfiumModule.FPDFPage_CloseAnnot(annotPtr);
            pageCtx.release();
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'UpdatePageAnnotation', 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantSetAnnotRect,
                message: 'failed to move annotation',
            });
        }
        /* 2 ── wipe previous payload and rebuild fresh one ─────────────────────── */
        let ok = false;
        switch (annotation.type) {
            /* ── Ink ─────────────────────────────────────────────────────────────── */
            case PdfAnnotationSubtype.INK: {
                /* clear every existing stroke first */
                if (!this.pdfiumModule.FPDFAnnot_RemoveInkList(annotPtr))
                    break;
                ok = this.addInkStroke(page, pageCtx.pagePtr, annotPtr, annotation);
                break;
            }
            /* ── Stamp ───────────────────────────────────────────────────────────── */
            case PdfAnnotationSubtype.STAMP: {
                /* drop every page-object inside the annot */
                for (let i = this.pdfiumModule.FPDFAnnot_GetObjectCount(annotPtr) - 1; i >= 0; i--) {
                    this.pdfiumModule.FPDFAnnot_RemoveObject(annotPtr, i);
                }
                ok = this.addStampContent(ctx.docPtr, page, pageCtx.pagePtr, annotPtr, annotation.rect, annotation.contents);
                break;
            }
            /* ── Text-markup family ──────────────────────────────────────────────── */
            case PdfAnnotationSubtype.HIGHLIGHT:
            case PdfAnnotationSubtype.UNDERLINE:
            case PdfAnnotationSubtype.STRIKEOUT:
            case PdfAnnotationSubtype.SQUIGGLY: {
                /* replace quad-points / colour / strings in one go */
                ok = this.addTextMarkupContent(page, pageCtx.pagePtr, annotPtr, annotation);
                break;
            }
            /* ── Unsupported edits – fall through to error ───────────────────────── */
            default:
                ok = false;
        }
        /* 3 ── regenerate appearance if payload was changed ───────────────────── */
        if (ok) {
            this.pdfiumModule.EPDFAnnot_GenerateAppearance(annotPtr);
            this.pdfiumModule.FPDFPage_GenerateContent(pageCtx.pagePtr);
        }
        /* 4 ── tidy-up native handles ──────────────────────────────────────────── */
        this.pdfiumModule.FPDFPage_CloseAnnot(annotPtr);
        pageCtx.release();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'UpdatePageAnnotation', 'End', `${doc.id}-${page.index}`);
        return ok
            ? PdfTaskHelper.resolve(true)
            : PdfTaskHelper.reject({
                code: PdfErrorCode.CantSetAnnotContent,
                message: 'failed to update annotation',
            });
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.removePageAnnotation}
     *
     * @public
     */
    removePageAnnotation(doc, page, annotation) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'removePageAnnotation', doc, page, annotation);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RemovePageAnnotation`, 'Begin', `${doc.id}-${page.index}`);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RemovePageAnnotation`, 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const pageCtx = ctx.acquirePage(page.index);
        let result = false;
        result = this.pdfiumModule.FPDFPage_RemoveAnnot(pageCtx.pagePtr, annotation.id);
        if (!result) {
            this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, `FPDFPage_RemoveAnnot Failed`, `${doc.id}-${page.index}`);
        }
        else {
            result = this.pdfiumModule.FPDFPage_GenerateContent(pageCtx.pagePtr);
            if (!result) {
                this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, `FPDFPage_GenerateContent Failed`, `${doc.id}-${page.index}`);
            }
        }
        pageCtx.release();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RemovePageAnnotation`, 'End', `${doc.id}-${page.index}`);
        return PdfTaskHelper.resolve(result);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageTextRects}
     *
     * @public
     */
    getPageTextRects(doc, page, scaleFactor, rotation) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getPageTextRects', doc, page, scaleFactor, rotation);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetPageTextRects`, 'Begin', `${doc.id}-${page.index}`);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetPageTextRects`, 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const pageCtx = ctx.acquirePage(page.index);
        const textPagePtr = this.pdfiumModule.FPDFText_LoadPage(pageCtx.pagePtr);
        const textRects = this.readPageTextRects(page, pageCtx.docPtr, pageCtx.pagePtr, textPagePtr);
        this.pdfiumModule.FPDFText_ClosePage(textPagePtr);
        pageCtx.release();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetPageTextRects`, 'End', `${doc.id}-${page.index}`);
        return PdfTaskHelper.resolve(textRects);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderThumbnail}
     *
     * @public
     */
    renderThumbnail(doc, page, scaleFactor, rotation, dpr) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'renderThumbnail', doc, page, scaleFactor, rotation, dpr);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderThumbnail`, 'Begin', `${doc.id}-${page.index}`);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderThumbnail`, 'End', `${doc.id}-${page.index}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        scaleFactor = Math.max(scaleFactor, 0.5);
        const result = this.renderPage(doc, page, scaleFactor, rotation, dpr, {
            withAnnotations: true,
        });
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderThumbnail`, 'End', `${doc.id}-${page.index}`);
        return result;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getAttachments}
     *
     * @public
     */
    getAttachments(doc) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getAttachments', doc);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetAttachments`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetAttachments`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const attachments = [];
        const count = this.pdfiumModule.FPDFDoc_GetAttachmentCount(ctx.docPtr);
        for (let i = 0; i < count; i++) {
            const attachment = this.readPdfAttachment(ctx.docPtr, i);
            attachments.push(attachment);
        }
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `GetAttachments`, 'End', doc.id);
        return PdfTaskHelper.resolve(attachments);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.readAttachmentContent}
     *
     * @public
     */
    readAttachmentContent(doc, attachment) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'readAttachmentContent', doc, attachment);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ReadAttachmentContent`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ReadAttachmentContent`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const attachmentPtr = this.pdfiumModule.FPDFDoc_GetAttachment(ctx.docPtr, attachment.index);
        const sizePtr = this.malloc(8);
        if (!this.pdfiumModule.FPDFAttachment_GetFile(attachmentPtr, 0, 0, sizePtr)) {
            this.free(sizePtr);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ReadAttachmentContent`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantReadAttachmentSize,
                message: 'can not read attachment size',
            });
        }
        const size = this.pdfiumModule.pdfium.getValue(sizePtr, 'i64');
        const contentPtr = this.malloc(size);
        if (!this.pdfiumModule.FPDFAttachment_GetFile(attachmentPtr, contentPtr, size, sizePtr)) {
            this.free(sizePtr);
            this.free(contentPtr);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ReadAttachmentContent`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantReadAttachmentContent,
                message: 'can not read attachment content',
            });
        }
        const buffer = new ArrayBuffer(size);
        const view = new DataView(buffer);
        for (let i = 0; i < size; i++) {
            view.setInt8(i, this.pdfiumModule.pdfium.getValue(contentPtr + i, 'i8'));
        }
        this.free(sizePtr);
        this.free(contentPtr);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ReadAttachmentContent`, 'End', doc.id);
        return PdfTaskHelper.resolve(buffer);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.setFormFieldValue}
     *
     * @public
     */
    setFormFieldValue(doc, page, annotation, value) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'SetFormFieldValue', doc, annotation, value);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SetFormFieldValue`, 'Begin', `${doc.id}-${annotation.id}`);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'SetFormFieldValue', 'document is not opened');
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SetFormFieldValue`, 'End', `${doc.id}-${annotation.id}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const formFillInfoPtr = this.pdfiumModule.PDFiumExt_OpenFormFillInfo();
        const formHandle = this.pdfiumModule.PDFiumExt_InitFormFillEnvironment(ctx.docPtr, formFillInfoPtr);
        const pageCtx = ctx.acquirePage(page.index);
        this.pdfiumModule.FORM_OnAfterLoadPage(pageCtx.pagePtr, formHandle);
        const annotationPtr = this.pdfiumModule.FPDFPage_GetAnnot(pageCtx.pagePtr, annotation.id);
        if (!this.pdfiumModule.FORM_SetFocusedAnnot(formHandle, annotationPtr)) {
            this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'SetFormFieldValue', 'failed to set focused annotation');
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SetFormFieldValue`, 'End', `${doc.id}-${annotation.id}`);
            this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
            this.pdfiumModule.FORM_OnBeforeClosePage(pageCtx.pagePtr, formHandle);
            pageCtx.release();
            this.pdfiumModule.PDFiumExt_ExitFormFillEnvironment(formHandle);
            this.pdfiumModule.PDFiumExt_CloseFormFillInfo(formFillInfoPtr);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantFocusAnnot,
                message: 'failed to set focused annotation',
            });
        }
        switch (value.kind) {
            case 'text':
                {
                    if (!this.pdfiumModule.FORM_SelectAllText(formHandle, pageCtx.pagePtr)) {
                        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'SetFormFieldValue', 'failed to select all text');
                        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SetFormFieldValue`, 'End', `${doc.id}-${annotation.id}`);
                        this.pdfiumModule.FORM_ForceToKillFocus(formHandle);
                        this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
                        this.pdfiumModule.FORM_OnBeforeClosePage(pageCtx.pagePtr, formHandle);
                        pageCtx.release();
                        this.pdfiumModule.PDFiumExt_ExitFormFillEnvironment(formHandle);
                        this.pdfiumModule.PDFiumExt_CloseFormFillInfo(formFillInfoPtr);
                        return PdfTaskHelper.reject({
                            code: PdfErrorCode.CantSelectText,
                            message: 'failed to select all text',
                        });
                    }
                    const length = 2 * (value.text.length + 1);
                    const textPtr = this.malloc(length);
                    this.pdfiumModule.pdfium.stringToUTF16(value.text, textPtr, length);
                    this.pdfiumModule.FORM_ReplaceSelection(formHandle, pageCtx.pagePtr, textPtr);
                    this.free(textPtr);
                }
                break;
            case 'selection':
                {
                    if (!this.pdfiumModule.FORM_SetIndexSelected(formHandle, pageCtx.pagePtr, value.index, value.isSelected)) {
                        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'SetFormFieldValue', 'failed to set index selected');
                        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SetFormFieldValue`, 'End', `${doc.id}-${annotation.id}`);
                        this.pdfiumModule.FORM_ForceToKillFocus(formHandle);
                        this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
                        this.pdfiumModule.FORM_OnBeforeClosePage(pageCtx.pagePtr, formHandle);
                        pageCtx.release();
                        this.pdfiumModule.PDFiumExt_ExitFormFillEnvironment(formHandle);
                        this.pdfiumModule.PDFiumExt_CloseFormFillInfo(formFillInfoPtr);
                        return PdfTaskHelper.reject({
                            code: PdfErrorCode.CantSelectOption,
                            message: 'failed to set index selected',
                        });
                    }
                }
                break;
            case 'checked':
                {
                    const kReturn = 0x0d;
                    if (!this.pdfiumModule.FORM_OnChar(formHandle, pageCtx.pagePtr, kReturn, 0)) {
                        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'SetFormFieldValue', 'failed to set field checked');
                        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SetFormFieldValue`, 'End', `${doc.id}-${annotation.id}`);
                        this.pdfiumModule.FORM_ForceToKillFocus(formHandle);
                        this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
                        this.pdfiumModule.FORM_OnBeforeClosePage(pageCtx.pagePtr, formHandle);
                        pageCtx.release();
                        this.pdfiumModule.PDFiumExt_ExitFormFillEnvironment(formHandle);
                        this.pdfiumModule.PDFiumExt_CloseFormFillInfo(formFillInfoPtr);
                        return PdfTaskHelper.reject({
                            code: PdfErrorCode.CantCheckField,
                            message: 'failed to set field checked',
                        });
                    }
                }
                break;
        }
        this.pdfiumModule.FORM_ForceToKillFocus(formHandle);
        this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
        this.pdfiumModule.FORM_OnBeforeClosePage(pageCtx.pagePtr, formHandle);
        pageCtx.release();
        this.pdfiumModule.PDFiumExt_ExitFormFillEnvironment(formHandle);
        this.pdfiumModule.PDFiumExt_CloseFormFillInfo(formFillInfoPtr);
        return PdfTaskHelper.resolve(true);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.flattenPage}
     *
     * @public
     */
    flattenPage(doc, page, flag) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'flattenPage', doc, page, flag);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `flattenPage`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `flattenPage`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const pageCtx = ctx.acquirePage(page.index);
        const result = this.pdfiumModule.FPDFPage_Flatten(pageCtx.pagePtr, flag);
        pageCtx.release();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `flattenPage`, 'End', doc.id);
        return PdfTaskHelper.resolve(result);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.extractPages}
     *
     * @public
     */
    extractPages(doc, pageIndexes) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'extractPages', doc, pageIndexes);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ExtractPages`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ExtractPages`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const newDocPtr = this.pdfiumModule.FPDF_CreateNewDocument();
        if (!newDocPtr) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ExtractPages`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantCreateNewDoc,
                message: 'can not create new document',
            });
        }
        const pageIndexesPtr = this.malloc(pageIndexes.length * 4);
        for (let i = 0; i < pageIndexes.length; i++) {
            this.pdfiumModule.pdfium.setValue(pageIndexesPtr + i * 4, pageIndexes[i], 'i32');
        }
        if (!this.pdfiumModule.FPDF_ImportPagesByIndex(newDocPtr, ctx.docPtr, pageIndexesPtr, pageIndexes.length, 0)) {
            this.pdfiumModule.FPDF_CloseDocument(newDocPtr);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ExtractPages`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantImportPages,
                message: 'can not import pages to new document',
            });
        }
        const buffer = this.saveDocument(newDocPtr);
        this.pdfiumModule.FPDF_CloseDocument(newDocPtr);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ExtractPages`, 'End', doc.id);
        return PdfTaskHelper.resolve(buffer);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.extractText}
     *
     * @public
     */
    extractText(doc, pageIndexes) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'extractText', doc, pageIndexes);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ExtractText`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ExtractText`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const strings = [];
        for (let i = 0; i < pageIndexes.length; i++) {
            const pageCtx = ctx.acquirePage(pageIndexes[i]);
            const textPagePtr = this.pdfiumModule.FPDFText_LoadPage(pageCtx.pagePtr);
            const charCount = this.pdfiumModule.FPDFText_CountChars(textPagePtr);
            const bufferPtr = this.malloc((charCount + 1) * 2);
            this.pdfiumModule.FPDFText_GetText(textPagePtr, 0, charCount, bufferPtr);
            const text = this.pdfiumModule.pdfium.UTF16ToString(bufferPtr);
            this.free(bufferPtr);
            strings.push(text);
            this.pdfiumModule.FPDFText_ClosePage(textPagePtr);
            pageCtx.release();
        }
        const text = strings.join('\n\n');
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `ExtractText`, 'End', doc.id);
        return PdfTaskHelper.resolve(text);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getTextSlices}
     *
     * @public
     */
    getTextSlices(doc, slices) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getTextSlices', doc, slices);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'GetTextSlices', 'Begin', doc.id);
        /* ⚠︎ 1 — trivial case */
        if (slices.length === 0) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'GetTextSlices', 'End', doc.id);
            return PdfTaskHelper.resolve([]);
        }
        /* ⚠︎ 2 — document must be open */
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'GetTextSlices', 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        try {
            /* keep caller order */
            const out = new Array(slices.length);
            /* group → open each page once */
            const byPage = new Map();
            slices.forEach((s, i) => {
                (byPage.get(s.pageIndex) ?? byPage.set(s.pageIndex, []).get(s.pageIndex)).push({
                    slice: s,
                    pos: i,
                });
            });
            for (const [pageIdx, list] of byPage) {
                const pageCtx = ctx.acquirePage(pageIdx);
                const textPagePtr = pageCtx.getTextPage();
                for (const { slice, pos } of list) {
                    const bufPtr = this.malloc(2 * (slice.charCount + 1)); // UTF-16 + NIL
                    this.pdfiumModule.FPDFText_GetText(textPagePtr, slice.charIndex, slice.charCount, bufPtr);
                    out[pos] = stripPdfUnwantedMarkers(this.pdfiumModule.pdfium.UTF16ToString(bufPtr));
                    this.free(bufPtr);
                }
                pageCtx.release();
            }
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'GetTextSlices', 'End', doc.id);
            return PdfTaskHelper.resolve(out);
        }
        catch (e) {
            this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, 'getTextSlices error', e);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'GetTextSlices', 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.Unknown,
                message: String(e),
            });
        }
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.merge}
     *
     * @public
     */
    merge(files) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'merge', files);
        const fileIds = files.map((file) => file.id).join('.');
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `Merge`, 'Begin', fileIds);
        const newDocPtr = this.pdfiumModule.FPDF_CreateNewDocument();
        if (!newDocPtr) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `Merge`, 'End', fileIds);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantCreateNewDoc,
                message: 'can not create new document',
            });
        }
        const ptrs = [];
        for (const file of files.reverse()) {
            const array = new Uint8Array(file.content);
            const length = array.length;
            const filePtr = this.malloc(length);
            this.pdfiumModule.pdfium.HEAPU8.set(array, filePtr);
            const docPtr = this.pdfiumModule.FPDF_LoadMemDocument(filePtr, length, '');
            if (!docPtr) {
                const lastError = this.pdfiumModule.FPDF_GetLastError();
                this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, `FPDF_LoadMemDocument failed with ${lastError}`);
                this.free(filePtr);
                for (const ptr of ptrs) {
                    this.pdfiumModule.FPDF_CloseDocument(ptr.docPtr);
                    this.free(ptr.filePtr);
                }
                this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `Merge`, 'End', fileIds);
                return PdfTaskHelper.reject({
                    code: lastError,
                    message: `FPDF_LoadMemDocument failed`,
                });
            }
            ptrs.push({ filePtr, docPtr });
            if (!this.pdfiumModule.FPDF_ImportPages(newDocPtr, docPtr, '', 0)) {
                this.pdfiumModule.FPDF_CloseDocument(newDocPtr);
                for (const ptr of ptrs) {
                    this.pdfiumModule.FPDF_CloseDocument(ptr.docPtr);
                    this.free(ptr.filePtr);
                }
                this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `Merge`, 'End', fileIds);
                return PdfTaskHelper.reject({
                    code: PdfErrorCode.CantImportPages,
                    message: 'can not import pages to new document',
                });
            }
        }
        const buffer = this.saveDocument(newDocPtr);
        this.pdfiumModule.FPDF_CloseDocument(newDocPtr);
        for (const ptr of ptrs) {
            this.pdfiumModule.FPDF_CloseDocument(ptr.docPtr);
            this.free(ptr.filePtr);
        }
        const file = {
            id: `${Math.random()}`,
            content: buffer,
        };
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `Merge`, 'End', fileIds);
        return PdfTaskHelper.resolve(file);
    }
    /**
     * Merges specific pages from multiple PDF documents in a custom order
     *
     * @param mergeConfigs Array of configurations specifying which pages to merge from which documents
     * @returns A PdfTask that resolves with the merged PDF file
     * @public
     */
    mergePages(mergeConfigs) {
        const configIds = mergeConfigs
            .map((config) => `${config.docId}:${config.pageIndices.join(',')}`)
            .join('|');
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'mergePages', mergeConfigs);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `MergePages`, 'Begin', configIds);
        // Create a new document to import pages into
        const newDocPtr = this.pdfiumModule.FPDF_CreateNewDocument();
        if (!newDocPtr) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `MergePages`, 'End', configIds);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantCreateNewDoc,
                message: 'Cannot create new document',
            });
        }
        try {
            // Process each merge configuration in reverse order (since we're inserting at position 0)
            // This ensures the final document has pages in the order specified by the user
            for (const config of [...mergeConfigs].reverse()) {
                // Check if the document is open
                const ctx = this.cache.getContext(config.docId);
                if (!ctx) {
                    this.logger.warn(LOG_SOURCE$2, LOG_CATEGORY$2, `Document ${config.docId} is not open, skipping`);
                    continue;
                }
                // Get the page count for this document
                const pageCount = this.pdfiumModule.FPDF_GetPageCount(ctx.docPtr);
                // Filter out invalid page indices
                const validPageIndices = config.pageIndices.filter((index) => index >= 0 && index < pageCount);
                if (validPageIndices.length === 0) {
                    continue; // No valid pages to import
                }
                // Convert 0-based indices to 1-based for PDFium and join with commas
                const pageString = validPageIndices.map((index) => index + 1).join(',');
                try {
                    // Import all specified pages at once from this document
                    if (!this.pdfiumModule.FPDF_ImportPages(newDocPtr, ctx.docPtr, pageString, 0)) {
                        throw new Error(`Failed to import pages ${pageString} from document ${config.docId}`);
                    }
                }
                finally {
                }
            }
            // Save the new document to buffer
            const buffer = this.saveDocument(newDocPtr);
            const file = {
                id: `${Math.random()}`,
                content: buffer,
            };
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `MergePages`, 'End', configIds);
            return PdfTaskHelper.resolve(file);
        }
        catch (error) {
            this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, 'mergePages failed', error);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `MergePages`, 'End', configIds);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.CantImportPages,
                message: error instanceof Error ? error.message : 'Failed to merge pages',
            });
        }
        finally {
            // Clean up the new document
            if (newDocPtr) {
                this.pdfiumModule.FPDF_CloseDocument(newDocPtr);
            }
        }
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.saveAsCopy}
     *
     * @public
     */
    saveAsCopy(doc) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'saveAsCopy', doc);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SaveAsCopy`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SaveAsCopy`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        const buffer = this.saveDocument(ctx.docPtr);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SaveAsCopy`, 'End', doc.id);
        return PdfTaskHelper.resolve(buffer);
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.closeDocument}
     *
     * @public
     */
    closeDocument(doc) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'closeDocument', doc);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `CloseDocument`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `CloseDocument`, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        ctx.dispose();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `CloseDocument`, 'End', doc.id);
        return PdfTaskHelper.resolve(true);
    }
    /**
     * Memory allocation
     * @param size - size of memory space
     * @returns pointer to memory space
     *
     * @public
     */
    malloc(size) {
        const ptr = this.pdfiumModule.pdfium.wasmExports.malloc(size);
        for (let i = 0; i < size; i++) {
            this.pdfiumModule.pdfium.HEAP8[ptr + i] = 0;
        }
        return ptr;
    }
    /**
     * Free memory space
     * @param ptr pointer to memory space
     *
     * @public
     */
    free(ptr) {
        this.pdfiumModule.pdfium.wasmExports.free(ptr);
    }
    /**
     * Set the rect of specified annotation
     * @param page - page info that the annotation is belonged to
     * @param pagePtr - pointer of page object
     * @param annotationPtr - pointer to annotation object
     * @param inkList - ink lists that added to the annotation
     * @returns whether the ink lists is setted
     *
     * @private
     */
    addInkStroke(page, pagePtr, annotationPtr, annotation) {
        if (!this.setBorderStyle(annotationPtr, PdfAnnotationBorderStyle.SOLID, annotation.strokeWidth)) {
            return false;
        }
        if (!this.setPageAnnoRect(page, pagePtr, annotationPtr, annotation.rect)) {
            return false;
        }
        if (!this.setInkList(page, annotationPtr, annotation.inkList)) {
            return false;
        }
        if (!this.setAnnotString(annotationPtr, 'T', annotation.author || '')) {
            return false;
        }
        if (!this.setAnnotString(annotationPtr, 'M', dateToPdfDate(annotation.modified))) {
            return false;
        }
        if (!this.setAnnotationColor(annotationPtr, {
            color: annotation.color ?? '#FFFF00',
            opacity: annotation.opacity ?? 1,
        }, PdfAnnotationColorType.Color)) {
            return false;
        }
        return true;
    }
    /**
     * Add highlight content to annotation
     * @param page - page info
     * @param annotationPtr - pointer to highlight annotation
     * @param annotation - highlight annotation
     * @returns whether highlight content is added to annotation
     *
     * @private
     */
    addTextMarkupContent(page, pagePtr, annotationPtr, annotation) {
        if (!this.setPageAnnoRect(page, pagePtr, annotationPtr, annotation.rect)) {
            return false;
        }
        if (!this.syncQuadPointsAnno(page, annotationPtr, annotation.segmentRects)) {
            return false;
        }
        if (!this.setAnnotString(annotationPtr, 'Contents', annotation.contents ?? '')) {
            return false;
        }
        if (!this.setAnnotString(annotationPtr, 'T', annotation.author || '')) {
            return false;
        }
        if (!this.setAnnotString(annotationPtr, 'M', dateToPdfDate(annotation.modified))) {
            return false;
        }
        if (!this.setAnnotationColor(annotationPtr, {
            color: annotation.color ?? '#FFFF00',
            opacity: annotation.opacity ?? 1,
        }, PdfAnnotationColorType.Color)) {
            return false;
        }
        return true;
    }
    /**
     * Add contents to stamp annotation
     * @param docPtr - pointer to pdf document object
     * @param page - page info
     * @param pagePtr - pointer to page object
     * @param annotationPtr - pointer to stamp annotation
     * @param rect - rect of stamp annotation
     * @param contents - contents of stamp annotation
     * @returns whether contents is added to annotation
     *
     * @private
     */
    addStampContent(docPtr, page, pagePtr, annotationPtr, rect, contents) {
        for (const content of contents) {
            switch (content.type) {
                case PdfPageObjectType.IMAGE:
                    return this.addImageObject(docPtr, page, pagePtr, annotationPtr, rect.origin, content.imageData);
            }
        }
        return false;
    }
    /**
     * Add image object to annotation
     * @param docPtr - pointer to pdf document object
     * @param page - page info
     * @param pagePtr - pointer to page object
     * @param annotationPtr - pointer to stamp annotation
     * @param position - position of image
     * @param imageData - data of image
     * @returns whether image is added to annotation
     *
     * @private
     */
    addImageObject(docPtr, page, pagePtr, annotationPtr, position, imageData) {
        const bytesPerPixel = 4;
        const pixelCount = imageData.width * imageData.height;
        const bitmapBufferPtr = this.malloc(bytesPerPixel * pixelCount);
        if (!bitmapBufferPtr) {
            return false;
        }
        for (let i = 0; i < pixelCount; i++) {
            const red = imageData.data[i * bytesPerPixel];
            const green = imageData.data[i * bytesPerPixel + 1];
            const blue = imageData.data[i * bytesPerPixel + 2];
            const alpha = imageData.data[i * bytesPerPixel + 3];
            this.pdfiumModule.pdfium.setValue(bitmapBufferPtr + i * bytesPerPixel, blue, 'i8');
            this.pdfiumModule.pdfium.setValue(bitmapBufferPtr + i * bytesPerPixel + 1, green, 'i8');
            this.pdfiumModule.pdfium.setValue(bitmapBufferPtr + i * bytesPerPixel + 2, red, 'i8');
            this.pdfiumModule.pdfium.setValue(bitmapBufferPtr + i * bytesPerPixel + 3, alpha, 'i8');
        }
        const format = BitmapFormat.Bitmap_BGRA;
        const bitmapPtr = this.pdfiumModule.FPDFBitmap_CreateEx(imageData.width, imageData.height, format, bitmapBufferPtr, 0);
        if (!bitmapPtr) {
            this.free(bitmapBufferPtr);
            return false;
        }
        const imageObjectPtr = this.pdfiumModule.FPDFPageObj_NewImageObj(docPtr);
        if (!imageObjectPtr) {
            this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
            this.free(bitmapBufferPtr);
            return false;
        }
        if (!this.pdfiumModule.FPDFImageObj_SetBitmap(pagePtr, 0, imageObjectPtr, bitmapPtr)) {
            this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
            this.pdfiumModule.FPDFPageObj_Destroy(imageObjectPtr);
            this.free(bitmapBufferPtr);
            return false;
        }
        const matrixPtr = this.malloc(6 * 4);
        this.pdfiumModule.pdfium.setValue(matrixPtr, imageData.width, 'float');
        this.pdfiumModule.pdfium.setValue(matrixPtr + 4, 0, 'float');
        this.pdfiumModule.pdfium.setValue(matrixPtr + 8, 0, 'float');
        this.pdfiumModule.pdfium.setValue(matrixPtr + 12, imageData.height, 'float');
        this.pdfiumModule.pdfium.setValue(matrixPtr + 16, 0, 'float');
        this.pdfiumModule.pdfium.setValue(matrixPtr + 20, 0, 'float');
        if (!this.pdfiumModule.FPDFPageObj_SetMatrix(imageObjectPtr, matrixPtr)) {
            this.free(matrixPtr);
            this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
            this.pdfiumModule.FPDFPageObj_Destroy(imageObjectPtr);
            this.free(bitmapBufferPtr);
            return false;
        }
        this.free(matrixPtr);
        this.pdfiumModule.FPDFPageObj_Transform(imageObjectPtr, 1, 0, 0, 1, position.x, position.y);
        if (!this.pdfiumModule.FPDFAnnot_AppendObject(annotationPtr, imageObjectPtr)) {
            this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
            this.pdfiumModule.FPDFPageObj_Destroy(imageObjectPtr);
            this.free(bitmapBufferPtr);
            return false;
        }
        this.pdfiumModule.FPDFPage_GenerateContent(pagePtr);
        this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
        this.free(bitmapBufferPtr);
        return true;
    }
    /**
     * Save document to array buffer
     * @param docPtr - pointer to pdf document
     * @returns array buffer contains the pdf content
     *
     * @private
     */
    saveDocument(docPtr) {
        const writerPtr = this.pdfiumModule.PDFiumExt_OpenFileWriter();
        this.pdfiumModule.PDFiumExt_SaveAsCopy(docPtr, writerPtr);
        const size = this.pdfiumModule.PDFiumExt_GetFileWriterSize(writerPtr);
        const dataPtr = this.malloc(size);
        this.pdfiumModule.PDFiumExt_GetFileWriterData(writerPtr, dataPtr, size);
        const buffer = new ArrayBuffer(size);
        const view = new DataView(buffer);
        for (let i = 0; i < size; i++) {
            view.setInt8(i, this.pdfiumModule.pdfium.getValue(dataPtr + i, 'i8'));
        }
        this.free(dataPtr);
        this.pdfiumModule.PDFiumExt_CloseFileWriter(writerPtr);
        return buffer;
    }
    /**
     * Read metadata from pdf document
     * @param docPtr - pointer to pdf document
     * @param key - key of metadata field
     * @returns metadata value
     *
     * @private
     */
    readMetaText(docPtr, key) {
        return readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
            return this.pdfiumModule.FPDF_GetMetaText(docPtr, key, buffer, bufferLength);
        }, this.pdfiumModule.pdfium.UTF16ToString);
    }
    /**
     * Read bookmarks in the pdf document
     * @param docPtr - pointer to pdf document
     * @param rootBookmarkPtr - pointer to root bookmark
     * @returns bookmarks in the pdf document
     *
     * @private
     */
    readPdfBookmarks(docPtr, rootBookmarkPtr = 0) {
        let bookmarkPtr = this.pdfiumModule.FPDFBookmark_GetFirstChild(docPtr, rootBookmarkPtr);
        const bookmarks = [];
        while (bookmarkPtr) {
            const bookmark = this.readPdfBookmark(docPtr, bookmarkPtr);
            bookmarks.push(bookmark);
            const nextBookmarkPtr = this.pdfiumModule.FPDFBookmark_GetNextSibling(docPtr, bookmarkPtr);
            bookmarkPtr = nextBookmarkPtr;
        }
        return bookmarks;
    }
    /**
     * Read bookmark in the pdf document
     * @param docPtr - pointer to pdf document
     * @param bookmarkPtr - pointer to bookmark object
     * @returns pdf bookmark object
     *
     * @private
     */
    readPdfBookmark(docPtr, bookmarkPtr) {
        const title = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
            return this.pdfiumModule.FPDFBookmark_GetTitle(bookmarkPtr, buffer, bufferLength);
        }, this.pdfiumModule.pdfium.UTF16ToString);
        const bookmarks = this.readPdfBookmarks(docPtr, bookmarkPtr);
        const target = this.readPdfBookmarkTarget(docPtr, () => {
            return this.pdfiumModule.FPDFBookmark_GetAction(bookmarkPtr);
        }, () => {
            return this.pdfiumModule.FPDFBookmark_GetDest(docPtr, bookmarkPtr);
        });
        return {
            title,
            target,
            children: bookmarks,
        };
    }
    /**
     * Read text rects in pdf page
     * @param page - pdf page info
     * @param docPtr - pointer to pdf document
     * @param pagePtr - pointer to pdf page
     * @param textPagePtr - pointer to pdf text page
     * @returns text rects in the pdf page
     *
     * @public
     */
    readPageTextRects(page, docPtr, pagePtr, textPagePtr) {
        const rectsCount = this.pdfiumModule.FPDFText_CountRects(textPagePtr, 0, -1);
        const textRects = [];
        for (let i = 0; i < rectsCount; i++) {
            const topPtr = this.malloc(8);
            const leftPtr = this.malloc(8);
            const rightPtr = this.malloc(8);
            const bottomPtr = this.malloc(8);
            const isSucceed = this.pdfiumModule.FPDFText_GetRect(textPagePtr, i, leftPtr, topPtr, rightPtr, bottomPtr);
            if (!isSucceed) {
                this.free(leftPtr);
                this.free(topPtr);
                this.free(rightPtr);
                this.free(bottomPtr);
                continue;
            }
            const left = this.pdfiumModule.pdfium.getValue(leftPtr, 'double');
            const top = this.pdfiumModule.pdfium.getValue(topPtr, 'double');
            const right = this.pdfiumModule.pdfium.getValue(rightPtr, 'double');
            const bottom = this.pdfiumModule.pdfium.getValue(bottomPtr, 'double');
            this.free(leftPtr);
            this.free(topPtr);
            this.free(rightPtr);
            this.free(bottomPtr);
            const deviceXPtr = this.malloc(4);
            const deviceYPtr = this.malloc(4);
            this.pdfiumModule.FPDF_PageToDevice(pagePtr, 0, 0, page.size.width, page.size.height, 0, left, top, deviceXPtr, deviceYPtr);
            const x = this.pdfiumModule.pdfium.getValue(deviceXPtr, 'i32');
            const y = this.pdfiumModule.pdfium.getValue(deviceYPtr, 'i32');
            this.free(deviceXPtr);
            this.free(deviceYPtr);
            const rect = {
                origin: {
                    x,
                    y,
                },
                size: {
                    width: Math.ceil(Math.abs(right - left)),
                    height: Math.ceil(Math.abs(top - bottom)),
                },
            };
            const utf16Length = this.pdfiumModule.FPDFText_GetBoundedText(textPagePtr, left, top, right, bottom, 0, 0);
            const bytesCount = (utf16Length + 1) * 2; // include NIL
            const textBuffer = this.malloc(bytesCount);
            this.pdfiumModule.FPDFText_GetBoundedText(textPagePtr, left, top, right, bottom, textBuffer, utf16Length);
            const content = this.pdfiumModule.pdfium.UTF16ToString(textBuffer);
            this.free(textBuffer);
            const charIndex = this.pdfiumModule.FPDFText_GetCharIndexAtPos(textPagePtr, left, top, 2, 2);
            let fontFamily = '';
            let fontSize = rect.size.height;
            if (charIndex >= 0) {
                fontSize = this.pdfiumModule.FPDFText_GetFontSize(textPagePtr, charIndex);
                const fontNameLength = this.pdfiumModule.FPDFText_GetFontInfo(textPagePtr, charIndex, 0, 0, 0);
                const bytesCount = fontNameLength + 1; // include NIL
                const textBufferPtr = this.malloc(bytesCount);
                const flagsPtr = this.malloc(4);
                this.pdfiumModule.FPDFText_GetFontInfo(textPagePtr, charIndex, textBufferPtr, bytesCount, flagsPtr);
                fontFamily = this.pdfiumModule.pdfium.UTF8ToString(textBufferPtr);
                this.free(textBufferPtr);
                this.free(flagsPtr);
            }
            const textRect = {
                content,
                rect,
                font: {
                    family: fontFamily,
                    size: fontSize,
                },
            };
            textRects.push(textRect);
        }
        return textRects;
    }
    /**
     * Return geometric + logical text layout for one page
     * (glyph-only implementation, no FPDFText_GetRect).
     *
     * @public
     */
    getPageGeometry(doc, page) {
        const label = 'getPageGeometry';
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, label, 'Begin', doc.id);
        /* ── guards ───────────────────────────────────────────── */
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, label, 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        /* ── native handles ──────────────────────────────────── */
        const pageCtx = ctx.acquirePage(page.index);
        const textPagePtr = pageCtx.getTextPage();
        /* ── 1. read ALL glyphs in logical order ─────────────── */
        const glyphCount = this.pdfiumModule.FPDFText_CountChars(textPagePtr);
        const glyphs = [];
        for (let i = 0; i < glyphCount; i++) {
            const g = this.readGlyphInfo(page, pageCtx.pagePtr, textPagePtr, i);
            glyphs.push(g);
        }
        /* ── 2. build visual runs from glyph stream ───────────── */
        const runs = this.buildRunsFromGlyphs(glyphs, textPagePtr);
        /* ── 3. cleanup & resolve task ───────────────────────── */
        pageCtx.release();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, label, 'End', doc.id);
        return PdfTaskHelper.resolve({ runs });
    }
    /**
     * Group consecutive glyphs that belong to the same CPDF_TextObject
     * using FPDFText_GetTextObject(), and calculate rotation from glyph positions.
     */
    buildRunsFromGlyphs(glyphs, textPagePtr) {
        const runs = [];
        let current = null;
        let curObjPtr = null;
        let bounds = null;
        /** ── main loop ──────────────────────────────────────────── */
        for (let i = 0; i < glyphs.length; i++) {
            const g = glyphs[i];
            /* 1 — find the CPDF_TextObject this glyph belongs to */
            const objPtr = this.pdfiumModule.FPDFText_GetTextObject(textPagePtr, i);
            /* 2 — start a new run when the text object changes */
            if (objPtr !== curObjPtr) {
                curObjPtr = objPtr;
                current = {
                    rect: {
                        x: g.origin.x,
                        y: g.origin.y,
                        width: g.size.width,
                        height: g.size.height,
                    },
                    charStart: i,
                    glyphs: [],
                };
                bounds = {
                    minX: g.origin.x,
                    minY: g.origin.y,
                    maxX: g.origin.x + g.size.width,
                    maxY: g.origin.y + g.size.height,
                };
                runs.push(current);
            }
            /* 3 — append the slim glyph record */
            current.glyphs.push({
                x: g.origin.x,
                y: g.origin.y,
                width: g.size.width,
                height: g.size.height,
                flags: g.isEmpty ? 2 : g.isSpace ? 1 : 0,
            });
            /* 4 — expand the run's bounding rect */
            if (g.isEmpty) {
                continue;
            }
            const right = g.origin.x + g.size.width;
            const bottom = g.origin.y + g.size.height;
            // Update bounds
            bounds.minX = Math.min(bounds.minX, g.origin.x);
            bounds.minY = Math.min(bounds.minY, g.origin.y);
            bounds.maxX = Math.max(bounds.maxX, right);
            bounds.maxY = Math.max(bounds.maxY, bottom);
            // Calculate final rect from bounds
            current.rect.x = bounds.minX;
            current.rect.y = bounds.minY;
            current.rect.width = bounds.maxX - bounds.minX;
            current.rect.height = bounds.maxY - bounds.minY;
        }
        return runs;
    }
    /**
     * Extract glyph geometry + metadata for `charIndex`
     *
     * Returns device–space coordinates:
     *   x,y  → **top-left** corner (integer-pixels)
     *   w,h  → width / height (integer-pixels, ≥ 1)
     *
     * And two flags:
     *   isSpace → true if the glyph's Unicode code-point is U+0020
     */
    readGlyphInfo(page, pagePtr, textPagePtr, charIndex) {
        // ── native stack temp pointers ──────────────────────────────
        const dx1Ptr = this.malloc(4);
        const dy1Ptr = this.malloc(4);
        const dx2Ptr = this.malloc(4);
        const dy2Ptr = this.malloc(4);
        const rectPtr = this.malloc(16); // 4 floats = 16 bytes
        let x = 0, y = 0, width = 0, height = 0, isSpace = false;
        // ── 1) raw glyph bbox in                      page-user-space
        if (this.pdfiumModule.FPDFText_GetLooseCharBox(textPagePtr, charIndex, rectPtr)) {
            const left = this.pdfiumModule.pdfium.getValue(rectPtr, 'float');
            const top = this.pdfiumModule.pdfium.getValue(rectPtr + 4, 'float');
            const right = this.pdfiumModule.pdfium.getValue(rectPtr + 8, 'float');
            const bottom = this.pdfiumModule.pdfium.getValue(rectPtr + 12, 'float');
            if (left === right || top === bottom) {
                return {
                    origin: { x: 0, y: 0 },
                    size: { width: 0, height: 0 },
                    isEmpty: true,
                };
            }
            // ── 2) map 2 opposite corners to            device-space
            this.pdfiumModule.FPDF_PageToDevice(pagePtr, 0, 0, page.size.width, page.size.height, 
            /*rotate=*/ 0, left, top, dx1Ptr, dy1Ptr);
            this.pdfiumModule.FPDF_PageToDevice(pagePtr, 0, 0, page.size.width, page.size.height, 
            /*rotate=*/ 0, right, bottom, dx2Ptr, dy2Ptr);
            const x1 = this.pdfiumModule.pdfium.getValue(dx1Ptr, 'i32');
            const y1 = this.pdfiumModule.pdfium.getValue(dy1Ptr, 'i32');
            const x2 = this.pdfiumModule.pdfium.getValue(dx2Ptr, 'i32');
            const y2 = this.pdfiumModule.pdfium.getValue(dy2Ptr, 'i32');
            x = Math.min(x1, x2);
            y = Math.min(y1, y2);
            width = Math.max(1, Math.abs(x2 - x1));
            height = Math.max(1, Math.abs(y2 - y1));
            // ── 3) extra flags ───────────────────────────────────────
            const uc = this.pdfiumModule.FPDFText_GetUnicode(textPagePtr, charIndex);
            isSpace = uc === 32;
        }
        // ── free tmps ───────────────────────────────────────────────
        [rectPtr, dx1Ptr, dy1Ptr, dx2Ptr, dy2Ptr].forEach((p) => this.free(p));
        return {
            origin: { x, y },
            size: { width, height },
            ...(isSpace && { isSpace }),
        };
    }
    /**
     * Geometry-only text extraction
     * ------------------------------------------
     * Returns every glyph on the requested page
     * in the logical order delivered by PDFium.
     *
     * The promise resolves to an array of objects:
     *   {
     *     idx:     number;            // glyph index on the page (0…n-1)
     *     origin:  { x: number; y: number };
     *     size:    { width: number;  height: number };
     *     angle:   number;            // degrees, counter-clock-wise
     *     isSpace: boolean;           // true  → U+0020
     *   }
     *
     * No Unicode is included; front-end decides whether to hydrate it.
     */
    getPageGlyphs(doc, page) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'getPageGlyphs', doc, page);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'getPageGlyphs', 'Begin', doc.id);
        // ── 1) safety: document handle must be alive ───────────────
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'getPageGlyphs', 'End', doc.id);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        // ── 2) load page + text page handles ───────────────────────
        const pageCtx = ctx.acquirePage(page.index);
        const textPagePtr = pageCtx.getTextPage();
        // ── 3) iterate all glyphs in logical order ─────────────────
        const total = this.pdfiumModule.FPDFText_CountChars(textPagePtr);
        const glyphs = new Array(total);
        for (let i = 0; i < total; i++) {
            const g = this.readGlyphInfo(page, pageCtx.pagePtr, textPagePtr, i);
            if (g.isEmpty) {
                continue;
            }
            glyphs[i] = { ...g };
        }
        // ── 4) clean-up native handles ─────────────────────────────
        pageCtx.release();
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'getPageGlyphs', 'End', doc.id);
        return PdfTaskHelper.resolve(glyphs);
    }
    readCharBox(page, pagePtr, textPagePtr, charIndex) {
        const topPtr = this.malloc(8);
        const leftPtr = this.malloc(8);
        const bottomPtr = this.malloc(8);
        const rightPtr = this.malloc(8);
        let x = 0;
        let y = 0;
        let width = 0;
        let height = 0;
        if (this.pdfiumModule.FPDFText_GetCharBox(textPagePtr, charIndex, leftPtr, rightPtr, bottomPtr, topPtr)) {
            const top = this.pdfiumModule.pdfium.getValue(topPtr, 'double');
            const left = this.pdfiumModule.pdfium.getValue(leftPtr, 'double');
            const bottom = this.pdfiumModule.pdfium.getValue(bottomPtr, 'double');
            const right = this.pdfiumModule.pdfium.getValue(rightPtr, 'double');
            const deviceXPtr = this.malloc(4);
            const deviceYPtr = this.malloc(4);
            this.pdfiumModule.FPDF_PageToDevice(pagePtr, 0, 0, page.size.width, page.size.height, 0, left, top, deviceXPtr, deviceYPtr);
            x = this.pdfiumModule.pdfium.getValue(deviceXPtr, 'i32');
            y = this.pdfiumModule.pdfium.getValue(deviceYPtr, 'i32');
            this.free(deviceXPtr);
            this.free(deviceYPtr);
            width = Math.ceil(Math.abs(right - left));
            height = Math.ceil(Math.abs(top - bottom));
        }
        this.free(topPtr);
        this.free(leftPtr);
        this.free(bottomPtr);
        this.free(rightPtr);
        return {
            origin: {
                x,
                y,
            },
            size: {
                width,
                height,
            },
        };
    }
    /**
     * Read page annotations
     * @param page - page info
     * @param docPtr - pointer to pdf document
     * @param pagePtr - pointer to pdf page
     * @param textPagePtr - pointe to pdf text page
     * @param scaleFactor - scale factor
     * @param rotation - rotation angle
     * @returns annotations on the pdf page
     *
     * @private
     */
    readPageAnnotations(ctx, page) {
        const pageCtx = ctx.acquirePage(page.index);
        const annotationCount = this.pdfiumModule.FPDFPage_GetAnnotCount(pageCtx.pagePtr);
        const annotations = [];
        for (let i = 0; i < annotationCount; i++) {
            pageCtx.withAnnotation(i, (annotPtr) => {
                const annotation = this.readPageAnnotation(page, pageCtx, annotPtr, i);
                if (annotation) {
                    annotations.push(annotation);
                }
            });
        }
        return annotations;
    }
    /**
     * Read pdf annotation from pdf document
     * @param page  - pdf page infor
     * @param docPtr - pointer to pdf document object
     * @param pagePtr - pointer to pdf page object
     * @param  textPagePtr - pointer to pdf text page object
     * @param formHandle - form handle
     * @param index - index of annotation in the pdf page
     * @param scaleFactor  - factor of scalling
     * @param rotation  - rotation angle
     * @returns pdf annotation
     *
     * @private
     */
    readPageAnnotation(page, pageCtx, annotationPtr, index) {
        const subType = this.pdfiumModule.FPDFAnnot_GetSubtype(annotationPtr);
        let annotation;
        switch (subType) {
            case PdfAnnotationSubtype.TEXT:
                {
                    annotation = this.readPdfTextAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.FREETEXT:
                {
                    annotation = this.readPdfFreeTextAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.LINK:
                {
                    annotation = this.readPdfLinkAnno(page, pageCtx.docPtr, pageCtx.pagePtr, pageCtx.getTextPage(), annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.WIDGET:
                {
                    annotation = this.readPdfWidgetAnno(page, pageCtx.pagePtr, annotationPtr, pageCtx.getFormHandle(), index);
                }
                break;
            case PdfAnnotationSubtype.FILEATTACHMENT:
                {
                    annotation = this.readPdfFileAttachmentAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.INK:
                {
                    annotation = this.readPdfInkAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.POLYGON:
                {
                    annotation = this.readPdfPolygonAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.POLYLINE:
                {
                    annotation = this.readPdfPolylineAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.LINE:
                {
                    annotation = this.readPdfLineAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.HIGHLIGHT:
                annotation = this.readPdfHighlightAnno(page, pageCtx.pagePtr, annotationPtr, index);
                break;
            case PdfAnnotationSubtype.STAMP:
                {
                    annotation = this.readPdfStampAnno(pageCtx.docPtr, page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.SQUARE:
                {
                    annotation = this.readPdfSquareAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.CIRCLE:
                {
                    annotation = this.readPdfCircleAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.UNDERLINE:
                {
                    annotation = this.readPdfUnderlineAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.SQUIGGLY:
                {
                    annotation = this.readPdfSquigglyAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.STRIKEOUT:
                {
                    annotation = this.readPdfStrikeOutAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            case PdfAnnotationSubtype.CARET:
                {
                    annotation = this.readPdfCaretAnno(page, pageCtx.pagePtr, annotationPtr, index);
                }
                break;
            default:
                {
                    annotation = this.readPdfAnno(page, pageCtx.pagePtr, subType, annotationPtr, index);
                }
                break;
        }
        return annotation;
    }
    /**
     * Return the colour stored directly in the annotation dictionary's `/C` entry.
     *
     * Most PDFs created by Acrobat, Microsoft Office, LaTeX, etc. include this entry.
     * When the key is absent (common in macOS Preview, Chrome, Drawboard) the call
     * fails and the function returns `undefined`.
     *
     * @param annotationPtr - pointer to an `FPDF_ANNOTATION`
     * @returns An RGBA tuple (0-255 channels) or `undefined` if no `/C` entry exists
     *
     * @private
     */
    readAnnotationColor(annotationPtr, colorType = PdfAnnotationColorType.Color) {
        const rPtr = this.malloc(4);
        const gPtr = this.malloc(4);
        const bPtr = this.malloc(4);
        const aPtr = this.malloc(4);
        // colourType 0 = "colour" (stroke/fill); other types are interior/border
        const ok = this.pdfiumModule.EPDFAnnot_GetColor(annotationPtr, colorType, rPtr, gPtr, bPtr, aPtr);
        let colour;
        if (ok) {
            colour = {
                red: this.pdfiumModule.pdfium.getValue(rPtr, 'i32') & 0xff,
                green: this.pdfiumModule.pdfium.getValue(gPtr, 'i32') & 0xff,
                blue: this.pdfiumModule.pdfium.getValue(bPtr, 'i32') & 0xff,
                alpha: this.pdfiumModule.pdfium.getValue(aPtr, 'i32') & 0xff, // 0 = transparent, 255 = opaque
            };
        }
        this.free(rPtr);
        this.free(gPtr);
        this.free(bPtr);
        this.free(aPtr);
        return colour;
    }
    /* --------------------------------------------------------------------------- */
    /**
     * Resolve the visible fill colour for **Highlight / Underline / StrikeOut /
     * Squiggly** markup annotations.
     *
     * Resolution order (first non-`undefined` wins):
     *  1. `/C` dictionary entry – fast, present in Acrobat / Office PDFs
     *  2. Appearance-stream objects – drills into paths & nested forms
     *  3. Hard-coded fallback (Acrobat-style opaque yellow)
     *
     * @param annotationPtr - pointer to an `FPDF_ANNOTATION`
     * @param fallback      - colour to use when the PDF stores no tint at all
     * @returns WebAlphaColor with hex color and opacity (0-1)
     *
     * @private
     */
    resolveAnnotationColor(annotationPtr, colorType = PdfAnnotationColorType.Color, fallback = { red: 255, green: 245, blue: 155, alpha: 255 }) {
        const pdfColor = this.readAnnotationColor(annotationPtr, colorType) ?? fallback;
        return pdfAlphaColorToWebAlphaColor(pdfColor);
    }
    /**
     * Set the fill/stroke colour for a **Highlight / Underline / StrikeOut / Squiggly** markup annotation.
     *
     * @param annotationPtr - pointer to the annotation whose colour is being set
     * @param webAlphaColor - WebAlphaColor with hex color and opacity (0-1)
     * @param shouldClearAP - whether to clear the /AP entry
     * @param which - which colour to set (0 = fill, 1 = stroke)
     * @returns `true` if the operation was successful
     *
     * @private
     */
    setAnnotationColor(annotationPtr, webAlphaColor, colorType = PdfAnnotationColorType.Color) {
        const pdfAlphaColor = webAlphaColorToPdfAlphaColor(webAlphaColor);
        return this.pdfiumModule.EPDFAnnot_SetColor(annotationPtr, colorType, pdfAlphaColor.red & 0xff, pdfAlphaColor.green & 0xff, pdfAlphaColor.blue & 0xff, (pdfAlphaColor.alpha ?? 255) & 0xff);
    }
    /**
     * Border‐style + width helper
     *
     * Tries the new PDFium helper `EPDFAnnot_GetBorderStyle()` (patch series
     * 9 July 2025).
     *
     * @param  annotationPtr  pointer to an `FPDF_ANNOTATION`
     * @returns `{ ok, style, width }`
     *          • `ok`     – `true` when the call succeeded
     *          • `style`  – `PdfAnnotationBorderStyle` enum
     *          • `width`  – stroke-width in points (defaults to 0 pt)
     */
    getBorderStyle(annotationPtr) {
        /* 1 ── allocate tmp storage for the returned width ─────────────── */
        const widthPtr = this.malloc(4);
        let width = 0;
        let style = PdfAnnotationBorderStyle.UNKNOWN;
        let ok = false;
        style = this.pdfiumModule.EPDFAnnot_GetBorderStyle(annotationPtr, widthPtr);
        width = this.pdfiumModule.pdfium.getValue(widthPtr, 'float');
        ok = style !== PdfAnnotationBorderStyle.UNKNOWN;
        this.free(widthPtr);
        return { ok, style, width };
    }
    setBorderStyle(annotationPtr, style, width) {
        return this.pdfiumModule.EPDFAnnot_SetBorderStyle(annotationPtr, style, width);
    }
    /**
     * Border-effect (“cloudy”) helper
     *
     * Calls the new PDFium function `EPDFAnnot_GetBorderEffect()` (July 2025).
     *
     * @param  annotationPtr  pointer to an `FPDF_ANNOTATION`
     * @returns `{ ok, intensity }`
     *          • `ok`        – `true` when the annotation *does* have a
     *                          valid cloudy-border effect
     *          • `intensity` – radius/intensity value (0 when `ok` is false)
     */
    getBorderEffect(annotationPtr) {
        const intensityPtr = this.malloc(4);
        const ok = !!this.pdfiumModule.EPDFAnnot_GetBorderEffect(annotationPtr, intensityPtr);
        const intensity = ok ? this.pdfiumModule.pdfium.getValue(intensityPtr, 'float') : 0;
        this.free(intensityPtr);
        return { ok, intensity };
    }
    /**
     * Rectangle-differences helper ( /RD array on Square / Circle annots )
     *
     * Calls `EPDFAnnot_GetRectangleDifferences()` introduced in July 2025.
     *
     * @param  annotationPtr  pointer to an `FPDF_ANNOTATION`
     * @returns `{ ok, left, top, right, bottom }`
     *          • `ok`     – `true` when the annotation *has* an /RD entry
     *          • the four floats are 0 when `ok` is false
     */
    getRectangleDifferences(annotationPtr) {
        /* tmp storage ─────────────────────────────────────────── */
        const lPtr = this.malloc(4);
        const tPtr = this.malloc(4);
        const rPtr = this.malloc(4);
        const bPtr = this.malloc(4);
        const ok = !!this.pdfiumModule.EPDFAnnot_GetRectangleDifferences(annotationPtr, lPtr, tPtr, rPtr, bPtr);
        const pdf = this.pdfiumModule.pdfium;
        const left = pdf.getValue(lPtr, 'float');
        const top = pdf.getValue(tPtr, 'float');
        const right = pdf.getValue(rPtr, 'float');
        const bottom = pdf.getValue(bPtr, 'float');
        /* cleanup ─────────────────────────────────────────────── */
        this.free(lPtr);
        this.free(tPtr);
        this.free(rPtr);
        this.free(bPtr);
        return { ok, left, top, right, bottom };
    }
    /**
     * Dash-pattern helper ( /BS → /D array, dashed borders only )
     *
     * Uses the two new PDFium helpers:
     *   • `EPDFAnnot_GetBorderDashPatternCount`
     *   • `EPDFAnnot_GetBorderDashPattern`
     *
     * @param  annotationPtr  pointer to an `FPDF_ANNOTATION`
     * @returns `{ ok, pattern }`
     *          • `ok`       – `true` when the annot is dashed *and* the array
     *                          was retrieved successfully
     *          • `pattern`  – numeric array of dash/space lengths (empty when `ok` is false)
     */
    getBorderDashPattern(annotationPtr) {
        const count = this.pdfiumModule.EPDFAnnot_GetBorderDashPatternCount(annotationPtr);
        if (count === 0) {
            return { ok: false, pattern: [] };
        }
        /* allocate `count` floats on the WASM heap */
        const arrPtr = this.malloc(4 * count);
        const okNative = !!this.pdfiumModule.EPDFAnnot_GetBorderDashPattern(annotationPtr, arrPtr, count);
        /* copy out */
        const pattern = [];
        if (okNative) {
            const pdf = this.pdfiumModule.pdfium;
            for (let i = 0; i < count; i++) {
                pattern.push(pdf.getValue(arrPtr + 4 * i, 'float'));
            }
        }
        this.free(arrPtr);
        return { ok: okNative, pattern };
    }
    /**
     * Read `/QuadPoints` from any annotation and convert each quadrilateral to
     * device-space coordinates.
     *
     * The four points are returned in natural reading order:
     *   `p1 → p2` (top edge) and `p4 → p3` (bottom edge).
     * This preserves the true shape for rotated / skewed text, whereas callers
     * that only need axis-aligned boxes can collapse each quad themselves.
     *
     * @param page          - logical page info object (`PdfPageObject`)
     * @param annotationPtr - pointer to the annotation whose quads are needed
     * @returns Array of `Rect` objects (`[]` if the annotation has no quads)
     *
     * @private
     */
    getQuadPointsAnno(page, annotationPtr) {
        const quadCount = this.pdfiumModule.FPDFAnnot_CountAttachmentPoints(annotationPtr);
        if (quadCount === 0)
            return [];
        const FS_QUADPOINTSF_SIZE = 8 * 4; // eight floats, 32 bytes
        const quads = [];
        for (let qi = 0; qi < quadCount; qi++) {
            const quadPtr = this.malloc(FS_QUADPOINTSF_SIZE);
            const ok = this.pdfiumModule.FPDFAnnot_GetAttachmentPoints(annotationPtr, qi, quadPtr);
            if (ok) {
                // read the eight floats
                const xs = [];
                const ys = [];
                for (let i = 0; i < 4; i++) {
                    const base = quadPtr + i * 8; // 8 bytes per point (x+y)
                    xs.push(this.pdfiumModule.pdfium.getValue(base, 'float'));
                    ys.push(this.pdfiumModule.pdfium.getValue(base + 4, 'float'));
                }
                // convert to device-space
                const p1 = this.convertPagePointToDevicePoint(page, { x: xs[0], y: ys[0] });
                const p2 = this.convertPagePointToDevicePoint(page, { x: xs[1], y: ys[1] });
                const p3 = this.convertPagePointToDevicePoint(page, { x: xs[2], y: ys[2] });
                const p4 = this.convertPagePointToDevicePoint(page, { x: xs[3], y: ys[3] });
                quads.push({ p1, p2, p3, p4 });
            }
            this.free(quadPtr);
        }
        return quads.map(quadToRect);
    }
    /**
     * Set the quadrilaterals for a **Highlight / Underline / StrikeOut / Squiggly** markup annotation.
     *
     * @param page          - logical page info object (`PdfPageObject`)
     * @param annotationPtr - pointer to the annotation whose quads are needed
     * @param rects         - array of `Rect` objects (`[]` if the annotation has no quads)
     * @returns `true` if the operation was successful
     *
     * @private
     */
    syncQuadPointsAnno(page, annotPtr, rects) {
        const FS_QUADPOINTSF_SIZE = 8 * 4; // eight floats, 32 bytes
        const pdf = this.pdfiumModule.pdfium;
        const count = this.pdfiumModule.FPDFAnnot_CountAttachmentPoints(annotPtr);
        const buf = this.malloc(FS_QUADPOINTSF_SIZE);
        /** write one quad into `buf` in annotation space */
        const writeQuad = (r) => {
            const q = rectToQuad(r); // TL, TR, BR, BL
            const p1 = this.convertDevicePointToPagePoint(page, q.p1);
            const p2 = this.convertDevicePointToPagePoint(page, q.p2);
            const p3 = this.convertDevicePointToPagePoint(page, q.p3); // BR
            const p4 = this.convertDevicePointToPagePoint(page, q.p4); // BL
            // PDF QuadPoints order: BL, BR, TL, TR (bottom-left, bottom-right, top-left, top-right)
            pdf.setValue(buf + 0, p1.x, 'float'); // BL (bottom-left)
            pdf.setValue(buf + 4, p1.y, 'float');
            pdf.setValue(buf + 8, p2.x, 'float'); // BR (bottom-right)
            pdf.setValue(buf + 12, p2.y, 'float');
            pdf.setValue(buf + 16, p4.x, 'float'); // TL (top-left)
            pdf.setValue(buf + 20, p4.y, 'float');
            pdf.setValue(buf + 24, p3.x, 'float'); // TR (top-right)
            pdf.setValue(buf + 28, p3.y, 'float');
        };
        /* ----------------------------------------------------------------------- */
        /* 1. overwrite the quads that already exist                               */
        const min = Math.min(count, rects.length);
        for (let i = 0; i < min; i++) {
            writeQuad(rects[i]);
            if (!this.pdfiumModule.FPDFAnnot_SetAttachmentPoints(annotPtr, i, buf)) {
                this.free(buf);
                return false;
            }
        }
        /* 2. append new quads if rects.length > count                             */
        for (let i = count; i < rects.length; i++) {
            writeQuad(rects[i]);
            if (!this.pdfiumModule.FPDFAnnot_AppendAttachmentPoints(annotPtr, buf)) {
                this.free(buf);
                return false;
            }
        }
        this.free(buf);
        return true;
    }
    /**
     * Read ink list from annotation
     * @param page  - logical page info object (`PdfPageObject`)
     * @param annotationPtr - pointer to the annotation whose ink list is needed
     * @returns ink list
     */
    getInkList(page, annotationPtr) {
        const inkList = [];
        const count = this.pdfiumModule.FPDFAnnot_GetInkListCount(annotationPtr);
        for (let i = 0; i < count; i++) {
            const points = [];
            const pointsCount = this.pdfiumModule.FPDFAnnot_GetInkListPath(annotationPtr, i, 0, 0);
            if (pointsCount > 0) {
                const pointMemorySize = 8;
                const pointsPtr = this.malloc(pointsCount * pointMemorySize);
                this.pdfiumModule.FPDFAnnot_GetInkListPath(annotationPtr, i, pointsPtr, pointsCount);
                for (let j = 0; j < pointsCount; j++) {
                    const pointX = this.pdfiumModule.pdfium.getValue(pointsPtr + j * 8, 'float');
                    const pointY = this.pdfiumModule.pdfium.getValue(pointsPtr + j * 8 + 4, 'float');
                    const { x, y } = this.convertPagePointToDevicePoint(page, {
                        x: pointX,
                        y: pointY,
                    });
                    points.push({ x, y });
                }
                this.free(pointsPtr);
            }
            inkList.push({ points });
        }
        return inkList;
    }
    /**
     * Add ink list to annotation
     * @param page  - logical page info object (`PdfPageObject`)
     * @param annotationPtr - pointer to the annotation whose ink list is needed
     * @param annotation - annotation object (`PdfInkAnnoObject`)
     * @returns `true` if the operation was successful
     */
    setInkList(page, annotationPtr, inkList) {
        for (const inkStroke of inkList) {
            const inkPointsCount = inkStroke.points.length;
            const inkPointsPtr = this.malloc(inkPointsCount * 8);
            for (let i = 0; i < inkPointsCount; i++) {
                const point = inkStroke.points[i];
                const { x, y } = this.convertDevicePointToPagePoint(page, point);
                this.pdfiumModule.pdfium.setValue(inkPointsPtr + i * 8, x, 'float');
                this.pdfiumModule.pdfium.setValue(inkPointsPtr + i * 8 + 4, y, 'float');
            }
            if (this.pdfiumModule.FPDFAnnot_AddInkStroke(annotationPtr, inkPointsPtr, inkPointsCount) === -1) {
                this.free(inkPointsPtr);
                return false;
            }
            this.free(inkPointsPtr);
        }
        return true;
    }
    /**
     * Read pdf text annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf text annotation
     *
     * @private
     */
    readPdfTextAnno(page, pagePtr, annotationPtr, index) {
        const annoRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, annoRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const contents = this.getAnnotString(annotationPtr, 'Contents') || '';
        const state = this.getAnnotString(annotationPtr, 'State');
        const stateModel = this.getAnnotString(annotationPtr, 'StateModel');
        const webAlphaColor = this.resolveAnnotationColor(annotationPtr);
        const inReplyToId = this.getInReplyToId(pagePtr, annotationPtr);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.TEXT,
            contents,
            ...webAlphaColor,
            rect,
            inReplyToId,
            author,
            modified,
            state,
            stateModel,
        };
    }
    /**
     * Read pdf freetext annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf freetext annotation
     *
     * @private
     */
    readPdfFreeTextAnno(page, pagePtr, annotationPtr, index) {
        const annoRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, annoRect);
        const contents = this.getAnnotString(annotationPtr, 'Contents') || '';
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.FREETEXT,
            contents,
            author,
            modified,
            rect,
        };
    }
    /**
     * Read pdf link annotation from pdf document
     * @param page  - pdf page infor
     * @param docPtr - pointer to pdf document object
     * @param pagePtr - pointer to pdf page object
     * @param  textPagePtr - pointer to pdf text page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf link annotation
     *
     * @private
     */
    readPdfLinkAnno(page, docPtr, pagePtr, textPagePtr, annotationPtr, index) {
        const linkPtr = this.pdfiumModule.FPDFAnnot_GetLink(annotationPtr);
        if (!linkPtr) {
            return;
        }
        const annoRect = this.readPageAnnoRect(annotationPtr);
        const { left, top, right, bottom } = annoRect;
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, annoRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const utf16Length = this.pdfiumModule.FPDFText_GetBoundedText(textPagePtr, left, top, right, bottom, 0, 0);
        const bytesCount = (utf16Length + 1) * 2; // include NIL
        const textBufferPtr = this.malloc(bytesCount);
        this.pdfiumModule.FPDFText_GetBoundedText(textPagePtr, left, top, right, bottom, textBufferPtr, utf16Length);
        const text = this.pdfiumModule.pdfium.UTF16ToString(textBufferPtr);
        this.free(textBufferPtr);
        const target = this.readPdfLinkAnnoTarget(docPtr, () => {
            return this.pdfiumModule.FPDFLink_GetAction(linkPtr);
        }, () => {
            return this.pdfiumModule.FPDFLink_GetDest(docPtr, linkPtr);
        });
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.LINK,
            text,
            target,
            rect,
            author,
            modified,
        };
    }
    /**
     * Read pdf widget annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param formHandle - form handle
     * @param index  - index of annotation in the pdf page
     * @returns pdf widget annotation
     *
     * @private
     */
    readPdfWidgetAnno(page, pagePtr, annotationPtr, formHandle, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const field = this.readPdfWidgetAnnoField(formHandle, annotationPtr);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.WIDGET,
            rect,
            field,
            author,
            modified,
        };
    }
    /**
     * Read pdf file attachment annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf file attachment annotation
     *
     * @private
     */
    readPdfFileAttachmentAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.FILEATTACHMENT,
            rect,
            author,
            modified,
        };
    }
    /**
     * Read pdf ink annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf ink annotation
     *
     * @private
     */
    readPdfInkAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const webAlphaColor = this.resolveAnnotationColor(annotationPtr);
        const { width: strokeWidth } = this.getBorderStyle(annotationPtr);
        const inkList = this.getInkList(page, annotationPtr);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.INK,
            ...webAlphaColor,
            strokeWidth,
            rect,
            inkList,
            author,
            modified,
        };
    }
    /**
     * Read pdf polygon annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf polygon annotation
     *
     * @private
     */
    readPdfPolygonAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const vertices = this.readPdfAnnoVertices(page, pagePtr, annotationPtr);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.POLYGON,
            rect,
            vertices,
            author,
            modified,
        };
    }
    /**
     * Read pdf polyline annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf polyline annotation
     *
     * @private
     */
    readPdfPolylineAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const vertices = this.readPdfAnnoVertices(page, pagePtr, annotationPtr);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.POLYLINE,
            rect,
            vertices,
            author,
            modified,
        };
    }
    /**
     * Read pdf line annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf line annotation
     *
     * @private
     */
    readPdfLineAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const startPointPtr = this.malloc(8);
        const endPointPtr = this.malloc(8);
        this.pdfiumModule.FPDFAnnot_GetLine(annotationPtr, startPointPtr, endPointPtr);
        const startPointX = this.pdfiumModule.pdfium.getValue(startPointPtr, 'float');
        const startPointY = this.pdfiumModule.pdfium.getValue(startPointPtr + 4, 'float');
        const startPoint = this.convertPagePointToDevicePoint(page, {
            x: startPointX,
            y: startPointY,
        });
        const endPointX = this.pdfiumModule.pdfium.getValue(endPointPtr, 'float');
        const endPointY = this.pdfiumModule.pdfium.getValue(endPointPtr + 4, 'float');
        const endPoint = this.convertPagePointToDevicePoint(page, {
            x: endPointX,
            y: endPointY,
        });
        this.free(startPointPtr);
        this.free(endPointPtr);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.LINE,
            rect,
            startPoint,
            endPoint,
            author,
            modified,
        };
    }
    /**
     * Read pdf highlight annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf highlight annotation
     *
     * @private
     */
    readPdfHighlightAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const segmentRects = this.getQuadPointsAnno(page, annotationPtr);
        const webAlphaColor = this.resolveAnnotationColor(annotationPtr);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const contents = this.getAnnotString(annotationPtr, 'Contents') || '';
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.HIGHLIGHT,
            rect,
            contents,
            segmentRects,
            ...webAlphaColor,
            author,
            modified,
        };
    }
    /**
     * Read pdf underline annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf underline annotation
     *
     * @private
     */
    readPdfUnderlineAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const segmentRects = this.getQuadPointsAnno(page, annotationPtr);
        const contents = this.getAnnotString(annotationPtr, 'Contents') || '';
        const webAlphaColor = this.resolveAnnotationColor(annotationPtr);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.UNDERLINE,
            rect,
            contents,
            segmentRects,
            ...webAlphaColor,
            author,
            modified,
        };
    }
    /**
     * Read strikeout annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf strikeout annotation
     *
     * @private
     */
    readPdfStrikeOutAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const segmentRects = this.getQuadPointsAnno(page, annotationPtr);
        const contents = this.getAnnotString(annotationPtr, 'Contents') || '';
        const webAlphaColor = this.resolveAnnotationColor(annotationPtr);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.STRIKEOUT,
            rect,
            contents,
            segmentRects,
            ...webAlphaColor,
            author,
            modified,
        };
    }
    /**
     * Read pdf squiggly annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf squiggly annotation
     *
     * @private
     */
    readPdfSquigglyAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const segmentRects = this.getQuadPointsAnno(page, annotationPtr);
        const contents = this.getAnnotString(annotationPtr, 'Contents') || '';
        const webAlphaColor = this.resolveAnnotationColor(annotationPtr);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.SQUIGGLY,
            rect,
            contents,
            segmentRects,
            ...webAlphaColor,
            author,
            modified,
        };
    }
    /**
     * Read pdf caret annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf caret annotation
     *
     * @private
     */
    readPdfCaretAnno(page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.CARET,
            rect,
            author,
            modified,
        };
    }
    /**
     * Read pdf stamp annotation
     * @param docPtr - pointer to pdf document object
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf stamp annotation
     *
     * @private
     */
    readPdfStampAnno(docPtr, page, pagePtr, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const contents = [];
        const objectCount = this.pdfiumModule.FPDFAnnot_GetObjectCount(annotationPtr);
        for (let i = 0; i < objectCount; i++) {
            const annotationObjectPtr = this.pdfiumModule.FPDFAnnot_GetObject(annotationPtr, i);
            const pageObj = this.readPdfPageObject(annotationObjectPtr);
            if (pageObj) {
                contents.push(pageObj);
            }
        }
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.STAMP,
            rect,
            contents,
            author,
            modified,
        };
    }
    /**
     * Read pdf object in pdf page
     * @param pageObjectPtr  - pointer to pdf object in page
     * @returns pdf object in page
     *
     * @private
     */
    readPdfPageObject(pageObjectPtr) {
        const type = this.pdfiumModule.FPDFPageObj_GetType(pageObjectPtr);
        switch (type) {
            case PdfPageObjectType.PATH:
                return this.readPathObject(pageObjectPtr);
            case PdfPageObjectType.IMAGE:
                return this.readImageObject(pageObjectPtr);
            case PdfPageObjectType.FORM:
                return this.readFormObject(pageObjectPtr);
        }
    }
    /**
     * Read pdf path object
     * @param pathObjectPtr  - pointer to pdf path object in page
     * @returns pdf path object
     *
     * @private
     */
    readPathObject(pathObjectPtr) {
        const segmentCount = this.pdfiumModule.FPDFPath_CountSegments(pathObjectPtr);
        const leftPtr = this.malloc(4);
        const bottomPtr = this.malloc(4);
        const rightPtr = this.malloc(4);
        const topPtr = this.malloc(4);
        this.pdfiumModule.FPDFPageObj_GetBounds(pathObjectPtr, leftPtr, bottomPtr, rightPtr, topPtr);
        const left = this.pdfiumModule.pdfium.getValue(leftPtr, 'float');
        const bottom = this.pdfiumModule.pdfium.getValue(bottomPtr, 'float');
        const right = this.pdfiumModule.pdfium.getValue(rightPtr, 'float');
        const top = this.pdfiumModule.pdfium.getValue(topPtr, 'float');
        const bounds = { left, bottom, right, top };
        this.free(leftPtr);
        this.free(bottomPtr);
        this.free(rightPtr);
        this.free(topPtr);
        const segments = [];
        for (let i = 0; i < segmentCount; i++) {
            const segment = this.readPdfSegment(pathObjectPtr, i);
            segments.push(segment);
        }
        const matrix = this.readPdfPageObjectTransformMatrix(pathObjectPtr);
        return {
            type: PdfPageObjectType.PATH,
            bounds,
            segments,
            matrix,
        };
    }
    /**
     * Read segment of pdf path object
     * @param annotationObjectPtr - pointer to pdf path object
     * @param segmentIndex - index of segment
     * @returns pdf segment in pdf path
     *
     * @private
     */
    readPdfSegment(annotationObjectPtr, segmentIndex) {
        const segmentPtr = this.pdfiumModule.FPDFPath_GetPathSegment(annotationObjectPtr, segmentIndex);
        const segmentType = this.pdfiumModule.FPDFPathSegment_GetType(segmentPtr);
        const isClosed = this.pdfiumModule.FPDFPathSegment_GetClose(segmentPtr);
        const pointXPtr = this.malloc(4);
        const pointYPtr = this.malloc(4);
        this.pdfiumModule.FPDFPathSegment_GetPoint(segmentPtr, pointXPtr, pointYPtr);
        const pointX = this.pdfiumModule.pdfium.getValue(pointXPtr, 'float');
        const pointY = this.pdfiumModule.pdfium.getValue(pointYPtr, 'float');
        this.free(pointXPtr);
        this.free(pointYPtr);
        return {
            type: segmentType,
            point: { x: pointX, y: pointY },
            isClosed,
        };
    }
    /**
     * Read pdf image object from pdf document
     * @param pageObjectPtr  - pointer to pdf image object in page
     * @returns pdf image object
     *
     * @private
     */
    readImageObject(imageObjectPtr) {
        const bitmapPtr = this.pdfiumModule.FPDFImageObj_GetBitmap(imageObjectPtr);
        const bitmapBufferPtr = this.pdfiumModule.FPDFBitmap_GetBuffer(bitmapPtr);
        const bitmapWidth = this.pdfiumModule.FPDFBitmap_GetWidth(bitmapPtr);
        const bitmapHeight = this.pdfiumModule.FPDFBitmap_GetHeight(bitmapPtr);
        const format = this.pdfiumModule.FPDFBitmap_GetFormat(bitmapPtr);
        const pixelCount = bitmapWidth * bitmapHeight;
        const bytesPerPixel = 4;
        const array = new Uint8ClampedArray(pixelCount * bytesPerPixel);
        for (let i = 0; i < pixelCount; i++) {
            switch (format) {
                case BitmapFormat.Bitmap_BGR:
                    {
                        const blue = this.pdfiumModule.pdfium.getValue(bitmapBufferPtr + i * 3, 'i8');
                        const green = this.pdfiumModule.pdfium.getValue(bitmapBufferPtr + i * 3 + 1, 'i8');
                        const red = this.pdfiumModule.pdfium.getValue(bitmapBufferPtr + i * 3 + 2, 'i8');
                        array[i * bytesPerPixel] = red;
                        array[i * bytesPerPixel + 1] = green;
                        array[i * bytesPerPixel + 2] = blue;
                        array[i * bytesPerPixel + 3] = 100;
                    }
                    break;
            }
        }
        const imageData = new ImageData(array, bitmapWidth, bitmapHeight);
        const matrix = this.readPdfPageObjectTransformMatrix(imageObjectPtr);
        return {
            type: PdfPageObjectType.IMAGE,
            imageData,
            matrix,
        };
    }
    /**
     * Read form object from pdf document
     * @param formObjectPtr  - pointer to pdf form object in page
     * @returns pdf form object
     *
     * @private
     */
    readFormObject(formObjectPtr) {
        const objectCount = this.pdfiumModule.FPDFFormObj_CountObjects(formObjectPtr);
        const objects = [];
        for (let i = 0; i < objectCount; i++) {
            const pageObjectPtr = this.pdfiumModule.FPDFFormObj_GetObject(formObjectPtr, i);
            const pageObj = this.readPdfPageObject(pageObjectPtr);
            if (pageObj) {
                objects.push(pageObj);
            }
        }
        const matrix = this.readPdfPageObjectTransformMatrix(formObjectPtr);
        return {
            type: PdfPageObjectType.FORM,
            objects,
            matrix,
        };
    }
    /**
     * Read pdf object in pdf page
     * @param pageObjectPtr  - pointer to pdf object in page
     * @returns pdf object in page
     *
     * @private
     */
    readPdfPageObjectTransformMatrix(pageObjectPtr) {
        const matrixPtr = this.malloc(4 * 6);
        if (this.pdfiumModule.FPDFPageObj_GetMatrix(pageObjectPtr, matrixPtr)) {
            const a = this.pdfiumModule.pdfium.getValue(matrixPtr, 'float');
            const b = this.pdfiumModule.pdfium.getValue(matrixPtr + 4, 'float');
            const c = this.pdfiumModule.pdfium.getValue(matrixPtr + 8, 'float');
            const d = this.pdfiumModule.pdfium.getValue(matrixPtr + 12, 'float');
            const e = this.pdfiumModule.pdfium.getValue(matrixPtr + 16, 'float');
            const f = this.pdfiumModule.pdfium.getValue(matrixPtr + 20, 'float');
            this.free(matrixPtr);
            return { a, b, c, d, e, f };
        }
        this.free(matrixPtr);
        return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
    }
    /**
     * Return the stroke-width declared in the annotation’s /Border or /BS entry.
     * Falls back to 1 pt when nothing is defined.
     *
     * @param annotationPtr - pointer to pdf annotation
     * @returns stroke-width
     *
     * @private
     */
    getStrokeWidth(annotationPtr) {
        // FPDFAnnot_GetBorder(annot, &hRadius, &vRadius, &borderWidth)
        const hPtr = this.malloc(4);
        const vPtr = this.malloc(4);
        const wPtr = this.malloc(4);
        const ok = this.pdfiumModule.FPDFAnnot_GetBorder(annotationPtr, hPtr, vPtr, wPtr);
        const width = ok ? this.pdfiumModule.pdfium.getValue(wPtr, 'float') : 1; // default 1 pt
        this.free(hPtr);
        this.free(vPtr);
        this.free(wPtr);
        return width;
    }
    /**
     * Fetches the `/F` flag bit-field from an annotation.
     *
     * @param annotationPtr pointer to an `FPDF_ANNOTATION`
     * @returns `{ raw, flags }`
     *          • `raw`   – the 32-bit integer returned by PDFium
     *          • `flags` – object with individual booleans
     */
    getAnnotationFlags(annotationPtr) {
        const rawFlags = this.pdfiumModule.FPDFAnnot_GetFlags(annotationPtr); // number
        return flagsToNames(rawFlags);
    }
    /**
     * Read circle annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf circle annotation
     *
     * @private
     */
    readPdfCircleAnno(page, pagePtr, annotationPtr, index) {
        const flags = this.getAnnotationFlags(annotationPtr);
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const { color, opacity } = this.resolveAnnotationColor(annotationPtr, PdfAnnotationColorType.InteriorColor);
        const { color: strokeColor } = this.resolveAnnotationColor(annotationPtr);
        let { style: strokeStyle, width: strokeWidth } = this.getBorderStyle(annotationPtr);
        let cloudyBorderIntensity;
        let cloudyBorderInset;
        if (strokeStyle === PdfAnnotationBorderStyle.CLOUDY ||
            strokeStyle === PdfAnnotationBorderStyle.UNKNOWN) {
            const { ok: hasEffect, intensity } = this.getBorderEffect(annotationPtr);
            if (hasEffect) {
                cloudyBorderIntensity = intensity;
                strokeStyle = PdfAnnotationBorderStyle.CLOUDY;
                const { ok: hasInset, left, top, right, bottom, } = this.getRectangleDifferences(annotationPtr);
                if (hasInset)
                    cloudyBorderInset = [left, top, right, bottom];
            }
        }
        let strokeDashArray;
        if (strokeStyle === PdfAnnotationBorderStyle.DASHED) {
            const { ok, pattern } = this.getBorderDashPattern(annotationPtr);
            if (ok) {
                strokeDashArray = pattern;
            }
        }
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.CIRCLE,
            flags,
            color,
            opacity,
            strokeWidth,
            strokeColor,
            strokeStyle,
            rect,
            author,
            modified,
            ...(cloudyBorderIntensity !== undefined && { cloudyBorderIntensity }),
            ...(cloudyBorderInset !== undefined && { cloudyBorderInset }),
            ...(strokeDashArray !== undefined && { strokeDashArray }),
        };
    }
    /**
     * Read square annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf square annotation
     *
     * @private
     */
    readPdfSquareAnno(page, pagePtr, annotationPtr, index) {
        const flags = this.getAnnotationFlags(annotationPtr);
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        const { color, opacity } = this.resolveAnnotationColor(annotationPtr, PdfAnnotationColorType.InteriorColor);
        const { color: strokeColor } = this.resolveAnnotationColor(annotationPtr);
        let { style: strokeStyle, width: strokeWidth } = this.getBorderStyle(annotationPtr);
        let cloudyBorderIntensity;
        let cloudyBorderInset;
        if (strokeStyle === PdfAnnotationBorderStyle.CLOUDY ||
            strokeStyle === PdfAnnotationBorderStyle.UNKNOWN) {
            const { ok: hasEffect, intensity } = this.getBorderEffect(annotationPtr);
            if (hasEffect) {
                cloudyBorderIntensity = intensity;
                strokeStyle = PdfAnnotationBorderStyle.CLOUDY;
                const { ok: hasInset, left, top, right, bottom, } = this.getRectangleDifferences(annotationPtr);
                if (hasInset)
                    cloudyBorderInset = [left, top, right, bottom];
            }
        }
        let strokeDashArray;
        if (strokeStyle === PdfAnnotationBorderStyle.DASHED) {
            const { ok, pattern } = this.getBorderDashPattern(annotationPtr);
            if (ok) {
                strokeDashArray = pattern;
            }
        }
        return {
            pageIndex: page.index,
            id: index,
            type: PdfAnnotationSubtype.SQUARE,
            flags,
            color,
            opacity,
            strokeColor,
            strokeWidth,
            strokeStyle,
            rect,
            author,
            modified,
            ...(cloudyBorderIntensity !== undefined && { cloudyBorderIntensity }),
            ...(cloudyBorderInset !== undefined && { cloudyBorderInset }),
            ...(strokeDashArray !== undefined && { strokeDashArray }),
        };
    }
    /**
     * Read basic info of unsupported pdf annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param type - type of annotation
     * @param annotationPtr - pointer to pdf annotation
     * @param index  - index of annotation in the pdf page
     * @returns pdf annotation
     *
     * @private
     */
    readPdfAnno(page, pagePtr, type, annotationPtr, index) {
        const pageRect = this.readPageAnnoRect(annotationPtr);
        const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
        const author = this.getAnnotString(annotationPtr, 'T');
        const modifiedRaw = this.getAnnotString(annotationPtr, 'M');
        const modified = pdfDateToDate(modifiedRaw);
        return {
            pageIndex: page.index,
            id: index,
            type,
            rect,
            author,
            modified,
        };
    }
    /**
     * Resolve `/IRT` → parent-annotation index on the same page.
     *
     * @param pagePtr        - pointer to FPDF_PAGE
     * @param annotationPtr  - pointer to FPDF_ANNOTATION
     * @returns index (`0…count-1`) or `undefined` when the annotation is *not* a reply
     *
     * @private
     */
    getInReplyToId(pagePtr, annotationPtr) {
        const parentPtr = this.pdfiumModule.FPDFAnnot_GetLinkedAnnot(annotationPtr, 'IRT');
        if (!parentPtr)
            return;
        // PDFium ≥ 5100 – returns −1 when annot not found on page
        const idx = this.pdfiumModule.FPDFPage_GetAnnotIndex(pagePtr, parentPtr);
        return idx >= 0 ? idx : undefined;
    }
    /**
     * Fetch a string value (`/T`, `/M`, `/State`, …) from an annotation.
     *
     * @returns decoded UTF-8 string or `undefined` when the key is absent
     *
     * @private
     */
    getAnnotString(annotationPtr, key) {
        const len = this.pdfiumModule.FPDFAnnot_GetStringValue(annotationPtr, key, 0, 0);
        if (len === 0)
            return;
        const bytes = (len + 1) * 2;
        const ptr = this.malloc(bytes);
        this.pdfiumModule.FPDFAnnot_GetStringValue(annotationPtr, key, ptr, bytes);
        const value = this.pdfiumModule.pdfium.UTF16ToString(ptr);
        this.free(ptr);
        return value || undefined;
    }
    /**
     * Set a string value (`/T`, `/M`, `/State`, …) to an annotation.
     *
     * @returns `true` if the operation was successful
     *
     * @private
     */
    setAnnotString(annotationPtr, key, value) {
        const bytes = 2 * (value.length + 1);
        const ptr = this.malloc(bytes);
        this.pdfiumModule.pdfium.stringToUTF16(value, ptr, bytes);
        const ok = this.pdfiumModule.FPDFAnnot_SetStringValue(annotationPtr, key, ptr);
        this.free(ptr);
        return ok;
    }
    /**
     * Read vertices of pdf annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @returns vertices of pdf annotation
     *
     * @private
     */
    readPdfAnnoVertices(page, pagePtr, annotationPtr) {
        const vertices = [];
        const count = this.pdfiumModule.FPDFAnnot_GetVertices(annotationPtr, 0, 0);
        const pointMemorySize = 8;
        const pointsPtr = this.malloc(count * pointMemorySize);
        this.pdfiumModule.FPDFAnnot_GetVertices(annotationPtr, pointsPtr, count);
        for (let i = 0; i < count; i++) {
            const pointX = this.pdfiumModule.pdfium.getValue(pointsPtr + i * pointMemorySize, 'float');
            const pointY = this.pdfiumModule.pdfium.getValue(pointsPtr + i * pointMemorySize + 4, 'float');
            const { x, y } = this.convertPagePointToDevicePoint(page, {
                x: pointX,
                y: pointY,
            });
            vertices.push({
                x,
                y,
            });
        }
        this.free(pointsPtr);
        return vertices;
    }
    /**
     * Read the target of pdf bookmark
     * @param docPtr - pointer to pdf document object
     * @param getActionPtr - callback function to retrive the pointer of action
     * @param getDestinationPtr - callback function to retrive the pointer of destination
     * @returns target of pdf bookmark
     *
     * @private
     */
    readPdfBookmarkTarget(docPtr, getActionPtr, getDestinationPtr) {
        const actionPtr = getActionPtr();
        if (actionPtr) {
            const action = this.readPdfAction(docPtr, actionPtr);
            return {
                type: 'action',
                action,
            };
        }
        else {
            const destinationPtr = getDestinationPtr();
            if (destinationPtr) {
                const destination = this.readPdfDestination(docPtr, destinationPtr);
                return {
                    type: 'destination',
                    destination,
                };
            }
        }
    }
    /**
     * Read field of pdf widget annotation
     * @param formHandle - form handle
     * @param annotationPtr - pointer to pdf annotation
     * @returns field of pdf widget annotation
     *
     * @private
     */
    readPdfWidgetAnnoField(formHandle, annotationPtr) {
        const flag = this.pdfiumModule.FPDFAnnot_GetFormFieldFlags(formHandle, annotationPtr);
        const type = this.pdfiumModule.FPDFAnnot_GetFormFieldType(formHandle, annotationPtr);
        const name = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
            return this.pdfiumModule.FPDFAnnot_GetFormFieldName(formHandle, annotationPtr, buffer, bufferLength);
        }, this.pdfiumModule.pdfium.UTF16ToString);
        const alternateName = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
            return this.pdfiumModule.FPDFAnnot_GetFormFieldAlternateName(formHandle, annotationPtr, buffer, bufferLength);
        }, this.pdfiumModule.pdfium.UTF16ToString);
        const value = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
            return this.pdfiumModule.FPDFAnnot_GetFormFieldValue(formHandle, annotationPtr, buffer, bufferLength);
        }, this.pdfiumModule.pdfium.UTF16ToString);
        const options = [];
        if (type === PDF_FORM_FIELD_TYPE.COMBOBOX || type === PDF_FORM_FIELD_TYPE.LISTBOX) {
            const count = this.pdfiumModule.FPDFAnnot_GetOptionCount(formHandle, annotationPtr);
            for (let i = 0; i < count; i++) {
                const label = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
                    return this.pdfiumModule.FPDFAnnot_GetOptionLabel(formHandle, annotationPtr, i, buffer, bufferLength);
                }, this.pdfiumModule.pdfium.UTF16ToString);
                const isSelected = this.pdfiumModule.FPDFAnnot_IsOptionSelected(formHandle, annotationPtr, i);
                options.push({
                    label,
                    isSelected,
                });
            }
        }
        let isChecked = false;
        if (type === PDF_FORM_FIELD_TYPE.CHECKBOX || type === PDF_FORM_FIELD_TYPE.RADIOBUTTON) {
            isChecked = this.pdfiumModule.FPDFAnnot_IsChecked(formHandle, annotationPtr);
        }
        return {
            flag,
            type,
            name,
            alternateName,
            value,
            isChecked,
            options,
        };
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderAnnotation}
     *
     * @public
     */
    renderAnnotation(doc, page, annotation, scaleFactor, rotation, dpr = 1, // device-pixel-ratio (canvas)
    mode = AppearanceMode.Normal, imageType = 'image/webp') {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'renderAnnotation', doc, page, annotation, scaleFactor, rotation, dpr, mode, imageType);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderAnnotation`, 'Begin', `${doc.id}-${page.index}-${annotation.id}`);
        const task = new Task();
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderAnnotation`, 'End', `${doc.id}-${page.index}-${annotation.id}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.DocNotOpen,
                message: 'document does not open',
            });
        }
        /* ── 1. grab native handles ───────────────────────────────────────── */
        const pageCtx = ctx.acquirePage(page.index);
        const annotPtr = this.pdfiumModule.FPDFPage_GetAnnot(pageCtx.pagePtr, annotation.id);
        if (!annotPtr) {
            pageCtx.release();
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderAnnotation`, 'End', `${doc.id}-${page.index}-${annotation.id}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.NotFound,
                message: 'annotation not found',
            });
        }
        const finalScale = scaleFactor * dpr;
        /* ── 2. decide bitmap size (integer pixels) ──────────────────────── */
        const annotRect = annotation.rect;
        const bitmapRect = toIntRect(transformRect(page.size, annotRect, rotation, finalScale));
        const format = BitmapFormat.Bitmap_BGRA;
        const bytesPerPixel = 4;
        const bitmapHeapLength = bitmapRect.size.width * bitmapRect.size.height * bytesPerPixel;
        const bitmapHeapPtr = this.malloc(bitmapHeapLength);
        const bitmapPtr = this.pdfiumModule.FPDFBitmap_CreateEx(bitmapRect.size.width, bitmapRect.size.height, format, bitmapHeapPtr, bitmapRect.size.width * bytesPerPixel);
        this.pdfiumModule.FPDFBitmap_FillRect(bitmapPtr, 0, 0, bitmapRect.size.width, bitmapRect.size.height, 0x00000000);
        const matrix = makeMatrix(annotation.rect, rotation, finalScale);
        // Allocate memory for the matrix on the wasm heap and write to it
        const matrixSize = 6 * 4;
        const matrixPtr = this.malloc(matrixSize);
        const matrixView = new Float32Array(this.pdfiumModule.pdfium.HEAPF32.buffer, matrixPtr, 6);
        matrixView.set([matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f]);
        /* ── 5. call the native helper with the new matrix ───────────────── */
        const FLAGS = RenderFlag.REVERSE_BYTE_ORDER;
        const ok = !!this.pdfiumModule.EPDF_RenderAnnotBitmap(bitmapPtr, pageCtx.pagePtr, annotPtr, mode, matrixPtr, FLAGS);
        /* ── 6. tear down native resources ───────────────────────────────── */
        this.free(matrixPtr); // Free the matrix memory
        this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
        this.pdfiumModule.FPDFPage_CloseAnnot(annotPtr);
        pageCtx.release();
        if (!ok) {
            this.free(bitmapHeapPtr);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderAnnotation`, 'End', `${doc.id}-${page.index}-${annotation.id}`);
            return PdfTaskHelper.reject({
                code: PdfErrorCode.Unknown,
                message: 'EPDF_RenderAnnotBitmap failed',
            });
        }
        /* ── 6. copy out + convert to Blob (reuse existing converter) ─────── */
        const data = this.pdfiumModule.pdfium.HEAPU8.subarray(bitmapHeapPtr, bitmapHeapPtr + bitmapHeapLength);
        const imageData = {
            data: new Uint8ClampedArray(data),
            width: bitmapRect.size.width,
            height: bitmapRect.size.height,
        };
        this.free(bitmapHeapPtr);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `RenderAnnotation`, 'End', `${doc.id}-${page.index}-${annotation.id}`);
        this.imageDataConverter(imageData, imageType)
            .then((blob) => task.resolve(blob))
            .catch((err) => task.reject({ code: PdfErrorCode.Unknown, message: String(err) }));
        return task;
    }
    /**
     * render rectangle of pdf page to image
     * @param docPtr - pointer to pdf document object
     * @param page  - pdf page infor
     * @param rect - rectangle info
     * @param scaleFactor  - factor of scalling
     * @param rotation  - rotation angle
     * @param options - render options
     * @returns image data
     *
     * @private
     */
    renderPageRectToImageData(ctx, page, rect, scaleFactor, rotation, dpr, options) {
        const format = BitmapFormat.Bitmap_BGRA;
        const bytesPerPixel = 4;
        // Round the transformed dimensions to whole pixels
        const rectSize = toIntRect(transformRect(page.size, rect, rotation, scaleFactor * dpr));
        const pageSize = toIntSize(transformSize(page.size, rotation, scaleFactor * dpr));
        const bitmapHeapLength = rectSize.size.width * rectSize.size.height * bytesPerPixel;
        const bitmapHeapPtr = this.malloc(bitmapHeapLength);
        const bitmapPtr = this.pdfiumModule.FPDFBitmap_CreateEx(rectSize.size.width, rectSize.size.height, format, bitmapHeapPtr, rectSize.size.width * bytesPerPixel);
        this.pdfiumModule.FPDFBitmap_FillRect(bitmapPtr, 0, 0, rectSize.size.width, rectSize.size.height, 0xffffffff);
        let flags = RenderFlag.REVERSE_BYTE_ORDER;
        if (options?.withAnnotations) {
            flags = flags | RenderFlag.ANNOT;
        }
        const pageCtx = ctx.acquirePage(page.index);
        this.pdfiumModule.FPDF_RenderPageBitmap(bitmapPtr, pageCtx.pagePtr, -rectSize.origin.x, -rectSize.origin.y, pageSize.width, pageSize.height, rotation, flags);
        this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
        pageCtx.release();
        const data = this.pdfiumModule.pdfium.HEAPU8.subarray(bitmapHeapPtr, bitmapHeapPtr + bitmapHeapLength);
        const imageData = {
            data: new Uint8ClampedArray(data),
            width: rectSize.size.width,
            height: rectSize.size.height,
        };
        this.free(bitmapHeapPtr);
        return imageData;
    }
    /**
     * Read the target of pdf link annotation
     * @param docPtr - pointer to pdf document object
     * @param getActionPtr - callback function to retrive the pointer of action
     * @param getDestinationPtr - callback function to retrive the pointer of destination
     * @returns target of link
     *
     * @private
     */
    readPdfLinkAnnoTarget(docPtr, getActionPtr, getDestinationPtr) {
        const destinationPtr = getDestinationPtr();
        if (destinationPtr) {
            const destination = this.readPdfDestination(docPtr, destinationPtr);
            return {
                type: 'destination',
                destination,
            };
        }
        else {
            const actionPtr = getActionPtr();
            if (actionPtr) {
                const action = this.readPdfAction(docPtr, actionPtr);
                return {
                    type: 'action',
                    action,
                };
            }
        }
    }
    /**
     * Read pdf action from pdf document
     * @param docPtr - pointer to pdf document object
     * @param actionPtr - pointer to pdf action object
     * @returns pdf action object
     *
     * @private
     */
    readPdfAction(docPtr, actionPtr) {
        const actionType = this.pdfiumModule.FPDFAction_GetType(actionPtr);
        let action;
        switch (actionType) {
            case PdfActionType.Unsupported:
                action = {
                    type: PdfActionType.Unsupported,
                };
                break;
            case PdfActionType.Goto:
                {
                    const destinationPtr = this.pdfiumModule.FPDFAction_GetDest(docPtr, actionPtr);
                    if (destinationPtr) {
                        const destination = this.readPdfDestination(docPtr, destinationPtr);
                        action = {
                            type: PdfActionType.Goto,
                            destination,
                        };
                    }
                    else {
                        action = {
                            type: PdfActionType.Unsupported,
                        };
                    }
                }
                break;
            case PdfActionType.RemoteGoto:
                {
                    // In case of remote goto action,
                    // the application should first use FPDFAction_GetFilePath
                    // to get file path, then load that particular document,
                    // and use its document handle to call this
                    action = {
                        type: PdfActionType.Unsupported,
                    };
                }
                break;
            case PdfActionType.URI:
                {
                    const uri = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
                        return this.pdfiumModule.FPDFAction_GetURIPath(docPtr, actionPtr, buffer, bufferLength);
                    }, this.pdfiumModule.pdfium.UTF8ToString);
                    action = {
                        type: PdfActionType.URI,
                        uri,
                    };
                }
                break;
            case PdfActionType.LaunchAppOrOpenFile:
                {
                    const path = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
                        return this.pdfiumModule.FPDFAction_GetFilePath(actionPtr, buffer, bufferLength);
                    }, this.pdfiumModule.pdfium.UTF8ToString);
                    action = {
                        type: PdfActionType.LaunchAppOrOpenFile,
                        path,
                    };
                }
                break;
        }
        return action;
    }
    /**
     * Read pdf destination object
     * @param docPtr - pointer to pdf document object
     * @param destinationPtr - pointer to pdf destination
     * @returns pdf destination object
     *
     * @private
     */
    readPdfDestination(docPtr, destinationPtr) {
        const pageIndex = this.pdfiumModule.FPDFDest_GetDestPageIndex(docPtr, destinationPtr);
        // Every params is a float value
        const maxParmamsCount = 4;
        const paramsCountPtr = this.malloc(maxParmamsCount);
        const paramsPtr = this.malloc(maxParmamsCount * 4);
        const zoomMode = this.pdfiumModule.FPDFDest_GetView(destinationPtr, paramsCountPtr, paramsPtr);
        const paramsCount = this.pdfiumModule.pdfium.getValue(paramsCountPtr, 'i32');
        const view = [];
        for (let i = 0; i < paramsCount; i++) {
            const paramPtr = paramsPtr + i * 4;
            view.push(this.pdfiumModule.pdfium.getValue(paramPtr, 'float'));
        }
        this.free(paramsCountPtr);
        this.free(paramsPtr);
        if (zoomMode === PdfZoomMode.XYZ) {
            const hasXPtr = this.malloc(1);
            const hasYPtr = this.malloc(1);
            const hasZPtr = this.malloc(1);
            const xPtr = this.malloc(4);
            const yPtr = this.malloc(4);
            const zPtr = this.malloc(4);
            const isSucceed = this.pdfiumModule.FPDFDest_GetLocationInPage(destinationPtr, hasXPtr, hasYPtr, hasZPtr, xPtr, yPtr, zPtr);
            if (isSucceed) {
                const hasX = this.pdfiumModule.pdfium.getValue(hasXPtr, 'i8');
                const hasY = this.pdfiumModule.pdfium.getValue(hasYPtr, 'i8');
                const hasZ = this.pdfiumModule.pdfium.getValue(hasZPtr, 'i8');
                const x = hasX ? this.pdfiumModule.pdfium.getValue(xPtr, 'float') : 0;
                const y = hasY ? this.pdfiumModule.pdfium.getValue(yPtr, 'float') : 0;
                const zoom = hasZ ? this.pdfiumModule.pdfium.getValue(zPtr, 'float') : 0;
                this.free(hasXPtr);
                this.free(hasYPtr);
                this.free(hasZPtr);
                this.free(xPtr);
                this.free(yPtr);
                this.free(zPtr);
                return {
                    pageIndex,
                    zoom: {
                        mode: zoomMode,
                        params: {
                            x,
                            y,
                            zoom,
                        },
                    },
                    view,
                };
            }
            this.free(hasXPtr);
            this.free(hasYPtr);
            this.free(hasZPtr);
            this.free(xPtr);
            this.free(yPtr);
            this.free(zPtr);
            return {
                pageIndex,
                zoom: {
                    mode: zoomMode,
                    params: {
                        x: 0,
                        y: 0,
                        zoom: 0,
                    },
                },
                view,
            };
        }
        return {
            pageIndex,
            zoom: {
                mode: zoomMode,
            },
            view,
        };
    }
    /**
     * Read attachmet from pdf document
     * @param docPtr - pointer to pdf document object
     * @param index - index of attachment
     * @returns attachment content
     *
     * @private
     */
    readPdfAttachment(docPtr, index) {
        const attachmentPtr = this.pdfiumModule.FPDFDoc_GetAttachment(docPtr, index);
        const name = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
            return this.pdfiumModule.FPDFAttachment_GetName(attachmentPtr, buffer, bufferLength);
        }, this.pdfiumModule.pdfium.UTF16ToString);
        const creationDate = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
            return this.pdfiumModule.FPDFAttachment_GetStringValue(attachmentPtr, 'CreationDate', buffer, bufferLength);
        }, this.pdfiumModule.pdfium.UTF16ToString);
        const checksum = readString(this.pdfiumModule.pdfium, (buffer, bufferLength) => {
            return this.pdfiumModule.FPDFAttachment_GetStringValue(attachmentPtr, 'Checksum', buffer, bufferLength);
        }, this.pdfiumModule.pdfium.UTF16ToString);
        return {
            index,
            name,
            creationDate,
            checksum,
        };
    }
    /**
     * Convert coordinate of point from device coordinate to page coordinate
     * @param page  - pdf page infor
     * @param position - position of point
     * @returns converted position
     *
     * @private
     */
    convertDevicePointToPagePoint(page, position) {
        const x = position.x;
        const y = page.size.height - position.y;
        return { x, y };
    }
    /**
     * Convert coordinate of point from page coordinate to device coordinate
     * @param page  - pdf page infor
     * @param position - position of point
     * @returns converted position
     *
     * @private
     */
    convertPagePointToDevicePoint(page, position) {
        const x = position.x;
        const y = page.size.height - position.y;
        return { x, y };
    }
    /**
     * Convert coordinate of rectangle from page coordinate to device coordinate
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param pageRect - rectangle that needs to be converted
     * @returns converted rectangle
     *
     * @private
     */
    convertPageRectToDeviceRect(page, pagePtr, pageRect) {
        const { x, y } = this.convertPagePointToDevicePoint(page, {
            x: pageRect.left,
            y: pageRect.top,
        });
        const rect = {
            origin: {
                x,
                y,
            },
            size: {
                width: Math.abs(pageRect.right - pageRect.left),
                height: Math.abs(pageRect.top - pageRect.bottom),
            },
        };
        return rect;
    }
    /**
     * Read the appearance stream of annotation
     * @param annotationPtr - pointer to pdf annotation
     * @param mode - appearance mode
     * @returns appearance stream
     *
     * @private
     */
    readPageAnnoAppearanceStreams(annotationPtr) {
        return {
            normal: this.readPageAnnoAppearanceStream(annotationPtr, AppearanceMode.Normal),
            rollover: this.readPageAnnoAppearanceStream(annotationPtr, AppearanceMode.Rollover),
            down: this.readPageAnnoAppearanceStream(annotationPtr, AppearanceMode.Down),
        };
    }
    /**
     * Read the appearance stream of annotation
     * @param annotationPtr - pointer to pdf annotation
     * @param mode - appearance mode
     * @returns appearance stream
     *
     * @private
     */
    readPageAnnoAppearanceStream(annotationPtr, mode = AppearanceMode.Normal) {
        const utf16Length = this.pdfiumModule.FPDFAnnot_GetAP(annotationPtr, mode, 0, 0);
        const bytesCount = (utf16Length + 1) * 2; // include NIL
        const bufferPtr = this.malloc(bytesCount);
        this.pdfiumModule.FPDFAnnot_GetAP(annotationPtr, mode, bufferPtr, bytesCount);
        const ap = this.pdfiumModule.pdfium.UTF16ToString(bufferPtr);
        this.free(bufferPtr);
        return ap;
    }
    /**
     * Change the visible colour (and opacity) of an existing annotation.
     *
     * For markup annotations (highlight / underline / strikeout / squiggly) we
     * first clear the AP dictionary entry, otherwise the stored appearance stream
     * will override the new tint.  For all other sub-types we keep the existing
     * AP so custom artwork isn't lost.
     *
     * @param doc         logical document object
     * @param page        logical page object
     * @param annotation  the annotation we want to recolour
     * @param colour      RGBA tuple (0-255 per channel)
     * @param which       0 = stroke/fill colour  (PDFium's "colourType" param)
     *
     * @returns `true` when the operation succeeded
     */
    updateAnnotationColor(doc, page, annotation, color, which = 0) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'setAnnotationColor', doc, page, annotation, color, which);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'setAnnotationColor', 'Begin', doc.id);
        const task = PdfTaskHelper.create();
        try {
            /* 1 ── sanity & native handles ────────────────────────────────────────── */
            const ctx = this.cache.getContext(doc.id);
            if (!ctx) {
                this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'setAnnotationColor', 'End', doc.id);
                this.logger.warn(LOG_SOURCE$2, LOG_CATEGORY$2, 'setAnnotationColor: doc closed');
                task.resolve(false);
                return task;
            }
            const pageCtx = ctx.acquirePage(page.index);
            const annotPtr = this.pdfiumModule.FPDFPage_GetAnnot(pageCtx.pagePtr, annotation.id);
            if (!annotPtr) {
                this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'setAnnotationColor', 'End', doc.id);
                this.logger.warn(LOG_SOURCE$2, LOG_CATEGORY$2, 'setAnnotationColor: annot not found');
                pageCtx.release();
                task.resolve(false);
                return task;
            }
            const ok = this.setAnnotationColor(annotPtr, color, which);
            /* 4 ── regenerate appearance & clean-up ───────────────────────────────── */
            if (ok) {
                this.pdfiumModule.FPDFPage_GenerateContent(pageCtx.pagePtr);
            }
            this.pdfiumModule.FPDFPage_CloseAnnot(annotPtr);
            pageCtx.release();
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'setAnnotationColor', 'End', doc.id);
            task.resolve(!!ok);
        }
        catch (error) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, 'setAnnotationColor', 'End', doc.id);
            this.logger.error(LOG_SOURCE$2, LOG_CATEGORY$2, 'setAnnotationColor: error', error);
            task.reject({
                code: PdfErrorCode.Unknown,
                message: `Failed to set annotation color: ${error instanceof Error ? error.message : String(error)}`,
            });
        }
        return task;
    }
    /**
     * Set the rect of specified annotation
     * @param page - page info that the annotation is belonged to
     * @param pagePtr - pointer of page object
     * @param annotationPtr - pointer to annotation object
     * @param rect - target rectangle
     * @returns whether the rect is setted
     *
     * @private
     */
    setPageAnnoRect(page, pagePtr, annotationPtr, rect) {
        const pageXPtr = this.malloc(8);
        const pageYPtr = this.malloc(8);
        if (!this.pdfiumModule.FPDF_DeviceToPage(pagePtr, 0, 0, page.size.width, page.size.height, 0, rect.origin.x, rect.origin.y, pageXPtr, pageYPtr)) {
            this.free(pageXPtr);
            this.free(pageYPtr);
            return false;
        }
        const pageX = this.pdfiumModule.pdfium.getValue(pageXPtr, 'double');
        const pageY = this.pdfiumModule.pdfium.getValue(pageYPtr, 'double');
        this.free(pageXPtr);
        this.free(pageYPtr);
        const pageRectPtr = this.malloc(4 * 4);
        this.pdfiumModule.pdfium.setValue(pageRectPtr, pageX, 'float');
        this.pdfiumModule.pdfium.setValue(pageRectPtr + 4, pageY, 'float');
        this.pdfiumModule.pdfium.setValue(pageRectPtr + 8, pageX + rect.size.width, 'float');
        this.pdfiumModule.pdfium.setValue(pageRectPtr + 12, pageY - rect.size.height, 'float');
        if (!this.pdfiumModule.FPDFAnnot_SetRect(annotationPtr, pageRectPtr)) {
            this.free(pageRectPtr);
            return false;
        }
        this.free(pageRectPtr);
        return true;
    }
    /**
     * Read the rectangle of annotation
     * @param annotationPtr - pointer to pdf annotation
     * @returns rectangle of annotation
     *
     * @private
     */
    readPageAnnoRect(annotationPtr) {
        const pageRectPtr = this.malloc(4 * 4);
        const pageRect = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        };
        if (this.pdfiumModule.FPDFAnnot_GetRect(annotationPtr, pageRectPtr)) {
            pageRect.left = this.pdfiumModule.pdfium.getValue(pageRectPtr, 'float');
            pageRect.top = this.pdfiumModule.pdfium.getValue(pageRectPtr + 4, 'float');
            pageRect.right = this.pdfiumModule.pdfium.getValue(pageRectPtr + 8, 'float');
            pageRect.bottom = this.pdfiumModule.pdfium.getValue(pageRectPtr + 12, 'float');
        }
        this.free(pageRectPtr);
        return pageRect;
    }
    /**
     * Get highlight rects for a specific character range (for search highlighting)
     * @param page - pdf page info
     * @param pagePtr - pointer to pdf page
     * @param textPagePtr - pointer to pdf text page
     * @param startIndex - starting character index
     * @param charCount - number of characters in the range
     * @returns array of rectangles for highlighting the specified character range
     *
     * @private
     */
    getHighlightRects(page, pagePtr, textPagePtr, startIndex, charCount) {
        const rectsCount = this.pdfiumModule.FPDFText_CountRects(textPagePtr, startIndex, charCount);
        const highlightRects = [];
        for (let i = 0; i < rectsCount; i++) {
            const topPtr = this.malloc(8);
            const leftPtr = this.malloc(8);
            const rightPtr = this.malloc(8);
            const bottomPtr = this.malloc(8);
            const isSucceed = this.pdfiumModule.FPDFText_GetRect(textPagePtr, i, leftPtr, topPtr, rightPtr, bottomPtr);
            if (!isSucceed) {
                this.free(leftPtr);
                this.free(topPtr);
                this.free(rightPtr);
                this.free(bottomPtr);
                continue;
            }
            const left = this.pdfiumModule.pdfium.getValue(leftPtr, 'double');
            const top = this.pdfiumModule.pdfium.getValue(topPtr, 'double');
            const right = this.pdfiumModule.pdfium.getValue(rightPtr, 'double');
            const bottom = this.pdfiumModule.pdfium.getValue(bottomPtr, 'double');
            this.free(leftPtr);
            this.free(topPtr);
            this.free(rightPtr);
            this.free(bottomPtr);
            const deviceXPtr = this.malloc(4);
            const deviceYPtr = this.malloc(4);
            this.pdfiumModule.FPDF_PageToDevice(pagePtr, 0, 0, page.size.width, page.size.height, 0, left, top, deviceXPtr, deviceYPtr);
            const x = this.pdfiumModule.pdfium.getValue(deviceXPtr, 'i32');
            const y = this.pdfiumModule.pdfium.getValue(deviceYPtr, 'i32');
            this.free(deviceXPtr);
            this.free(deviceYPtr);
            // Convert the bottom-right coordinates to width/height
            const width = Math.ceil(Math.abs(right - left));
            const height = Math.ceil(Math.abs(top - bottom));
            highlightRects.push({
                origin: { x, y },
                size: { width, height },
            });
        }
        return highlightRects;
    }
    /**
     * Search for a keyword across all pages in the document
     * Returns all search results throughout the entire document
     *
     * @param doc - Pdf document object
     * @param keyword - Search keyword
     * @param flags - Match flags for search
     * @returns Promise of all search results in the document
     *
     * @public
     */
    searchAllPages(doc, keyword, flags = []) {
        this.logger.debug(LOG_SOURCE$2, LOG_CATEGORY$2, 'searchAllPages', doc, keyword, flags);
        this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SearchAllPages`, 'Begin', doc.id);
        const ctx = this.cache.getContext(doc.id);
        if (!ctx) {
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SearchAllPages`, 'End', doc.id);
            return PdfTaskHelper.resolve({ results: [], total: 0 });
        }
        const length = 2 * (keyword.length + 1);
        const keywordPtr = this.malloc(length);
        this.pdfiumModule.pdfium.stringToUTF16(keyword, keywordPtr, length);
        const flag = flags.reduce((flag, currFlag) => {
            return flag | currFlag;
        }, MatchFlag.None);
        const results = [];
        // Search through all pages
        const searchAllPagesTask = PdfTaskHelper.create();
        // Execute search in a separate function to avoid issues with resolve parameter
        const executeSearch = async () => {
            for (let pageIndex = 0; pageIndex < doc.pageCount; pageIndex++) {
                // Get all results for the current page efficiently (load page only once)
                const pageResults = this.searchAllInPage(ctx, doc.pages[pageIndex], keywordPtr, flag);
                results.push(...pageResults);
            }
            this.free(keywordPtr);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SearchAllPages`, 'End', doc.id);
            searchAllPagesTask.resolve({
                results,
                total: results.length,
            });
        };
        // Start the search process
        executeSearch().catch((error) => {
            this.free(keywordPtr);
            this.logger.perf(LOG_SOURCE$2, LOG_CATEGORY$2, `SearchAllPages`, 'End', doc.id);
            searchAllPagesTask.reject({
                code: PdfErrorCode.Unknown,
                message: `Error searching document: ${error}`,
            });
        });
        return searchAllPagesTask;
    }
    /**
     * Extract word-aligned context for a search hit.
     *
     * @param fullText      full UTF-16 page text (fetch this once per page!)
     * @param start         index of 1st char that matched
     * @param count         number of chars in the match
     * @param windowChars   minimum context chars to keep left & right
     */
    buildContext(fullText, start, count, windowChars = 30) {
        const WORD_BREAK = /[\s\u00A0.,;:!?()\[\]{}<>/\\\-"'`"”\u2013\u2014]/;
        // Find the start of a word moving left
        const findWordStart = (index) => {
            while (index > 0 && !WORD_BREAK.test(fullText[index - 1]))
                index--;
            return index;
        };
        // Find the end of a word moving right
        const findWordEnd = (index) => {
            while (index < fullText.length && !WORD_BREAK.test(fullText[index]))
                index++;
            return index;
        };
        // Move left to build context
        let left = start;
        while (left > 0 && WORD_BREAK.test(fullText[left - 1]))
            left--; // Skip blanks
        let collected = 0;
        while (left > 0 && collected < windowChars) {
            left--;
            if (!WORD_BREAK.test(fullText[left]))
                collected++;
        }
        left = findWordStart(left);
        // Move right to build context
        let right = start + count;
        while (right < fullText.length && WORD_BREAK.test(fullText[right]))
            right++; // Skip blanks
        collected = 0;
        while (right < fullText.length && collected < windowChars) {
            if (!WORD_BREAK.test(fullText[right]))
                collected++;
            right++;
        }
        right = findWordEnd(right);
        // Compose the context
        const before = fullText.slice(left, start).replace(/\s+/g, ' ').trimStart();
        const match = fullText.slice(start, start + count);
        const after = fullText
            .slice(start + count, right)
            .replace(/\s+/g, ' ')
            .trimEnd();
        return {
            before: this.tidy(before),
            match: this.tidy(match),
            after: this.tidy(after),
            truncatedLeft: left > 0,
            truncatedRight: right < fullText.length,
        };
    }
    /**
     * Tidy the text to remove any non-printable characters and whitespace
     * @param s - text to tidy
     * @returns tidied text
     *
     * @private
     */
    tidy(s) {
        return (s
            /* 1️⃣  join words split by hyphen + U+FFFE + whitespace */
            .replace(/-\uFFFE\s*/g, '')
            /* 2️⃣  drop any remaining U+FFFE, soft-hyphen, zero-width chars */
            .replace(/[\uFFFE\u00AD\u200B\u2060\uFEFF]/g, '')
            /* 3️⃣  collapse whitespace so we stay on one line */
            .replace(/\s+/g, ' '));
    }
    /**
     * Search for all occurrences of a keyword on a single page
     * This method efficiently loads the page only once and finds all matches
     *
     * @param docPtr - pointer to pdf document
     * @param page - pdf page object
     * @param pageIndex - index of the page
     * @param keywordPtr - pointer to the search keyword
     * @param flag - search flags
     * @returns array of search results on this page
     *
     * @private
     */
    searchAllInPage(ctx, page, keywordPtr, flag) {
        const pageIndex = page.index;
        // Load the page and text page only once
        const pageCtx = ctx.acquirePage(pageIndex);
        const textPagePtr = pageCtx.getTextPage();
        // Load the full text of the page once
        const total = this.pdfiumModule.FPDFText_CountChars(textPagePtr);
        const bufPtr = this.malloc(2 * (total + 1));
        this.pdfiumModule.FPDFText_GetText(textPagePtr, 0, total, bufPtr);
        const fullText = this.pdfiumModule.pdfium.UTF16ToString(bufPtr);
        this.free(bufPtr);
        const pageResults = [];
        // Initialize search handle once for the page
        const searchHandle = this.pdfiumModule.FPDFText_FindStart(textPagePtr, keywordPtr, flag, 0);
        // Call FindNext repeatedly to get all matches on the page
        while (this.pdfiumModule.FPDFText_FindNext(searchHandle)) {
            const charIndex = this.pdfiumModule.FPDFText_GetSchResultIndex(searchHandle);
            const charCount = this.pdfiumModule.FPDFText_GetSchCount(searchHandle);
            const rects = this.getHighlightRects(page, pageCtx.pagePtr, textPagePtr, charIndex, charCount);
            const context = this.buildContext(fullText, charIndex, charCount);
            pageResults.push({
                pageIndex,
                charIndex,
                charCount,
                rects,
                context,
            });
        }
        // Close the search handle only once after finding all results
        this.pdfiumModule.FPDFText_FindClose(searchHandle);
        // Close the text page and page only once
        pageCtx.release();
        return pageResults;
    }
}

const LOG_SOURCE$1 = 'WebWorkerEngineRunner';
const LOG_CATEGORY$1 = 'Engine';
/**
 * Pdf engine runner, it will execute pdf engine based on the request it received and
 * send back the response with post message
 */
class EngineRunner {
    /**
     * Create instance of EngineRunnder
     * @param logger - logger instance
     */
    constructor(logger = new NoopLogger()) {
        this.logger = logger;
        /**
         * Execute the request
         * @param request - request that represent the pdf engine call
         * @returns
         *
         * @protected
         */
        this.execute = (request) => {
            this.logger.debug(LOG_SOURCE$1, LOG_CATEGORY$1, 'runner start exeucte request');
            if (!this.engine) {
                const error = {
                    type: 'reject',
                    reason: {
                        code: PdfErrorCode.NotReady,
                        message: 'engine has not started yet',
                    },
                };
                const response = {
                    id: request.id,
                    type: 'ExecuteResponse',
                    data: {
                        type: 'error',
                        value: error,
                    },
                };
                this.respond(response);
                return;
            }
            const engine = this.engine;
            const { name, args } = request.data;
            if (!engine[name]) {
                const error = {
                    type: 'reject',
                    reason: {
                        code: PdfErrorCode.NotSupport,
                        message: `engine method ${name} is not supported yet`,
                    },
                };
                const response = {
                    id: request.id,
                    type: 'ExecuteResponse',
                    data: {
                        type: 'error',
                        value: error,
                    },
                };
                this.respond(response);
                return;
            }
            let task;
            switch (name) {
                case 'isSupport':
                    task = this.engine[name](...args);
                    break;
                case 'initialize':
                    task = this.engine[name](...args);
                    break;
                case 'destroy':
                    task = this.engine[name](...args);
                    break;
                case 'openDocumentUrl':
                    task = this.engine[name](...args);
                    break;
                case 'openDocumentFromBuffer':
                    task = this.engine[name](...args);
                    break;
                case 'openDocumentFromLoader':
                    task = this.engine[name](...args);
                    break;
                case 'getDocPermissions':
                    task = this.engine[name](...args);
                    break;
                case 'getDocUserPermissions':
                    task = this.engine[name](...args);
                    break;
                case 'getMetadata':
                    task = this.engine[name](...args);
                    break;
                case 'getBookmarks':
                    task = this.engine[name](...args);
                    break;
                case 'getSignatures':
                    task = this.engine[name](...args);
                    break;
                case 'renderPage':
                    task = this.engine[name](...args);
                    break;
                case 'renderPageRect':
                    task = this.engine[name](...args);
                    break;
                case 'renderAnnotation':
                    task = this.engine[name](...args);
                    break;
                case 'renderThumbnail':
                    task = this.engine[name](...args);
                    break;
                case 'getAllAnnotations':
                    task = this.engine[name](...args);
                    break;
                case 'getPageAnnotations':
                    task = this.engine[name](...args);
                    break;
                case 'createPageAnnotation':
                    task = this.engine[name](...args);
                    break;
                case 'updatePageAnnotation':
                    task = this.engine[name](...args);
                    break;
                case 'removePageAnnotation':
                    task = this.engine[name](...args);
                    break;
                case 'updateAnnotationColor':
                    task = this.engine[name](...args);
                    break;
                case 'getPageTextRects':
                    task = this.engine[name](...args);
                    break;
                case 'searchAllPages':
                    task = this.engine[name](...args);
                    break;
                case 'closeDocument':
                    task = this.engine[name](...args);
                    break;
                case 'saveAsCopy':
                    task = this.engine[name](...args);
                    break;
                case 'getAttachments':
                    task = this.engine[name](...args);
                    break;
                case 'readAttachmentContent':
                    task = this.engine[name](...args);
                    break;
                case 'setFormFieldValue':
                    task = this.engine[name](...args);
                    break;
                case 'flattenPage':
                    task = this.engine[name](...args);
                    break;
                case 'extractPages':
                    task = this.engine[name](...args);
                    break;
                case 'extractText':
                    task = this.engine[name](...args);
                    break;
                case 'getTextSlices':
                    task = this.engine[name](...args);
                    break;
                case 'getPageGlyphs':
                    task = this.engine[name](...args);
                    break;
                case 'getPageGeometry':
                    task = this.engine[name](...args);
                    break;
                case 'merge':
                    task = this.engine[name](...args);
                    break;
                case 'mergePages':
                    task = this.engine[name](...args);
                    break;
            }
            task.wait((result) => {
                const response = {
                    id: request.id,
                    type: 'ExecuteResponse',
                    data: {
                        type: 'result',
                        value: result,
                    },
                };
                this.respond(response);
            }, (error) => {
                const response = {
                    id: request.id,
                    type: 'ExecuteResponse',
                    data: {
                        type: 'error',
                        value: error,
                    },
                };
                this.respond(response);
            });
        };
    }
    /**
     * Listening on post message
     */
    listen() {
        self.onmessage = (evt) => {
            return this.handle(evt);
        };
    }
    /**
     * Handle post message
     */
    handle(evt) {
        this.logger.debug(LOG_SOURCE$1, LOG_CATEGORY$1, 'webworker receive message event: ', evt.data);
        try {
            const request = evt.data;
            switch (request.type) {
                case 'ExecuteRequest':
                    this.execute(request);
                    break;
            }
        }
        catch (e) {
            this.logger.info(LOG_SOURCE$1, LOG_CATEGORY$1, 'webworker met error when processing message event:', e);
        }
    }
    /**
     * Send the ready response when pdf engine is ready
     * @returns
     *
     * @protected
     */
    ready() {
        this.listen();
        this.respond({
            id: '0',
            type: 'ReadyResponse',
        });
        this.logger.debug(LOG_SOURCE$1, LOG_CATEGORY$1, 'runner is ready');
    }
    /**
     * Send back the response
     * @param response - response that needs sent back
     *
     * @protected
     */
    respond(response) {
        this.logger.debug(LOG_SOURCE$1, LOG_CATEGORY$1, 'runner respond: ', response);
        self.postMessage(response);
    }
}

/**
 * EngineRunner for pdfium-based wasm engine
 */
class PdfiumEngineRunner extends EngineRunner {
    /**
     * Create an instance of PdfiumEngineRunner
     * @param wasmBinary - wasm binary that contains the pdfium wasm file
     */
    constructor(wasmBinary) {
        super();
        this.wasmBinary = wasmBinary;
    }
    /**
     * Initialize runner
     */
    async prepare() {
        const wasmBinary = this.wasmBinary;
        const wasmModule = await init({ wasmBinary });
        this.engine = new PdfiumEngine(wasmModule);
        this.ready();
    }
}

const LOG_SOURCE = 'WebWorkerEngine';
const LOG_CATEGORY = 'Engine';
/**
 * Task that executed by webworker
 */
class WorkerTask extends Task {
    /**
     * Create a task that bind to web worker with specified message id
     * @param worker - web worker instance
     * @param messageId - id of message
     *
     * @public
     */
    constructor(worker, messageId) {
        super();
        this.worker = worker;
        this.messageId = messageId;
    }
    /**
     * {@inheritDoc @embedpdf/models!Task.abort}
     *
     * @override
     */
    abort(e) {
        super.abort(e);
        this.worker.postMessage({
            type: 'AbortRequest',
            data: {
                messageId: this.messageId,
            },
        });
    }
}
/**
 * PDF engine that runs within webworker
 */
class WebWorkerEngine {
    /**
     * Create an instance of WebWorkerEngine, it will create a worker with
     * specified url.
     * @param worker - webworker instance, this worker needs to contains the running instance of {@link EngineRunner}
     * @param logger - logger instance
     *
     * @public
     */
    constructor(worker, logger = new NoopLogger()) {
        this.worker = worker;
        this.logger = logger;
        /**
         * All the tasks that is executing
         */
        this.tasks = new Map();
        /**
         * Handle event from web worker. There are 2 kinds of event
         * 1. ReadyResponse: web worker is ready
         * 2. ExecuteResponse: result of execution
         * @param evt - message event from web worker
         * @returns
         *
         * @private
         */
        this.handle = (evt) => {
            this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'webworker engine start handling message: ', evt.data);
            try {
                const response = evt.data;
                const task = this.tasks.get(response.id);
                if (!task) {
                    return;
                }
                switch (response.type) {
                    case 'ReadyResponse':
                        this.readyTask.resolve(true);
                        break;
                    case 'ExecuteResponse':
                        {
                            switch (response.data.type) {
                                case 'result':
                                    task.resolve(response.data.value);
                                    break;
                                case 'error':
                                    task.reject(response.data.value.reason);
                                    break;
                            }
                            this.tasks.delete(response.id);
                        }
                        break;
                }
            }
            catch (e) {
                this.logger.error(LOG_SOURCE, LOG_CATEGORY, 'webworker met error when handling message: ', e);
            }
        };
        this.worker.addEventListener('message', this.handle);
        this.readyTask = new WorkerTask(this.worker, WebWorkerEngine.readyTaskId);
        this.tasks.set(WebWorkerEngine.readyTaskId, this.readyTask);
    }
    /**
     * Generate a unique message id
     * @returns message id
     *
     * @private
     */
    generateRequestId(id) {
        return `${id}.${Date.now()}.${Math.random()}`;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.initialize}
     *
     * @public
     */
    initialize() {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'initialize');
        const requestId = this.generateRequestId('General');
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'initialize',
                args: [],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.destroy}
     *
     * @public
     */
    destroy() {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'destroy');
        const requestId = this.generateRequestId('General');
        const task = new WorkerTask(this.worker, requestId);
        const finish = () => {
            this.worker.removeEventListener('message', this.handle);
            this.worker.terminate();
        };
        task.wait(finish, finish);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'destroy',
                args: [],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocumentUrl}
     *
     * @public
     */
    openDocumentUrl(file, options) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'openDocumentUrl', file.url, options);
        const requestId = this.generateRequestId(file.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'openDocumentUrl',
                args: [file, options],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocument}
     *
     * @public
     */
    openDocumentFromBuffer(file, password) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'openDocumentFromBuffer', file, password);
        const requestId = this.generateRequestId(file.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'openDocumentFromBuffer',
                args: [file, password],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocumentFromLoader}
     *
     * @public
     */
    openDocumentFromLoader(file, password) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'openDocumentFromLoader', file, password);
        const requestId = this.generateRequestId(file.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'openDocumentFromLoader',
                args: [file, password],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getMetadata}
     *
     * @public
     */
    getMetadata(doc) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getMetadata', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getMetadata',
                args: [doc],
            },
        };
        this.proxy(task, request);
        return task;
    }
    updateAnnotationColor(doc, page, annotation, color, which = 0) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'setAnnotationColor', doc, page, annotation, color);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'updateAnnotationColor',
                args: [doc, page, annotation, color, which],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getDocPermissions}
     *
     * @public
     */
    getDocPermissions(doc) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getDocPermissions', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getDocPermissions',
                args: [doc],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getDocUserPermissions}
     *
     * @public
     */
    getDocUserPermissions(doc) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getDocUserPermissions', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getDocUserPermissions',
                args: [doc],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getBookmarks}
     *
     * @public
     */
    getBookmarks(doc) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getBookmarks', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getBookmarks',
                args: [doc],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getSignatures}
     *
     * @public
     */
    getSignatures(doc) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getSignatures', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getSignatures',
                args: [doc],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderPage}
     *
     * @public
     */
    renderPage(doc, page, scaleFactor, rotation, dpr, options, imageType = 'image/webp') {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'renderPage', doc, page, scaleFactor, rotation, dpr, options);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'renderPage',
                args: [doc, page, scaleFactor, rotation, dpr, options, imageType],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderPageRect}
     *
     * @public
     */
    renderPageRect(doc, page, scaleFactor, rotation, dpr, rect, options, imageType = 'image/webp') {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'renderPageRect', doc, page, scaleFactor, rotation, dpr, rect, options);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'renderPageRect',
                args: [doc, page, scaleFactor, rotation, dpr, rect, options, imageType],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderAnnotation}
     *
     * @public
     */
    renderAnnotation(doc, page, annotation, scaleFactor, rotation, dpr, mode, imageType) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'renderAnnotation', doc, page, annotation, scaleFactor, rotation, dpr, mode, imageType);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'renderAnnotation',
                args: [doc, page, annotation, scaleFactor, rotation, dpr, mode, imageType],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getAllAnnotations}
     *
     * @public
     */
    getAllAnnotations(doc) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getAllAnnotations', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getAllAnnotations',
                args: [doc],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageAnnotations}
     *
     * @public
     */
    getPageAnnotations(doc, page) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getPageAnnotations', doc, page);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getPageAnnotations',
                args: [doc, page],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.createPageAnnotation}
     *
     * @public
     */
    createPageAnnotation(doc, page, annotation) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'createPageAnnotations', doc, page, annotation);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'createPageAnnotation',
                args: [doc, page, annotation],
            },
        };
        this.proxy(task, request);
        return task;
    }
    updatePageAnnotation(doc, page, annotation) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'updatePageAnnotation', doc, page, annotation);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'updatePageAnnotation',
                args: [doc, page, annotation],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.removePageAnnotation}
     *
     * @public
     */
    removePageAnnotation(doc, page, annotation) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'removePageAnnotations', doc, page, annotation);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'removePageAnnotation',
                args: [doc, page, annotation],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageTextRects}
     *
     * @public
     */
    getPageTextRects(doc, page, scaleFactor, rotation) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getPageTextRects', doc, page, scaleFactor, rotation);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getPageTextRects',
                args: [doc, page, scaleFactor, rotation],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderThumbnail}
     *
     * @public
     */
    renderThumbnail(doc, page, scaleFactor, rotation, dpr) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'renderThumbnail', doc, page, scaleFactor, rotation, dpr);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'renderThumbnail',
                args: [doc, page, scaleFactor, rotation, dpr],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.searchAllPages}
     *
     * @public
     */
    searchAllPages(doc, keyword, flags = []) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'searchAllPages 123', doc, keyword, flags);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'searchAllPages',
                args: [doc, keyword, flags],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.saveAsCopy}
     *
     * @public
     */
    saveAsCopy(doc) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'saveAsCopy', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'saveAsCopy',
                args: [doc],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getAttachments}
     *
     * @public
     */
    getAttachments(doc) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getAttachments', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getAttachments',
                args: [doc],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.readAttachmentContent}
     *
     * @public
     */
    readAttachmentContent(doc, attachment) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'readAttachmentContent', doc, attachment);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'readAttachmentContent',
                args: [doc, attachment],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.setFormFieldValue}
     *
     * @public
     */
    setFormFieldValue(doc, page, annotation, value) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'setFormFieldValue', doc, annotation, value);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'setFormFieldValue',
                args: [doc, page, annotation, value],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.flattenPage}
     *
     * @public
     */
    flattenPage(doc, page, flag) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'flattenPage', doc, page, flag);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'flattenPage',
                args: [doc, page, flag],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.extractPages}
     *
     * @public
     */
    extractPages(doc, pageIndexes) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'extractPages', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'extractPages',
                args: [doc, pageIndexes],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.extractText}
     *
     * @public
     */
    extractText(doc, pageIndexes) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'extractText', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'extractText',
                args: [doc, pageIndexes],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getTextSlices}
     *
     * @public
     */
    getTextSlices(doc, slices) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getTextSlices', doc, slices);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getTextSlices',
                args: [doc, slices],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageGlyphs}
     *
     * @public
     */
    getPageGlyphs(doc, page) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getPageGlyphs', doc, page);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getPageGlyphs',
                args: [doc, page],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageGeometry}
     *
     * @public
     */
    getPageGeometry(doc, page) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getPageGeometry', doc, page);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'getPageGeometry',
                args: [doc, page],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.merge}
     *
     * @public
     */
    merge(files) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'merge', files);
        const fileIds = files.map((file) => file.id).join('.');
        const requestId = this.generateRequestId(fileIds);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'merge',
                args: [files],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.mergePages}
     *
     * @public
     */
    mergePages(mergeConfigs) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'mergePages', mergeConfigs);
        const requestId = this.generateRequestId(mergeConfigs.map((config) => config.docId).join('.'));
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'mergePages',
                args: [mergeConfigs],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.closeDocument}
     *
     * @public
     */
    closeDocument(doc) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'closeDocument', doc);
        const requestId = this.generateRequestId(doc.id);
        const task = new WorkerTask(this.worker, requestId);
        const request = {
            id: requestId,
            type: 'ExecuteRequest',
            data: {
                name: 'closeDocument',
                args: [doc],
            },
        };
        this.proxy(task, request);
        return task;
    }
    /**
     * Send the request to webworker inside and register the task
     * @param task - task that waiting for the response
     * @param request - request that needs send to web worker
     * @param transferables - transferables that need to transfer to webworker
     * @returns
     *
     * @internal
     */
    proxy(task, request, transferables = []) {
        this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'send request to worker', task, request, transferables);
        this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `${request.data.name}`, 'Begin', request.id);
        this.readyTask.wait(() => {
            this.worker.postMessage(request, transferables);
            task.wait(() => {
                this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `${request.data.name}`, 'End', request.id);
            }, () => {
                this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `${request.data.name}`, 'End', request.id);
            });
            this.tasks.set(request.id, task);
        }, () => {
            this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `${request.data.name}`, 'End', request.id);
            task.reject({
                code: PdfErrorCode.Initialization,
                message: 'worker initialization failed',
            });
        });
    }
}
WebWorkerEngine.readyTaskId = '0';

/**
 * Create mock of pdf engine
 * @param partialEngine - partial configuration of engine
 * @returns - mock of pdf engine
 *
 * @public
 */
function createMockPdfEngine(partialEngine) {
    const engine = {
        openDocumentUrl: jest.fn((file, options) => {
            return PdfTaskHelper.create();
        }),
        openDocumentFromBuffer: jest.fn((file, password) => {
            return PdfTaskHelper.create();
        }),
        openDocumentFromLoader: jest.fn((file, password) => {
            return PdfTaskHelper.create();
        }),
        getMetadata: () => {
            return PdfTaskHelper.resolve({
                title: 'title',
                author: 'author',
                subject: 'subject',
                keywords: 'keywords',
                producer: 'producer',
                creator: 'creator',
                creationDate: 'creationDate',
                modificationDate: 'modificationDate',
            });
        },
        getDocPermissions: (doc) => {
            return PdfTaskHelper.resolve(0xffffffff);
        },
        getDocUserPermissions: (doc) => {
            return PdfTaskHelper.resolve(0xffffffff);
        },
        getSignatures: (doc) => {
            const signatures = [];
            return PdfTaskHelper.resolve(signatures);
        },
        updateAnnotationColor: (doc, page, annotation, color, which = 0) => {
            return PdfTaskHelper.resolve(true);
        },
        getBookmarks: (doc) => {
            const bookmarks = [];
            bookmarks.push({
                title: 'Page 1',
                target: {
                    type: 'destination',
                    destination: {
                        pageIndex: 1,
                        zoom: {
                            mode: PdfZoomMode.FitPage,
                        },
                        view: [],
                    },
                },
            }, {
                title: 'Page 2',
                target: {
                    type: 'destination',
                    destination: {
                        pageIndex: 2,
                        zoom: {
                            mode: PdfZoomMode.FitPage,
                        },
                        view: [],
                    },
                },
                children: [
                    {
                        title: 'Page 3',
                        target: {
                            type: 'destination',
                            destination: {
                                pageIndex: 3,
                                zoom: {
                                    mode: PdfZoomMode.FitPage,
                                },
                                view: [],
                            },
                        },
                    },
                ],
            });
            return PdfTaskHelper.resolve({
                bookmarks,
            });
        },
        renderPage: jest.fn((doc, page, scaleFactor, rotation, dpr, options) => {
            const pageSize = rotation % 2 === 0 ? page.size : swap(page.size);
            const imageSize = {
                width: Math.ceil(pageSize.width * scaleFactor),
                height: Math.ceil(pageSize.height * scaleFactor),
            };
            const pixelCount = imageSize.width * imageSize.height;
            const array = new Uint8ClampedArray(pixelCount * 4);
            const rgbValue = page.index % 255;
            const alphaValue = 255;
            for (let i = 0; i < pixelCount; i++) {
                for (let j = 0; j < 3; j++) {
                    const index = i * 4 + j;
                    array[index] = rgbValue;
                }
                array[i * 4 + 3] = alphaValue;
            }
            const ab = array.buffer;
            const realBuffer = ab instanceof ArrayBuffer ? ab : new Uint8Array(array).buffer;
            const blob = new Blob([realBuffer], { type: 'application/octet-stream' });
            return PdfTaskHelper.resolve(blob);
        }),
        renderPageRect: jest.fn((doc, page, scaleFactor, rotation, dpr, rect, options) => {
            const pageSize = rotation % 2 === 0 ? page.size : swap(page.size);
            const imageSize = {
                width: Math.ceil(pageSize.width * scaleFactor),
                height: Math.ceil(pageSize.height * scaleFactor),
            };
            const pixelCount = imageSize.width * imageSize.height;
            const array = new Uint8ClampedArray(pixelCount * 4);
            const rgbValue = page.index % 255;
            const alphaValue = 255;
            for (let i = 0; i < pixelCount; i++) {
                for (let j = 0; j < 3; j++) {
                    const index = i * 4 + j;
                    array[index] = rgbValue;
                }
                array[i * 4 + 3] = alphaValue;
            }
            const ab = array.buffer;
            const realBuffer = ab instanceof ArrayBuffer ? ab : new Uint8Array(array).buffer;
            const blob = new Blob([realBuffer], { type: 'application/octet-stream' });
            return PdfTaskHelper.resolve(blob);
        }),
        renderThumbnail: jest.fn((doc, page) => {
            const thumbnailWidth = page.size.width / 4;
            const thumbnailHeight = page.size.height / 4;
            const pixelCount = thumbnailWidth * thumbnailHeight;
            const array = new Uint8ClampedArray(pixelCount * 4);
            const rgbValue = page.index % 255;
            const alphaValue = 255;
            for (let i = 0; i < pixelCount; i++) {
                for (let j = 0; j < 3; j++) {
                    const index = i * 4 + j;
                    array[index] = rgbValue;
                }
                array[i * 4 + 3] = alphaValue;
            }
            const ab = array.buffer;
            const realBuffer = ab instanceof ArrayBuffer ? ab : new Uint8Array(array).buffer;
            const blob = new Blob([realBuffer], { type: 'image/png' });
            return PdfTaskHelper.resolve(blob);
        }),
        renderAnnotation: jest.fn((doc, page, annotation, scaleFactor, rotation, dpr, mode, imageType) => {
            return PdfTaskHelper.resolve(new Blob([], { type: 'image/png' }));
        }),
        getAllAnnotations: jest.fn((doc) => {
            return PdfTaskHelper.resolve({});
        }),
        getPageAnnotations: jest.fn((doc, page) => {
            const link = {
                pageIndex: page.index,
                id: page.index + 1,
                type: PdfAnnotationSubtype.LINK,
                target: {
                    type: 'action',
                    action: {
                        type: PdfActionType.URI,
                        uri: 'https://localhost',
                    },
                },
                text: 'localhost',
                rect: {
                    origin: {
                        x: 0,
                        y: 0,
                    },
                    size: {
                        width: 100,
                        height: 100,
                    },
                },
            };
            const annotations = [];
            annotations.push(link);
            return PdfTaskHelper.resolve(annotations);
        }),
        createPageAnnotation: jest.fn(() => {
            return PdfTaskHelper.resolve(1);
        }),
        updatePageAnnotation: jest.fn(() => {
            return PdfTaskHelper.resolve(true);
        }),
        removePageAnnotation: jest.fn(() => {
            return PdfTaskHelper.resolve(true);
        }),
        getPageTextRects: jest.fn((doc, page, scaleFactor, rotation) => {
            const textRects = [
                {
                    content: 'pdf text',
                    font: {
                        family: 'sans-serif',
                        size: 12,
                    },
                    rect: {
                        origin: {
                            x: 0,
                            y: 0,
                        },
                        size: {
                            width: 100,
                            height: 100,
                        },
                    },
                },
            ];
            return PdfTaskHelper.resolve(textRects);
        }),
        closeDocument: (pdf) => {
            return PdfTaskHelper.resolve(true);
        },
        saveAsCopy: (pdf) => {
            return PdfTaskHelper.resolve(new ArrayBuffer(0));
        },
        flattenPage: (pdf, page, flag) => {
            return PdfTaskHelper.resolve(PdfPageFlattenResult.Success);
        },
        extractPages: (pdf, pageIndexes) => {
            return PdfTaskHelper.resolve(new ArrayBuffer(0));
        },
        extractText: (pdf, pageIndexes) => {
            return PdfTaskHelper.resolve('');
        },
        getTextSlices: (doc, slices) => {
            return PdfTaskHelper.resolve([]);
        },
        getPageGlyphs: (doc, page) => {
            return PdfTaskHelper.resolve([]);
        },
        getPageGeometry: (doc, page) => {
            return PdfTaskHelper.resolve({
                runs: [],
            });
        },
        merge: (files) => {
            return PdfTaskHelper.resolve({
                id: 'id',
                content: new ArrayBuffer(0),
            });
        },
        mergePages: (mergeConfigs) => {
            return PdfTaskHelper.resolve({
                id: 'id',
                content: new ArrayBuffer(0),
            });
        },
        searchAllPages: (doc, keyword, flags) => {
            // Create a mock search result
            const mockResult = {
                pageIndex: 0,
                charIndex: 0,
                charCount: keyword.length,
                rects: [
                    {
                        origin: {
                            x: 0,
                            y: 0,
                        },
                        size: {
                            width: 50,
                            height: 20,
                        },
                    },
                ],
                context: {
                    before: '',
                    match: '',
                    after: '',
                    truncatedLeft: false,
                    truncatedRight: false,
                },
            };
            // Return a mock SearchAllPagesResult with a single result
            return PdfTaskHelper.resolve({
                results: [mockResult],
                total: 1,
            });
        },
        getAttachments: (doc) => {
            return PdfTaskHelper.resolve([]);
        },
        readAttachmentContent: (doc, attachment) => {
            return PdfTaskHelper.resolve(new ArrayBuffer(0));
        },
        setFormFieldValue: (doc, page, annotation, text) => {
            return PdfTaskHelper.resolve(true);
        },
        ...partialEngine,
    };
    return engine;
}
/**
 * Create mock of pdf document
 * @param doc - partial configuration of document
 * @returns mock of pdf document
 *
 * @public
 */
function createMockPdfDocument(doc) {
    const pageCount = 10;
    const pageWidth = 100;
    const pageHeight = 200;
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push({
            index: i,
            size: {
                width: pageWidth,
                height: pageHeight,
            },
        });
    }
    return {
        id: 'id',
        pageCount: pageCount,
        pages: pages,
        ...doc,
    };
}
/**
 * Create mock of pdf file
 * @param file - partial configuration of file
 * @returns mock of pdf file
 *
 * @public
 */
function createMockPdfFile(file) {
    return {
        id: 'id',
        content: new ArrayBuffer(0),
    };
}

export { BitmapFormat, EngineRunner, PdfiumEngine, PdfiumEngineRunner, PdfiumErrorCode, RenderFlag, WebWorkerEngine, WorkerTask, browserImageDataToBlobConverter, createMockPdfDocument, createMockPdfEngine, createMockPdfFile, readArrayBuffer, readString };
//# sourceMappingURL=index.js.map
