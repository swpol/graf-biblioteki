import { SearchTarget, PdfImage, ImageConversionTypes, PdfEngine, Logger, Task, PdfErrorReason, PdfFileUrl, PdfUrlOptions, PdfDocumentObject, PdfFile, PdfFileLoader, PdfSignatureObject, PdfBookmarkObject, PdfPageObject, Rotation, PdfRenderOptions, PdfTask, Rect, PdfAnnotationObject, PdfTextRectObject, PdfAttachmentObject, PdfWidgetAnnoObject, FormFieldValue, PdfPageFlattenFlag, PdfPageFlattenResult, PageTextSlice, PdfInkAnnoObject, PdfHighlightAnnoObject, PdfUnderlineAnnoObject, PdfStrikeOutAnnoObject, PdfSquigglyAnnoObject, PdfStampAnnoObjectContents, Position, PdfPageGeometry, PdfGlyphObject, AppearanceMode, PdfAnnotationObjectBase, WebAlphaColor, MatchFlag, SearchAllPagesResult, PdfEngineMethodName, PdfEngineMethodArgs, TaskReturn, PdfEngineMethodReturnType } from '@embedpdf/models';
import { WrappedPdfiumModule, PdfiumRuntimeMethods, PdfiumModule } from '@embedpdf/pdfium';

/**
 * Format of bitmap
 */
declare enum BitmapFormat {
    Bitmap_Gray = 1,
    Bitmap_BGR = 2,
    Bitmap_BGRx = 3,
    Bitmap_BGRA = 4
}
/**
 * Pdf rendering flag
 */
declare enum RenderFlag {
    ANNOT = 1,// Set if annotations are to be rendered.
    LCD_TEXT = 2,// Set if using text rendering optimized for LCD display.
    NO_NATIVETEXT = 4,// Don't use the native text output available on some platforms
    GRAYSCALE = 8,// Grayscale output.
    DEBUG_INFO = 128,// Set if you want to get some debug info. Please discuss with Foxit first if you need to collect debug info.
    NO_CATCH = 256,// Set if you don't want to catch exception.
    RENDER_LIMITEDIMAGECACHE = 512,// Limit image cache size.
    RENDER_FORCEHALFTONE = 1024,// Always use halftone for image stretching.
    PRINTING = 2048,// Render for printing.
    REVERSE_BYTE_ORDER = 16
}
/**
 * Context used for searching
 */
interface SearchContext {
    /**
     * search target
     */
    target: SearchTarget;
    /**
     * current page index
     */
    currPageIndex: number;
    /**
     * index of text in the current pdf page,  -1 means reach the end
     */
    startIndex: number;
}
/**
 * Error code of pdfium library
 */
declare enum PdfiumErrorCode {
    Success = 0,
    Unknown = 1,
    File = 2,
    Format = 3,
    Password = 4,
    Security = 5,
    Page = 6,
    XFALoad = 7,
    XFALayout = 8
}
/**
 * Function type for converting ImageData to Blob
 * In browser: uses OffscreenCanvas
 * In Node.js: can use Sharp or other image processing libraries
 */
type ImageDataConverter<T = Blob> = (imageData: PdfImage, imageType?: ImageConversionTypes) => Promise<T>;
declare const browserImageDataToBlobConverter: ImageDataConverter<Blob>;
/**
 * Pdf engine that based on pdfium wasm
 */
