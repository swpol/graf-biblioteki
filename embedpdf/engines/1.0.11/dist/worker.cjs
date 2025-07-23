'use strict';

var models = require('@embedpdf/models');

const LOG_SOURCE = 'WebWorkerEngine';
const LOG_CATEGORY = 'Engine';
/**
 * Task that executed by webworker
 */
class WorkerTask extends models.Task {
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
    constructor(worker, logger = new models.NoopLogger()) {
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
                code: models.PdfErrorCode.Initialization,
                message: 'worker initialization failed',
            });
        });
    }
}
WebWorkerEngine.readyTaskId = '0';

exports.WebWorkerEngine = WebWorkerEngine;
exports.WorkerTask = WorkerTask;
//# sourceMappingURL=worker.cjs.map
