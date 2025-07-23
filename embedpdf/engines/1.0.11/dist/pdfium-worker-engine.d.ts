import { PdfEngineMethodName, PdfEngineMethodArgs, PdfEngine, Logger, PdfFileUrl, PdfUrlOptions, PdfDocumentObject, PdfFile, PdfFileLoader, PdfMetadataObject, PdfPageObject, PdfAnnotationObjectBase, WebAlphaColor, PdfBookmarksObject, PdfSignatureObject, Rotation, PdfRenderOptions, ImageConversionTypes, Rect, PdfAnnotationObject, AppearanceMode, PdfTextRectObject, MatchFlag, SearchAllPagesResult, PdfAttachmentObject, PdfWidgetAnnoObject, FormFieldValue, PdfPageFlattenFlag, PdfPageFlattenResult, PageTextSlice, PdfGlyphObject, PdfPageGeometry, Task, PdfErrorReason } from '@embedpdf/models';

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
 * Task that executed by webworker
 */
declare class WorkerTask<R> extends Task<R, PdfErrorReason> {
    worker: Worker;
    private messageId;
    /**
     * Create a task that bind to web worker with specified message id
     * @param worker - web worker instance
     * @param messageId - id of message
     *
     * @public
     */
    constructor(worker: Worker, messageId: string);
    /**
     * {@inheritDoc @embedpdf/models!Task.abort}
     *
     * @override
     */
    abort(e: PdfErrorReason): void;
}
/**
 * PDF engine that runs within webworker
 */