declare class PdfiumEngine<T = Blob> implements PdfEngine<T> {
    private pdfiumModule;
    private logger;
    private imageDataConverter;
    /**
     * pdf documents that opened
     */
    private readonly cache;
    /**
     * Create an instance of PdfiumEngine
     * @param wasmModule - pdfium wasm module
     * @param logger - logger instance
     * @param imageDataToBlobConverter - function to convert ImageData to Blob
     */
    constructor(pdfiumModule: WrappedPdfiumModule, logger?: Logger, imageDataConverter?: ImageDataConverter<T>);
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.initialize}
     *
     * @public
     */
    initialize(): Task<boolean, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.destroy}
     *
     * @public
     */
    destroy(): Task<boolean, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocumentUrl}
     *
     * @public
     */
    openDocumentUrl(file: PdfFileUrl, options?: PdfUrlOptions): Task<PdfDocumentObject, PdfErrorReason>;
    /**
     * Check if the server supports range requests:
     * Sends a HEAD request and sees if 'Accept-Ranges: bytes'.
     */
    private checkRangeSupport;
    /**
     * Fully fetch the file (using fetch) into an ArrayBuffer,
     * then call openDocumentFromBuffer.
     */
    private fetchFullAndOpen;
    /**
     * Use your synchronous partial-loading approach:
     * - In your snippet, it's done via `openDocumentFromLoader`.
     * - We'll do a synchronous XHR read callback that pulls
     *   the desired byte ranges.
     */
    private openDocumentWithRangeRequest;
    /**
     * Helper to do a HEAD request or partial GET to find file length.
     */
    private retrieveFileLength;
    /**
     * Convert response text (x-user-defined) to a Uint8Array
     * for partial data.
     */
    private convertResponseToUint8Array;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocument}
     *
     * @public
     */
    openDocumentFromBuffer(file: PdfFile, password?: string): Task<PdfDocumentObject, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocumentFromLoader}
     *
     * @public
     */
    openDocumentFromLoader(fileLoader: PdfFileLoader, password?: string): Task<PdfDocumentObject, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getMetadata}
     *
     * @public
     */
    getMetadata(doc: PdfDocumentObject): Task<any, PdfErrorReason> | Task<{
        title: string;
        author: string;
        subject: string;
        keywords: string;
        producer: string;
        creator: string;
        creationDate: string;
        modificationDate: string;
    }, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getDocPermissions}
     *
     * @public
     */
    getDocPermissions(doc: PdfDocumentObject): Task<any, PdfErrorReason> | Task<number, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getDocUserPermissions}
     *
     * @public
     */
    getDocUserPermissions(doc: PdfDocumentObject): Task<any, PdfErrorReason> | Task<number, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getSignatures}
     *
     * @public
     */
    getSignatures(doc: PdfDocumentObject): Task<any, PdfErrorReason> | Task<PdfSignatureObject[], PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getBookmarks}
     *
     * @public
     */
    getBookmarks(doc: PdfDocumentObject): Task<any, PdfErrorReason> | Task<{
        bookmarks: PdfBookmarkObject[];
    }, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderPage}
     *
     * @public
     */
    renderPage(doc: PdfDocumentObject, page: PdfPageObject, scaleFactor?: number, rotation?: Rotation, dpr?: number, options?: PdfRenderOptions, imageType?: ImageConversionTypes): PdfTask<T>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderPageRect}
     *
     * @public
     */
    renderPageRect(doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation, dpr: number, rect: Rect, options: PdfRenderOptions, imageType?: ImageConversionTypes): PdfTask<T>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getAllAnnotations}
     *
     * @public
     */
    getAllAnnotations(doc: PdfDocumentObject): Task<any, PdfErrorReason> | Task<Record<number, PdfAnnotationObject[]>, PdfErrorReason>;
    private readAllAnnotations;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageAnnotations}
     *
     * @public
     */
    getPageAnnotations(doc: PdfDocumentObject, page: PdfPageObject): Task<any, PdfErrorReason> | Task<PdfAnnotationObject[], PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.createPageAnnotation}
     *
     * @public
     */
    createPageAnnotation(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject): PdfTask<number>;
    /**
     * Update an existing page annotation in-place
     *
     *  • Locates the annot by page-local index (`annotation.id`)
     *  • Re-writes its /Rect and type-specific payload
     *  • Calls FPDFPage_GenerateContent so the new appearance is rendered
     *
     * @returns PdfTask<boolean>  –  true on success
     */
    updatePageAnnotation(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject): PdfTask<boolean>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.removePageAnnotation}
     *
     * @public
     */
    removePageAnnotation(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject): Task<boolean, PdfErrorReason> | Task<any, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageTextRects}
     *
     * @public
     */
    getPageTextRects(doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation): Task<any, PdfErrorReason> | Task<PdfTextRectObject[], PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderThumbnail}
     *
     * @public
     */
    renderThumbnail(doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation, dpr: number): PdfTask<T>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getAttachments}
     *
     * @public
     */
    getAttachments(doc: PdfDocumentObject): Task<any, PdfErrorReason> | Task<PdfAttachmentObject[], PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.readAttachmentContent}
     *
     * @public
     */
    readAttachmentContent(doc: PdfDocumentObject, attachment: PdfAttachmentObject): Task<any, PdfErrorReason> | Task<ArrayBuffer, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.setFormFieldValue}
     *
     * @public
     */
    setFormFieldValue(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfWidgetAnnoObject, value: FormFieldValue): Task<boolean, PdfErrorReason> | Task<any, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.flattenPage}
     *
     * @public
     */
    flattenPage(doc: PdfDocumentObject, page: PdfPageObject, flag: PdfPageFlattenFlag): PdfTask<PdfPageFlattenResult>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.extractPages}
     *
     * @public
     */
    extractPages(doc: PdfDocumentObject, pageIndexes: number[]): Task<any, PdfErrorReason> | Task<ArrayBuffer, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.extractText}
     *
     * @public
     */
    extractText(doc: PdfDocumentObject, pageIndexes: number[]): Task<any, PdfErrorReason> | Task<string, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getTextSlices}
     *
     * @public
     */
    getTextSlices(doc: PdfDocumentObject, slices: PageTextSlice[]): PdfTask<string[]>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.merge}
     *
     * @public
     */
    merge(files: PdfFile[]): Task<any, PdfErrorReason> | Task<PdfFile, PdfErrorReason>;
    /**
     * Merges specific pages from multiple PDF documents in a custom order
     *
     * @param mergeConfigs Array of configurations specifying which pages to merge from which documents
     * @returns A PdfTask that resolves with the merged PDF file
     * @public
     */
    mergePages(mergeConfigs: Array<{
        docId: string;
        pageIndices: number[];
    }>): Task<any, PdfErrorReason> | Task<PdfFile, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.saveAsCopy}
     *
     * @public
     */
    saveAsCopy(doc: PdfDocumentObject): Task<any, PdfErrorReason> | Task<ArrayBuffer, PdfErrorReason>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.closeDocument}
     *
     * @public
     */
    closeDocument(doc: PdfDocumentObject): Task<boolean, PdfErrorReason> | Task<any, PdfErrorReason>;
    /**
     * Memory allocation
     * @param size - size of memory space
     * @returns pointer to memory space
     *
     * @public
     */
    malloc(size: number): number;
    /**
     * Free memory space
     * @param ptr pointer to memory space
     *
     * @public
     */
    free(ptr: number): void;
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
    addInkStroke(page: PdfPageObject, pagePtr: number, annotationPtr: number, annotation: PdfInkAnnoObject): boolean;
    /**
     * Add highlight content to annotation
     * @param page - page info
     * @param annotationPtr - pointer to highlight annotation
     * @param annotation - highlight annotation
     * @returns whether highlight content is added to annotation
     *
     * @private
     */
    addTextMarkupContent(page: PdfPageObject, pagePtr: number, annotationPtr: number, annotation: PdfHighlightAnnoObject | PdfUnderlineAnnoObject | PdfStrikeOutAnnoObject | PdfSquigglyAnnoObject): boolean;
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
    addStampContent(docPtr: number, page: PdfPageObject, pagePtr: number, annotationPtr: number, rect: Rect, contents: PdfStampAnnoObjectContents): boolean;
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
    addImageObject(docPtr: number, page: PdfPageObject, pagePtr: number, annotationPtr: number, position: Position, imageData: ImageData): boolean;
    /**
     * Save document to array buffer
     * @param docPtr - pointer to pdf document
     * @returns array buffer contains the pdf content
     *
     * @private
     */
    saveDocument(docPtr: number): ArrayBuffer;
    /**
     * Read metadata from pdf document
     * @param docPtr - pointer to pdf document
     * @param key - key of metadata field
     * @returns metadata value
     *
     * @private
     */
    readMetaText(docPtr: number, key: string): string;
    /**
     * Read bookmarks in the pdf document
     * @param docPtr - pointer to pdf document
     * @param rootBookmarkPtr - pointer to root bookmark
     * @returns bookmarks in the pdf document
     *
     * @private
     */
    readPdfBookmarks(docPtr: number, rootBookmarkPtr?: number): PdfBookmarkObject[];
    /**
     * Read bookmark in the pdf document
     * @param docPtr - pointer to pdf document
     * @param bookmarkPtr - pointer to bookmark object
     * @returns pdf bookmark object
     *
     * @private
     */
    private readPdfBookmark;
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
    private readPageTextRects;
    /**
     * Return geometric + logical text layout for one page
     * (glyph-only implementation, no FPDFText_GetRect).
     *
     * @public
     */
    getPageGeometry(doc: PdfDocumentObject, page: PdfPageObject): PdfTask<PdfPageGeometry>;
    /**
     * Group consecutive glyphs that belong to the same CPDF_TextObject
     * using FPDFText_GetTextObject(), and calculate rotation from glyph positions.
     */
    private buildRunsFromGlyphs;
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
    private readGlyphInfo;
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
    getPageGlyphs(doc: PdfDocumentObject, page: PdfPageObject): PdfTask<PdfGlyphObject[]>;
    private readCharBox;
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
    private readPageAnnotations;
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
    private readPageAnnotation;
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
    private readAnnotationColor;
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
    private resolveAnnotationColor;
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
    private setAnnotationColor;
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
    private getBorderStyle;
    private setBorderStyle;
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
    private getBorderEffect;
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
    private getRectangleDifferences;
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
    private getBorderDashPattern;
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
    private getQuadPointsAnno;
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
    private syncQuadPointsAnno;
    /**
     * Read ink list from annotation
     * @param page  - logical page info object (`PdfPageObject`)
     * @param annotationPtr - pointer to the annotation whose ink list is needed
     * @returns ink list
     */
    private getInkList;
    /**
     * Add ink list to annotation
     * @param page  - logical page info object (`PdfPageObject`)
     * @param annotationPtr - pointer to the annotation whose ink list is needed
     * @param annotation - annotation object (`PdfInkAnnoObject`)
     * @returns `true` if the operation was successful
     */
    private setInkList;
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
    private readPdfTextAnno;
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
    private readPdfFreeTextAnno;
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
    private readPdfLinkAnno;
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
    private readPdfWidgetAnno;
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
    private readPdfFileAttachmentAnno;
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
    private readPdfInkAnno;
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
    private readPdfPolygonAnno;
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
    private readPdfPolylineAnno;
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
    private readPdfLineAnno;
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
    private readPdfHighlightAnno;
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
    private readPdfUnderlineAnno;
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
    private readPdfStrikeOutAnno;
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
    private readPdfSquigglyAnno;
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
    private readPdfCaretAnno;
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
    private readPdfStampAnno;
    /**
     * Read pdf object in pdf page
     * @param pageObjectPtr  - pointer to pdf object in page
     * @returns pdf object in page
     *
     * @private
     */
    private readPdfPageObject;
    /**
     * Read pdf path object
     * @param pathObjectPtr  - pointer to pdf path object in page
     * @returns pdf path object
     *
     * @private
     */
    private readPathObject;
    /**
     * Read segment of pdf path object
     * @param annotationObjectPtr - pointer to pdf path object
     * @param segmentIndex - index of segment
     * @returns pdf segment in pdf path
     *
     * @private
     */
    private readPdfSegment;
    /**
     * Read pdf image object from pdf document
     * @param pageObjectPtr  - pointer to pdf image object in page
     * @returns pdf image object
     *
     * @private
     */
    private readImageObject;
    /**
     * Read form object from pdf document
     * @param formObjectPtr  - pointer to pdf form object in page
     * @returns pdf form object
     *
     * @private
     */
    private readFormObject;
    /**
     * Read pdf object in pdf page
     * @param pageObjectPtr  - pointer to pdf object in page
     * @returns pdf object in page
     *
     * @private
     */
    private readPdfPageObjectTransformMatrix;
    /**
     * Return the stroke-width declared in the annotation’s /Border or /BS entry.
     * Falls back to 1 pt when nothing is defined.
     *
     * @param annotationPtr - pointer to pdf annotation
     * @returns stroke-width
     *
     * @private
     */
    private getStrokeWidth;
    /**
     * Fetches the `/F` flag bit-field from an annotation.
     *
     * @param annotationPtr pointer to an `FPDF_ANNOTATION`
     * @returns `{ raw, flags }`
     *          • `raw`   – the 32-bit integer returned by PDFium
     *          • `flags` – object with individual booleans
     */
    private getAnnotationFlags;
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
    private readPdfCircleAnno;
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
    private readPdfSquareAnno;
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
    private readPdfAnno;
    /**
     * Resolve `/IRT` → parent-annotation index on the same page.
     *
     * @param pagePtr        - pointer to FPDF_PAGE
     * @param annotationPtr  - pointer to FPDF_ANNOTATION
     * @returns index (`0…count-1`) or `undefined` when the annotation is *not* a reply
     *
     * @private
     */
    private getInReplyToId;
    /**
     * Fetch a string value (`/T`, `/M`, `/State`, …) from an annotation.
     *
     * @returns decoded UTF-8 string or `undefined` when the key is absent
     *
     * @private
     */
    private getAnnotString;
    /**
     * Fetches the /IT (Intent) name from an annotation as a UTF-8 JS string.
     *
     * Mirrors getAnnotString(): calls EPDFAnnot_GetIntent twice (length probe + copy).
     * Returns `undefined` if no intent present.
     */
    private getAnnotIntent;
    /**
     * Returns the rich‑content string stored in the annotation’s `/RC` entry.
     *
     * Works like `getAnnotIntent()`: first probe for length, then copy.
     * `undefined` when the annotation has no rich content.
     */
    private getAnnotRichContent;
    /**
     * Set a string value (`/T`, `/M`, `/State`, …) to an annotation.
     *
     * @returns `true` if the operation was successful
     *
     * @private
     */
    private setAnnotString;
    /**
     * Read vertices of pdf annotation
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param annotationPtr - pointer to pdf annotation
     * @returns vertices of pdf annotation
     *
     * @private
     */
    private readPdfAnnoVertices;
    /**
     * Read the target of pdf bookmark
     * @param docPtr - pointer to pdf document object
     * @param getActionPtr - callback function to retrive the pointer of action
     * @param getDestinationPtr - callback function to retrive the pointer of destination
     * @returns target of pdf bookmark
     *
     * @private
     */
    private readPdfBookmarkTarget;
    /**
     * Read field of pdf widget annotation
     * @param formHandle - form handle
     * @param annotationPtr - pointer to pdf annotation
     * @returns field of pdf widget annotation
     *
     * @private
     */
    private readPdfWidgetAnnoField;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderAnnotation}
     *
     * @public
     */
    renderAnnotation(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject, scaleFactor: number, rotation: Rotation, dpr?: number, // device-pixel-ratio (canvas)
    mode?: AppearanceMode, imageType?: ImageConversionTypes): PdfTask<T>;
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
    private renderPageRectToImageData;
    /**
     * Read the target of pdf link annotation
     * @param docPtr - pointer to pdf document object
     * @param getActionPtr - callback function to retrive the pointer of action
     * @param getDestinationPtr - callback function to retrive the pointer of destination
     * @returns target of link
     *
     * @private
     */
    private readPdfLinkAnnoTarget;
    /**
     * Read pdf action from pdf document
     * @param docPtr - pointer to pdf document object
     * @param actionPtr - pointer to pdf action object
     * @returns pdf action object
     *
     * @private
     */
    private readPdfAction;
    /**
     * Read pdf destination object
     * @param docPtr - pointer to pdf document object
     * @param destinationPtr - pointer to pdf destination
     * @returns pdf destination object
     *
     * @private
     */
    private readPdfDestination;
    /**
     * Read attachmet from pdf document
     * @param docPtr - pointer to pdf document object
     * @param index - index of attachment
     * @returns attachment content
     *
     * @private
     */
    private readPdfAttachment;
    /**
     * Convert coordinate of point from device coordinate to page coordinate
     * @param page  - pdf page infor
     * @param position - position of point
     * @returns converted position
     *
     * @private
     */
    private convertDevicePointToPagePoint;
    /**
     * Convert coordinate of point from page coordinate to device coordinate
     * @param page  - pdf page infor
     * @param position - position of point
     * @returns converted position
     *
     * @private
     */
    private convertPagePointToDevicePoint;
    /**
     * Convert coordinate of rectangle from page coordinate to device coordinate
     * @param page  - pdf page infor
     * @param pagePtr - pointer to pdf page object
     * @param pageRect - rectangle that needs to be converted
     * @returns converted rectangle
     *
     * @private
     */
    private convertPageRectToDeviceRect;
    /**
     * Read the appearance stream of annotation
     * @param annotationPtr - pointer to pdf annotation
     * @param mode - appearance mode
     * @returns appearance stream
     *
     * @private
     */
    private readPageAnnoAppearanceStreams;
    /**
     * Read the appearance stream of annotation
     * @param annotationPtr - pointer to pdf annotation
     * @param mode - appearance mode
     * @returns appearance stream
     *
     * @private
     */
    private readPageAnnoAppearanceStream;
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
    updateAnnotationColor(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObjectBase, color: WebAlphaColor, which?: number): PdfTask<boolean>;
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
    setPageAnnoRect(page: PdfPageObject, pagePtr: number, annotationPtr: number, rect: Rect): boolean;
    /**
     * Read the rectangle of annotation
     * @param annotationPtr - pointer to pdf annotation
     * @returns rectangle of annotation
     *
     * @private
     */
    private readPageAnnoRect;
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
    private getHighlightRects;
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
    searchAllPages(doc: PdfDocumentObject, keyword: string, flags?: MatchFlag[]): Task<SearchAllPagesResult, PdfErrorReason>;
    /**
     * Extract word-aligned context for a search hit.
     *
     * @param fullText      full UTF-16 page text (fetch this once per page!)
     * @param start         index of 1st char that matched
     * @param count         number of chars in the match
     * @param windowChars   minimum context chars to keep left & right
     */
    private buildContext;
    /**
     * Tidy the text to remove any non-printable characters and whitespace
     * @param s - text to tidy
     * @returns tidied text
     *
     * @private
     */
    private tidy;
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
    private searchAllInPage;
}

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
declare function readString(wasmModule: PdfiumRuntimeMethods & PdfiumModule, readChars: (buffer: number, bufferLength: number) => number, parseChars: (buffer: number) => string, defaultLength?: number): string;
/**
 * Read arraybyffer from WASM heap
 * @param wasmModule - pdfium wasm module instance
 * @param readChars - function to read chars
 * @returns arraybuffer from the heap
 *
 * @public
 */
declare function readArrayBuffer(wasmModule: PdfiumRuntimeMethods & PdfiumModule, readChars: (buffer: number, bufferLength: number) => number): ArrayBuffer;

/**
 * Request body that represent method calls of PdfEngine, it contains the
 * method name and arguments
 */
type PdfEngineMethodRequestBody = {
    [P in PdfEngineMethodName]: {
        name: P;
        args: PdfEngineMethodArgs<P>;
    };
}[PdfEngineMethodName];
/**
 * Response body that represent return value of PdfEngine
 */
type PdfEngineMethodResponseBody = {
    [P in PdfEngineMethodName]: TaskReturn<PdfEngineMethodReturnType<P>>;
}[PdfEngineMethodName];
/**
 * Request that abort the specified task
 */
interface AbortRequest {
    /**
     * message id
     */
    id: string;
    /**
     * request type
     */
    type: 'AbortRequest';
}
/**
 * Request that execute pdf engine method
 */
interface ExecuteRequest {
    /**
     * message id
     */
    id: string;
    /**
     * request type
     */
    type: 'ExecuteRequest';
    /**
     * request body
     */
    data: PdfEngineMethodRequestBody;
}
/**
 * Response that execute pdf engine method
 */
interface ExecuteResponse {
    /**
     * message id
     */
    id: string;
    /**
     * response type
     */
    type: 'ExecuteResponse';
    /**
     * response body
     */
    data: PdfEngineMethodResponseBody;
}
/**
 * Response that indicate engine is ready
 */