declare class WebWorkerEngine implements PdfEngine {
    private worker;
    private logger;
    static readyTaskId: string;
    /**
     * Task that represent the state of preparation
     */
    readyTask: WorkerTask<boolean>;
    /**
     * All the tasks that is executing
     */
    tasks: Map<string, WorkerTask<any>>;
    /**
     * Create an instance of WebWorkerEngine, it will create a worker with
     * specified url.
     * @param worker - webworker instance, this worker needs to contains the running instance of {@link EngineRunner}
     * @param logger - logger instance
     *
     * @public
     */
    constructor(worker: Worker, logger?: Logger);
    /**
     * Handle event from web worker. There are 2 kinds of event
     * 1. ReadyResponse: web worker is ready
     * 2. ExecuteResponse: result of execution
     * @param evt - message event from web worker
     * @returns
     *
     * @private
     */
    handle: (evt: MessageEvent<any>) => void;
    /**
     * Generate a unique message id
     * @returns message id
     *
     * @private
     */
    generateRequestId(id: string): string;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.initialize}
     *
     * @public
     */
    initialize(): WorkerTask<boolean>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.destroy}
     *
     * @public
     */
    destroy(): WorkerTask<boolean>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocumentUrl}
     *
     * @public
     */
    openDocumentUrl(file: PdfFileUrl, options?: PdfUrlOptions): WorkerTask<PdfDocumentObject>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocument}
     *
     * @public
     */
    openDocumentFromBuffer(file: PdfFile, password: string): WorkerTask<PdfDocumentObject>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.openDocumentFromLoader}
     *
     * @public
     */
    openDocumentFromLoader(file: PdfFileLoader, password: string): WorkerTask<PdfDocumentObject>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getMetadata}
     *
     * @public
     */
    getMetadata(doc: PdfDocumentObject): WorkerTask<PdfMetadataObject>;
    updateAnnotationColor(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObjectBase, color: WebAlphaColor, which?: number): WorkerTask<boolean>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getDocPermissions}
     *
     * @public
     */
    getDocPermissions(doc: PdfDocumentObject): WorkerTask<number>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getDocUserPermissions}
     *
     * @public
     */
    getDocUserPermissions(doc: PdfDocumentObject): WorkerTask<number>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getBookmarks}
     *
     * @public
     */
    getBookmarks(doc: PdfDocumentObject): WorkerTask<PdfBookmarksObject>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getSignatures}
     *
     * @public
     */
    getSignatures(doc: PdfDocumentObject): WorkerTask<PdfSignatureObject[]>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderPage}
     *
     * @public
     */
    renderPage(doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation, dpr: number, options: PdfRenderOptions, imageType?: ImageConversionTypes): WorkerTask<Blob>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderPageRect}
     *
     * @public
     */
    renderPageRect(doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation, dpr: number, rect: Rect, options: PdfRenderOptions, imageType?: ImageConversionTypes): WorkerTask<Blob>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderAnnotation}
     *
     * @public
     */
    renderAnnotation(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject, scaleFactor: number, rotation: Rotation, dpr: number, mode: AppearanceMode, imageType: ImageConversionTypes): WorkerTask<Blob>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getAllAnnotations}
     *
     * @public
     */
    getAllAnnotations(doc: PdfDocumentObject): WorkerTask<Record<number, PdfAnnotationObject[]>>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageAnnotations}
     *
     * @public
     */
    getPageAnnotations(doc: PdfDocumentObject, page: PdfPageObject): WorkerTask<PdfAnnotationObject[]>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.createPageAnnotation}
     *
     * @public
     */
    createPageAnnotation(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject): WorkerTask<number>;
    updatePageAnnotation(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject): WorkerTask<boolean>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.removePageAnnotation}
     *
     * @public
     */
    removePageAnnotation(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject): WorkerTask<boolean>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageTextRects}
     *
     * @public
     */
    getPageTextRects(doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation): WorkerTask<PdfTextRectObject[]>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.renderThumbnail}
     *
     * @public
     */
    renderThumbnail(doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation, dpr: number): WorkerTask<Blob>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.searchAllPages}
     *
     * @public
     */
    searchAllPages(doc: PdfDocumentObject, keyword: string, flags?: MatchFlag[]): WorkerTask<SearchAllPagesResult>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.saveAsCopy}
     *
     * @public
     */
    saveAsCopy(doc: PdfDocumentObject): WorkerTask<ArrayBuffer>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getAttachments}
     *
     * @public
     */
    getAttachments(doc: PdfDocumentObject): WorkerTask<PdfAttachmentObject[]>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.readAttachmentContent}
     *
     * @public
     */
    readAttachmentContent(doc: PdfDocumentObject, attachment: PdfAttachmentObject): WorkerTask<ArrayBuffer>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.setFormFieldValue}
     *
     * @public
     */
    setFormFieldValue(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfWidgetAnnoObject, value: FormFieldValue): WorkerTask<boolean>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.flattenPage}
     *
     * @public
     */
    flattenPage(doc: PdfDocumentObject, page: PdfPageObject, flag: PdfPageFlattenFlag): WorkerTask<PdfPageFlattenResult>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.extractPages}
     *
     * @public
     */
    extractPages(doc: PdfDocumentObject, pageIndexes: number[]): WorkerTask<ArrayBuffer>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.extractText}
     *
     * @public
     */
    extractText(doc: PdfDocumentObject, pageIndexes: number[]): WorkerTask<string>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getTextSlices}
     *
     * @public
     */
    getTextSlices(doc: PdfDocumentObject, slices: PageTextSlice[]): WorkerTask<string[]>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageGlyphs}
     *
     * @public
     */
    getPageGlyphs(doc: PdfDocumentObject, page: PdfPageObject): WorkerTask<PdfGlyphObject[]>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.getPageGeometry}
     *
     * @public
     */
    getPageGeometry(doc: PdfDocumentObject, page: PdfPageObject): WorkerTask<PdfPageGeometry>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.merge}
     *
     * @public
     */
    merge(files: PdfFile[]): WorkerTask<PdfFile>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.mergePages}
     *
     * @public
     */
    mergePages(mergeConfigs: Array<{
        docId: string;
        pageIndices: number[];
    }>): WorkerTask<PdfFile>;
    /**
     * {@inheritDoc @embedpdf/models!PdfEngine.closeDocument}
     *
     * @public
     */
    closeDocument(doc: PdfDocumentObject): WorkerTask<boolean>;
    /**
     * Send the request to webworker inside and register the task
     * @param task - task that waiting for the response
     * @param request - request that needs send to web worker
     * @param transferables - transferables that need to transfer to webworker
     * @returns
     *
     * @internal
     */
    proxy<R>(task: WorkerTask<R>, request: ExecuteRequest, transferables?: any[]): void;
}

/**
 * Zero-config helper:
 *   const engine = createDefaultWorkerEngine('/wasm/pdfium.wasm');
 */
declare function createPdfiumEngine(wasmUrl: string, logger?: Logger): WebWorkerEngine;

export { createPdfiumEngine };