interface ReadyResponse {
    /**
     * message id
     */
    id: string;
    /**
     * response type
     */
    type: 'ReadyResponse';
}
/**
 * Request type
 */
type Request = ExecuteRequest | AbortRequest;
/**
 * Response type
 */
type Response = ExecuteResponse | ReadyResponse;
/**
 * Pdf engine runner, it will execute pdf engine based on the request it received and
 * send back the response with post message
 */
declare class EngineRunner {
    logger: Logger;
    engine: PdfEngine | undefined;
    /**
     * Create instance of EngineRunnder
     * @param logger - logger instance
     */
    constructor(logger?: Logger);
    /**
     * Listening on post message
     */
    listen(): void;
    /**
     * Handle post message
     */
    handle(evt: MessageEvent<Request>): void;
    /**
     * Send the ready response when pdf engine is ready
     * @returns
     *
     * @protected
     */
    ready(): void;
    /**
     * Execute the request
     * @param request - request that represent the pdf engine call
     * @returns
     *
     * @protected
     */
    execute: (request: ExecuteRequest) => void;
    /**
     * Send back the response
     * @param response - response that needs sent back
     *
     * @protected
     */
    respond(response: Response): void;
}

/**
 * EngineRunner for pdfium-based wasm engine
 */
declare class PdfiumEngineRunner extends EngineRunner {
    private wasmBinary;
    /**
     * Create an instance of PdfiumEngineRunner
     * @param wasmBinary - wasm binary that contains the pdfium wasm file
     */
    constructor(wasmBinary: ArrayBuffer);
    /**
     * Initialize runner
     */
    prepare(): Promise<void>;
}

export { BitmapFormat, PdfiumEngine, PdfiumEngineRunner, PdfiumErrorCode, RenderFlag, browserImageDataToBlobConverter, readArrayBuffer, readString };
export type { ImageDataConverter, SearchContext };
