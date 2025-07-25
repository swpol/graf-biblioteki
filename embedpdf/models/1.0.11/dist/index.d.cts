/**
 * Clockwise direction
 * @public
 */
declare enum Rotation {
    Degree0 = 0,
    Degree90 = 1,
    Degree180 = 2,
    Degree270 = 3
}
/** Clamp a Position to device-pixel integers (floor) */
declare function toIntPos(p: Position): Position;
/** Clamp a Size so it never truncates right / bottom (ceil) */
declare function toIntSize(s: Size): Size;
/** Apply both rules to a Rect */
declare function toIntRect(r: Rect): Rect;
/**
 * Calculate degree that match the rotation type
 * @param rotation - type of rotation
 * @returns rotated degree
 *
 * @public
 */
declare function calculateDegree(rotation: Rotation): 0 | 90 | 180 | 270;
/**
 * Calculate angle that match the rotation type
 * @param rotation - type of rotation
 * @returns rotated angle
 *
 * @public
 */
declare function calculateAngle(rotation: Rotation): number;
/**
 * Represent the size of object
 *
 * @public
 */
interface Size {
    /**
     * width of the object
     */
    width: number;
    /**
     * height of the object
     */
    height: number;
}
/**
 * Represents a rectangle defined by its left, top, right, and bottom edges
 *
 * @public
 */
interface Box {
    /**
     * The x-coordinate of the left edge
     */
    left: number;
    /**
     * The y-coordinate of the top edge
     */
    top: number;
    /**
     * The x-coordinate of the right edge
     */
    right: number;
    /**
     * The y-coordinate of the bottom edge
     */
    bottom: number;
}
/**
 * Swap the width and height of the size object
 * @param size - the original size
 * @returns swapped size
 *
 * @public
 */
declare function swap(size: Size): Size;
/**
 * Transform size with specified rotation angle and scale factor
 * @param size - orignal size of rect
 * @param rotation - rotation angle
 * @param scaleFactor - - scale factor
 * @returns size that has been transformed
 *
 * @public
 */
declare function transformSize(size: Size, rotation: Rotation, scaleFactor: number): Size;
/**
 * position of point
 *
 * @public
 */
interface Position {
    /**
     * x coordinate
     */
    x: number;
    /**
     * y coordinate
     */
    y: number;
}
/**
 * Quadrilateral
 *
 * @public
 */
interface Quad {
    p1: Position;
    p2: Position;
    p3: Position;
    p4: Position;
}
/**
 * Convert quadrilateral to rectangle
 * @param q - quadrilateral
 * @returns rectangle
 *
 * @public
 */
declare function quadToRect(q: Quad): Rect;
/**
 * Convert rectangle to quadrilateral
 * @param r - rectangle
 * @returns quadrilateral
 *
 * @public
 */
declare function rectToQuad(r: Rect): Quad;
/**
 * Rotate the container and calculate the new position for a point
 * in specified position
 * @param containerSize - size of the container
 * @param position - position of the point
 * @param rotation - rotated angle
 * @returns new position of the point
 *
 * @public
 */
declare function rotatePosition(containerSize: Size, position: Position, rotation: Rotation): Position;
/**
 * Calculate the position of point by scaling the container
 * @param position - position of the point
 * @param scaleFactor - factor of scaling
 * @returns new position of point
 *
 * @public
 */
declare function scalePosition(position: Position, scaleFactor: number): Position;
/**
 * Calculate the position of the point by applying the specified transformation
 * @param containerSize - size of container
 * @param position - position of the point
 * @param rotation - rotated angle
 * @param scaleFactor - factor of scaling
 * @returns new position of point
 *
 * @public
 */
declare function transformPosition(containerSize: Size, position: Position, rotation: Rotation, scaleFactor: number): Position;
/**
 * Restore the position in a transformed cotainer
 * @param containerSize - size of the container
 * @param position - position of the point
 * @param rotation - rotated angle
 * @param scaleFactor - factor of scaling
 * @returns the original position of the point
 *
 * @public
 */
declare function restorePosition(containerSize: Size, position: Position, rotation: Rotation, scaleFactor: number): Position;
/**
 * representation of rectangle
 *
 * @public
 */
interface Rect {
    /**
     * origin of the rectangle
     */
    origin: Position;
    /**
     * size of the rectangle
     */
    size: Size;
}
/**
 * Calculate the rect after rotated the container
 * @param containerSize - size of container
 * @param rect - target rect
 * @param rotation - rotation angle
 * @returns rotated rect
 *
 * @public
 */
declare function rotateRect(containerSize: Size, rect: Rect, rotation: Rotation): Rect;
/**
 * Scale the rectangle
 * @param rect - rectangle
 * @param scaleFactor - factor of scaling
 * @returns new rectangle
 *
 * @public
 */
declare function scaleRect(rect: Rect, scaleFactor: number): Rect;
/**
 * Calculate new rectangle after transforming the container
 * @param containerSize - size of the container
 * @param rect - the target rectangle
 * @param rotation - rotated angle
 * @param scaleFactor - factor of scaling
 * @returns new rectangle after transformation
 *
 * @public
 */
declare function transformRect(containerSize: Size, rect: Rect, rotation: Rotation, scaleFactor: number): Rect;
/**
 * Calculate new rectangle before transforming the container
 * @param containerSize - size of the container
 * @param rect - the target rectangle
 * @param rotation - rotated angle
 * @param scaleFactor - factor of scaling
 * @returns original rectangle before transformation
 *
 * @public
 */
declare function restoreRect(containerSize: Size, rect: Rect, rotation: Rotation, scaleFactor: number): Rect;
/**
 * Calculate the original offset in a transformed container
 * @param offset - position of the point
 * @param rotation - rotated angle
 * @param scaleFactor - factor of scaling
 * @returns original position of the point
 *
 * @public
 */
declare function restoreOffset(offset: Position, rotation: Rotation, scaleFactor: number): Position;
/**
 * Return the smallest rectangle that encloses *all* `rects`.
 * If the array is empty, returns `null`.
 *
 * @param rects - array of rectangles
 * @returns smallest rectangle that encloses all the rectangles
 *
 * @public
 */
declare function boundingRect(rects: Rect[]): Rect | null;
interface Matrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}
/**
 * Build a CTM that maps *PDF-space* inside the annotation
 * → *device-space* inside the bitmap, honouring
 * zoom (scaleFactor × dpr) **and** page-rotation.
 */
/** build the CTM for any page-rotation */
declare const makeMatrix: (rectangle: Rect, rotation: Rotation, scaleFactor: number) => Matrix;

/**
 * logger for logging
 *
 * @public
 */
interface Logger {
    /**
     * Log debug message
     * @param source - source of log
     * @param category - category of log
     * @param args - parameters of log
     * @returns
     *
     * @public
     */
    debug: (source: string, category: string, ...args: any) => void;
    /**
     * Log infor message
     * @param source - source of log
     * @param category - category of log
     * @param args - parameters of log
     * @returns
     *
     * @public
     */
    info: (source: string, category: string, ...args: any) => void;
    /**
     * Log warning message
     * @param source - source of log
     * @param category - category of log
     * @param args - parameters of log
     * @returns
     *
     * @public
     */
    warn: (source: string, category: string, ...args: any) => void;
    /**
     * Log error message
     * @param source - source of log
     * @param category - category of log
     * @param args - parameters of log
     * @returns
     *
     * @public
     */
    error: (source: string, category: string, ...args: any) => void;
    /**
     * Log performance log
     * @param source - source of log
     * @param category - category of log
     * @param event - event of log
     * @param phase - event phase of log
     * @param args - parameters of log
     * @returns
     *
     * @public
     */
    perf: (source: string, category: string, event: string, phase: 'Begin' | 'End', ...args: any) => void;
}
/**
 * Logger that log nothing, it will ignore all the logs
 *
 * @public
 */
declare class NoopLogger implements Logger {
    /** {@inheritDoc Logger.debug} */
    debug(): void;
    /** {@inheritDoc Logger.info} */
    info(): void;
    /** {@inheritDoc Logger.warn} */
    warn(): void;
    /** {@inheritDoc Logger.error} */
    error(): void;
    /** {@inheritDoc Logger.perf} */
    perf(): void;
}
/**
 * Logger that use console as the output
 *
 * @public
 */
declare class ConsoleLogger implements Logger {
    /** {@inheritDoc Logger.debug} */
    debug(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.info} */
    info(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.warn} */
    warn(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.error} */
    error(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.perf} */
    perf(source: string, category: string, event: string, phase: 'Begin' | 'End', ...args: any): void;
}
/**
 * Level of log
 *
 * @public
 */
declare enum LogLevel {
    Debug = 0,
    Info = 1,
    Warn = 2,
    Error = 3
}
/**
 * Logger that support filtering by log level
 *
 * @public
 */
declare class LevelLogger implements Logger {
    private logger;
    private level;
    /**
     * create new LevelLogger
     * @param logger - the original logger
     * @param level - log level that used for filtering, all logs lower than this level will be filtered out
     */
    constructor(logger: Logger, level: LogLevel);
    /** {@inheritDoc Logger.debug} */
    debug(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.info} */
    info(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.warn} */
    warn(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.error} */
    error(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.perf} */
    perf(source: string, category: string, event: string, phase: 'Begin' | 'End', ...args: any): void;
}
/**
 * Logger for performance tracking
 *
 * @public
 */
declare class PerfLogger implements Logger {
    /**
     * create new PerfLogger
     */
    constructor();
    /** {@inheritDoc Logger.debug} */
    debug(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.info} */
    info(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.warn} */
    warn(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.error} */
    error(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.perf} */
    perf(source: string, category: string, event: string, phase: 'Begin' | 'End', identifier: string, ...args: any): void;
}
/**
 * Logger that will track and call child loggers
 *
 * @public
 */
declare class AllLogger implements Logger {
    private loggers;
    /**
     * create new PerfLogger
     */
    constructor(loggers: Logger[]);
    /** {@inheritDoc Logger.debug} */
    debug(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.info} */
    info(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.warn} */
    warn(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.error} */
    error(source: string, category: string, ...args: any): void;
    /** {@inheritDoc Logger.perf} */
    perf(source: string, category: string, event: string, phase: 'Begin' | 'End', ...args: any): void;
}

interface WebAlphaColor {
    color: string;
    opacity: number;
}
/**
 * Convert a {@link PdfAlphaColor} to a CSS-style colour definition.
 *
 * @param c - the colour coming from PDFium (0-255 per channel)
 * @returns
 *   hex   – #RRGGBB (no alpha channel)
 *   opacity – 0-1 float suitable for CSS `opacity`/`rgba()`
 */
declare function pdfAlphaColorToWebAlphaColor(c: PdfAlphaColor): WebAlphaColor;
/**
 * Convert a CSS hex colour + opacity back into {@link PdfAlphaColor}
 *
 * @param hex      - #RGB, #RRGGBB, or #rrggbb
 * @param opacity  - 0-1 float (values outside clamp automatically)
 */
declare function webAlphaColorToPdfAlphaColor({ color, opacity }: WebAlphaColor): PdfAlphaColor;

/**
 * Stage of task
 *
 * @public
 */
declare enum TaskStage {
    /**
     * Task is pending, means it just start executing
     */
    Pending = 0,
    /**
     * Task is succeed
     */
    Resolved = 1,
    /**
     * Task is failed
     */
    Rejected = 2,
    /**
     * Task is aborted
     */
    Aborted = 3
}
interface TaskError<D> {
    /**
     * task error type
     */
    type: 'reject' | 'abort';
    /**
     * task error
     */
    reason: D;
}
/**
 * callback that will be called when task is resolved
 *
 * @public
 */
type ResolvedCallback<R> = (r: R) => void;
/**
 * callback that will be called when task is rejected
 *
 * @public
 */
type RejectedCallback<D> = (e: TaskError<D>) => void;
/**
 * Task state in different stage
 *
 * @public
 */
type TaskState<R, D> = {
    stage: TaskStage.Pending;
} | {
    stage: TaskStage.Resolved;
    result: R;
} | {
    stage: TaskStage.Rejected;
    reason: D;
} | {
    stage: TaskStage.Aborted;
    reason: D;
};
/**
 * Result type for allSettled
 *
 * @public
 */
type TaskSettledResult<R, D> = {
    status: 'resolved';
    value: R;
} | {
    status: 'rejected';
    reason: D;
} | {
    status: 'aborted';
    reason: D;
};
declare class TaskAbortedError<D> extends Error {
    constructor(reason: D);
}
declare class TaskRejectedError<D> extends Error {
    constructor(reason: D);
}
/**
 * Base class of task
 *
 * @public
 */
declare class Task<R, D> {
    state: TaskState<R, D>;
    /**
     * callbacks that will be executed when task is resolved
     */
    resolvedCallbacks: ResolvedCallback<R>[];
    /**
     * callbacks that will be executed when task is rejected
     */
    rejectedCallbacks: RejectedCallback<D>[];
    /**
     * Promise that will be resolved when task is settled
     */
    private _promise;
    /**
     * Convert task to promise
     * @returns promise that will be resolved when task is settled
     */
    toPromise(): Promise<R>;
    /**
     * wait for task to be settled
     * @param resolvedCallback - callback for resolved value
     * @param rejectedCallback - callback for rejected value
     */
    wait(resolvedCallback: ResolvedCallback<R>, rejectedCallback: RejectedCallback<D>): void;
    /**
     * resolve task with specific result
     * @param result - result value
     */
    resolve(result: R): void;
    /**
     * reject task with specific reason
     * @param reason - abort reason
     *
     */
    reject(reason: D): void;
    /**
     * abort task with specific reason
     * @param reason - abort reason
     */
    abort(reason: D): void;
    /**
     * fail task with a TaskError from another task
     * This is a convenience method for error propagation between tasks
     * @param error - TaskError from another task
     */
    fail(error: TaskError<D>): void;
    /**
     * Static method to wait for all tasks to resolve
     * Returns a new task that resolves with an array of all results
     * Rejects immediately if any task fails
     *
     * @param tasks - array of tasks to wait for
     * @returns new task that resolves when all input tasks resolve
     * @public
     */
    static all<R extends readonly Task<any, any>[]>(tasks: R): Task<{
        [K in keyof R]: R[K] extends Task<infer U, any> ? U : never;
    }, any>;
    /**
     * Static method to wait for all tasks to settle (resolve, reject, or abort)
     * Always resolves with an array of settlement results
     *
     * @param tasks - array of tasks to wait for
     * @returns new task that resolves when all input tasks settle
     * @public
     */
    static allSettled<R extends readonly Task<any, any>[]>(tasks: R): Task<{
        [K in keyof R]: R[K] extends Task<infer U, infer E> ? TaskSettledResult<U, E> : never;
    }, never>;
    /**
     * Static method that resolves/rejects with the first task that settles
     *
     * @param tasks - array of tasks to race
     * @returns new task that settles with the first input task that settles
     * @public
     */
    static race<R extends readonly Task<any, any>[]>(tasks: R): Task<R[number] extends Task<infer U, any> ? U : never, R[number] extends Task<any, infer E> ? E : never>;
    /**
     * Utility to track progress of multiple tasks
     *
     * @param tasks - array of tasks to track
     * @param onProgress - callback called when any task completes
     * @returns new task that resolves when all input tasks resolve
     * @public
     */
    static withProgress<R extends readonly Task<any, any>[]>(tasks: R, onProgress?: (completed: number, total: number) => void): Task<{
        [K in keyof R]: R[K] extends Task<infer U, any> ? U : never;
    }, any>;
}
/**
 * Type that represent the result of executing task
 */
type TaskReturn<T extends Task<any, any>> = T extends Task<infer R, infer E> ? {
    type: 'result';
    value: R;
} | {
    type: 'error';
    value: TaskError<E>;
} : never;

/**
 * Representation of pdf page
 *
 * @public
 */
interface PdfPageObject {
    /**
     * Index of this page, starts from 0
     */
    index: number;
    /**
     * Orignal size of this page
     */
    size: Size;
}
/**
 * Representation of pdf page with rotated size
 *
 * @public
 */
interface PdfPageObjectWithRotatedSize extends PdfPageObject {
    /**
     * Rotated size of this page
     */
    rotatedSize: Size;
}
/**
 * Representation of pdf document
 *
 * @public
 */
interface PdfDocumentObject {
    /**
     * Identity of document
     */
    id: string;
    /**
     * Count of pages in this document
     */
    pageCount: number;
    /**
     * Pages in this document
     */
    pages: PdfPageObject[];
}
/**
 * metadata of pdf document
 *
 * @public
 */
interface PdfMetadataObject {
    /**
     * title of the document
     */
    title: string;
    /**
     * author of the document
     */
    author: string;
    /**
     * subject of the document
     */
    subject: string;
    /**
     * keywords of the document
     */
    keywords: string;
    /**
     * producer of the document
     */
    producer: string;
    /**
     * creator of the document
     */
    creator: string;
    /**
     * creation date of the document
     */
    creationDate: string;
    /**
     * modification date of the document
     */
    modificationDate: string;
}
/**
 * Unicode **soft-hyphen** marker (`U+00AD`).
 * Often embedded by PDF generators as discretionary hyphens.
 *
 * @public
 */
declare const PdfSoftHyphenMarker = "\u00AD";
/**
 * Unicode **zero-width space** (`U+200B`).
 *
 * @public
 */
declare const PdfZeroWidthSpace = "\u200B";
/**
 * Unicode **word-joiner** (`U+2060`) – zero-width no-break.
 *
 * @public
 */
declare const PdfWordJoiner = "\u2060";
/**
 * Unicode **byte-order mark / zero-width&nbsp;no-break space** (`U+FEFF`).
 *
 * @public
 */
declare const PdfBomOrZwnbsp = "\uFEFF";
/**
 * Unicode non-character `U+FFFE`.
 *
 * @public
 */
declare const PdfNonCharacterFFFE = "\uFFFE";
/**
 * Unicode non-character `U+FFFF`.
 *
 * @public
 */
declare const PdfNonCharacterFFFF = "\uFFFF";
/**
 * **Frozen list** of all unwanted markers in canonical order.
 *
 * @public
 */
declare const PdfUnwantedTextMarkers: readonly ["­", "​", "⁠", "﻿", "￾", "￿"];
/**
 * Compiled regular expression that matches any unwanted marker.
 *
 * @public
 */
declare const PdfUnwantedTextRegex: RegExp;
/**
 * Remove all {@link PdfUnwantedTextMarkers | unwanted markers} from *text*.
 *
 * @param text - raw text extracted from PDF
 * @returns cleaned text
 *
 * @public
 */
declare function stripPdfUnwantedMarkers(text: string): string;
/**
 * zoom mode
 *
 * @public
 */
declare enum PdfZoomMode {
    Unknown = 0,
    /**
     * Zoom level with specified offset.
     */
    XYZ = 1,
    /**
     * Fit both the width and height of the page (whichever smaller).
     */
    FitPage = 2,
    /**
     * Fit the page width.
     */
    FitHorizontal = 3,
    /**
     * Fit the page height.
     */
    FitVertical = 4,
    /**
     * Fit a specific rectangle area within the window.
     */
    FitRectangle = 5
}
/**
 * Blend mode
 *
 * @public
 */
declare enum PdfBlendMode {
    Normal = 0,
    Multiply = 1,
    Screen = 2,
    Overlay = 3,
    Darken = 4,
    Lighten = 5,
    ColorDodge = 6,
    ColorBurn = 7,
    HardLight = 8,
    SoftLight = 9,
    Difference = 10,
    Exclusion = 11,
    Hue = 12,
    Saturation = 13,
    Color = 14,
    Luminosity = 15
}
/** Extra UI sentinel for “multiple different values selected”. */
declare const MixedBlendMode: unique symbol;
type UiBlendModeValue = PdfBlendMode | typeof MixedBlendMode;
interface BlendModeInfo {
    /** Pdf enum value */
    id: PdfBlendMode;
    /** Human label for UI */
    label: string;
    /** CSS mix-blend-mode token */
    css: string;
}
/** Get descriptor (falls back to Normal if unknown number sneaks in).
 *
 * @public
 */
declare function getBlendModeInfo(mode: PdfBlendMode): BlendModeInfo;
/** Convert enum → CSS value for `mix-blend-mode`.
 *
 * @public
 */
declare function blendModeToCss(mode: PdfBlendMode): string;
/** Convert CSS token → enum (returns undefined if not recognized).
 *
 * @public
 */
declare function cssToBlendMode(value: string): PdfBlendMode | undefined;
/** Enum → UI label.
 *
 * @public
 */
declare function blendModeLabel(mode: PdfBlendMode): string;
/**
 * For a selection of annotations: returns the common enum value, or Mixed sentinel.
 *
 * @public
 */
declare function reduceBlendModes(modes: readonly PdfBlendMode[]): UiBlendModeValue;
/** Options for a <select>.
 *
 * @public
 */
declare const blendModeSelectOptions: {
    value: PdfBlendMode;
    label: string;
}[];
/** Provide a label when Mixed sentinel used (UI convenience).
 *
 * @public
 */
declare function uiBlendModeDisplay(value: UiBlendModeValue): string;
/**
 * Representation of the linked destination
 *
 * @public
 */
interface PdfDestinationObject {
    /**
     * Index of target page
     */
    pageIndex: number;
    /**
     * zoom config for target destination
     */
    zoom: {
        mode: PdfZoomMode.Unknown;
    } | {
        mode: PdfZoomMode.XYZ;
        params: {
            x: number;
            y: number;
            zoom: number;
        };
    } | {
        mode: PdfZoomMode.FitPage;
    } | {
        mode: PdfZoomMode.FitHorizontal;
    } | {
        mode: PdfZoomMode.FitVertical;
    } | {
        mode: PdfZoomMode.FitRectangle;
    };
    view: number[];
}
/**
 * Type of pdf action
 *
 * @public
 */
declare enum PdfActionType {
    Unsupported = 0,
    /**
     * Goto specified position in this document
     */
    Goto = 1,
    /**
     * Goto specified position in another document
     */
    RemoteGoto = 2,
    /**
     * Goto specified URI
     */
    URI = 3,
    /**
     * Launch specifed application
     */
    LaunchAppOrOpenFile = 4
}
type PdfImage = {
    data: Uint8ClampedArray;
    width: number;
    height: number;
};
/**
 * Representation of pdf action
 *
 * @public
 */
type PdfActionObject = {
    type: PdfActionType.Unsupported;
} | {
    type: PdfActionType.Goto;
    destination: PdfDestinationObject;
} | {
    type: PdfActionType.RemoteGoto;
    destination: PdfDestinationObject;
} | {
    type: PdfActionType.URI;
    uri: string;
} | {
    type: PdfActionType.LaunchAppOrOpenFile;
    path: string;
};
/**
 * target of pdf link
 *
 * @public
 */
type PdfLinkTarget = {
    type: 'action';
    action: PdfActionObject;
} | {
    type: 'destination';
    destination: PdfDestinationObject;
};
/**
 * PDF bookmark
 *
 * @public
 */
interface PdfBookmarkObject {
    /**
     * title of bookmark
     */
    title: string;
    /**
     * target of bookmark
     */
    target?: PdfLinkTarget | undefined;
    /**
     * bookmarks in the next level
     */
    children?: PdfBookmarkObject[];
}
/**
 * Pdf Signature
 *
 * @public
 */
interface PdfSignatureObject {
    /**
     * contents of signature
     */
    contents: ArrayBuffer;
    /**
     * byte range of signature
     */
    byteRange: ArrayBuffer;
    /**
     * sub filters of signature
     */
    subFilter: ArrayBuffer;
    /**
     * reason of signature
     */
    reason: string;
    /**
     * creation time of signature
     */
    time: string;
    /**
     * MDP
     */
    docMDP: number;
}
/**
 * Bookmark tree of pdf
 *
 * @public
 */
interface PdfBookmarksObject {
    bookmarks: PdfBookmarkObject[];
}
/**
 * Text rectangle in pdf page
 *
 * @public
 */
interface PdfTextRectObject {
    /**
     * Font of the text
     */
    font: {
        /**
         * font family
         */
        family: string;
        /**
         * font size
         */
        size: number;
    };
    /**
     * content in this rectangle area
     */
    content: string;
    /**
     * rectangle of the text
     */
    rect: Rect;
}
/**
 * Color
 *
 * @public
 */
interface PdfAlphaColor {
    /**
     * red
     */
    red: number;
    /**
     * green
     */
    green: number;
    /**
     * blue
     */
    blue: number;
    /**
     * alpha
     */
    alpha: number;
}
/**
 * Annotation type
 *
 * @public
 */
declare enum PdfAnnotationSubtype {
    UNKNOWN = 0,
    TEXT = 1,
    LINK = 2,
    FREETEXT = 3,
    LINE = 4,
    SQUARE = 5,
    CIRCLE = 6,
    POLYGON = 7,
    POLYLINE = 8,
    HIGHLIGHT = 9,
    UNDERLINE = 10,
    SQUIGGLY = 11,
    STRIKEOUT = 12,
    STAMP = 13,
    CARET = 14,
    INK = 15,
    POPUP = 16,
    FILEATTACHMENT = 17,
    SOUND = 18,
    MOVIE = 19,
    WIDGET = 20,
    SCREEN = 21,
    PRINTERMARK = 22,
    TRAPNET = 23,
    WATERMARK = 24,
    THREED = 25,
    RICHMEDIA = 26,
    XFAWIDGET = 27,
    REDACT = 28
}
/**
 * Name of annotation type
 *
 * @public
 */
declare const PdfAnnotationSubtypeName: Record<PdfAnnotationSubtype, string>;
/**
 * Status of pdf annotation
 *
 * @public
 */
declare enum PdfAnnotationObjectStatus {
    /**
     * Annotation is created
     */
    Created = 0,
    /**
     * Annotation is committed to PDF file
     */
    Committed = 1
}
/**
 * Appearance mode
 *
 * @public
 */
declare enum AppearanceMode {
    Normal = 0,
    Rollover = 1,
    Down = 2
}
/**
 * State of pdf annotation
 *
 * @public
 */
declare enum PdfAnnotationState {
    /**
     * Annotation is active
     */
    Marked = "Marked",
    /**
     * Annotation is unmarked
     */
    Unmarked = "Unmarked",
    /**
     * Annotation is ink
     */
    Accepted = "Accepted",
    /**
     * Annotation is rejected
     */
    Rejected = "Rejected",
    /**
     * Annotation is complete
     */
    Complete = "Complete",
    /**
     * Annotation is cancelled
     */
    Cancelled = "Cancelled",
    /**
     * Annotation is none
     */
    None = "None"
}
/**
 * State model of pdf annotation
 *
 * @public
 */
declare enum PdfAnnotationStateModel {
    /**
     * Annotation is marked
     */
    Marked = "Marked",
    /**
     * Annotation is reviewed
     */
    Reviewed = "Reviewed"
}
/**
 * Basic information of pdf annotation
 *
 * @public
 */
interface PdfAnnotationObjectBase {
    /**
     * Author of the annotation
     */
    author?: string;
    /**
     * Modified date of the annotation
     */
    modified?: Date;
    /**
     * blend mode of annotation
     */
    blendMode?: PdfBlendMode;
    /**
     * intent of annotation
     */
    intent?: string;
    /**
     * Sub type of annotation
     */
    type: PdfAnnotationSubtype;
    /**
     * The index of page that this annotation belong to
     */
    pageIndex: number;
    /**
     * id of the annotation
     */
    id: number;
    /**
     * Rectangle of the annotation
     */
    rect: Rect;
}
/**
 * Popup annotation
 *
 * @public
 */
interface PdfPopupAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.POPUP;
    /**
     * Contents of the popup
     */
    contents: string;
    /**
     * Whether the popup is opened or not
     */
    open: boolean;
    /**
     * In reply to id
     */
    inReplyToId?: number;
}
/**
 * Pdf Link annotation
 *
 * @public
 */
interface PdfLinkAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.LINK;
    /**
     * Text of the link
     */
    text: string;
    /**
     * target of the link
     */
    target: PdfLinkTarget | undefined;
}
/**
 * Pdf Text annotation
 *
 * @public
 */
interface PdfTextAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.TEXT;
    /**
     * Text contents of the annotation
     */
    contents: string;
    /**
     * color of text annotation
     */
    color?: string;
    /**
     * opacity of text annotation
     */
    opacity?: number;
    /**
     * In reply to id
     */
    inReplyToId?: number;
    /**
     * State of the text annotation
     */
    state?: PdfAnnotationState;
    /**
     * State model of the text annotation
     */
    stateModel?: PdfAnnotationStateModel;
}
/**
 * Type of form field
 *
 * @public
 */
declare enum PDF_FORM_FIELD_TYPE {
    /**
     * Unknow
     */
    UNKNOWN = 0,
    /**
     * push button type
     */
    PUSHBUTTON = 1,
    /**
     * check box type.
     */
    CHECKBOX = 2,
    /**
     * radio button type.
     */
    RADIOBUTTON = 3,
    /**
     * combo box type.
     */
    COMBOBOX = 4,
    /**
     * list box type.
     */
    LISTBOX = 5,
    /**
     *  text field type
     */
    TEXTFIELD = 6,
    /**
     * signature field type.
     */
    SIGNATURE = 7,
    /**
     * Generic XFA type.
     */
    XFA = 8,
    /**
     * XFA check box type.
     */
    XFA_CHECKBOX = 9,
    /**
     * XFA combo box type.
     */
    XFA_COMBOBOX = 10,
    /**
     * XFA image field type.
     */
    XFA_IMAGEFIELD = 11,
    /**
     * XFA list box type.
     */
    XFA_LISTBOX = 12,
    /**
     * XFA push button type.
     */
    XFA_PUSHBUTTON = 13,
    /**
     * XFA signture field type.
     */
    XFA_SIGNATURE = 14,
    /**
     * XFA text field type.
     */
    XFA_TEXTFIELD = 15
}
declare enum PdfAnnotationColorType {
    Color = 0,
    InteriorColor = 1
}
/**
 * Border style of pdf annotation
 *
 * @public
 */
declare enum PdfAnnotationBorderStyle {
    UNKNOWN = 0,
    SOLID = 1,
    DASHED = 2,
    BEVELED = 3,
    INSET = 4,
    UNDERLINE = 5,
    CLOUDY = 6
}
/**
 * Flag of pdf annotation
 *
 * @public
 */
declare enum PdfAnnotationFlags {
    NONE = 0,
    INVISIBLE = 1,
    HIDDEN = 2,
    PRINT = 4,
    NO_ZOOM = 8,
    NO_ROTATE = 16,
    NO_VIEW = 32,
    READ_ONLY = 64,
    LOCKED = 128,
    TOGGLE_NOVIEW = 256
}
/**
 * Flag of form field
 *
 * @public
 */
declare enum PDF_FORM_FIELD_FLAG {
    NONE = 0,
    READONLY = 1,
    REQUIRED = 2,
    NOEXPORT = 4,
    TEXT_MULTIPLINE = 4096,
    TEXT_PASSWORD = 8192,
    CHOICE_COMBO = 131072,
    CHOICE_EDIT = 262144,
    CHOICE_MULTL_SELECT = 2097152
}
/**
 * Type of pdf object
 *
 * @public
 */
declare enum PdfPageObjectType {
    UNKNOWN = 0,
    TEXT = 1,
    PATH = 2,
    IMAGE = 3,
    SHADING = 4,
    FORM = 5
}
/**
 * Options of pdf widget annotation
 *
 * @public
 */
interface PdfWidgetAnnoOption {
    label: string;
    isSelected: boolean;
}
type FlagMap = Partial<Record<Exclude<PdfAnnotationFlags, PdfAnnotationFlags.NONE>, PdfAnnotationFlagName>>;
type PdfAnnotationFlagName = 'invisible' | 'hidden' | 'print' | 'noZoom' | 'noRotate' | 'noView' | 'readOnly' | 'locked' | 'toggleNoView';
declare const PdfAnnotationFlagName: Readonly<FlagMap>;
/**
 * Convert the raw bit-mask coming from `FPDFAnnot_GetFlags()` into
 * an array of human-readable flag names (“invisible”, “print”…).
 */
declare function flagsToNames(raw: number): PdfAnnotationFlagName[];
/**
 * Convert an array of flag-names back into the numeric mask that
 * PDFium expects for `FPDFAnnot_SetFlags()`.
 */
declare function namesToFlags(names: readonly PdfAnnotationFlagName[]): PdfAnnotationFlags;
/**
 * Field of PDF widget annotation
 *
 * @public
 */
interface PdfWidgetAnnoField {
    /**
     * flag of field
     */
    flag: PDF_FORM_FIELD_FLAG;
    /**
     * name of field
     */
    name: string;
    /**
     * alternate name of field
     */
    alternateName: string;
    /**
     * type of field
     */
    type: PDF_FORM_FIELD_TYPE;
    /**
     * value of field
     */
    value: string;
    /**
     * whether field is checked
     */
    isChecked: boolean;
    /**
     * options of field
     */
    options: PdfWidgetAnnoOption[];
}
/**
 * PDF widget object
 *
 * @public
 */
interface PdfWidgetAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.WIDGET;
    /**
     * Field of pdf widget object
     */
    field: PdfWidgetAnnoField;
}
/**
 * Pdf file attachments annotation
 *
 * @public
 */
interface PdfFileAttachmentAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.FILEATTACHMENT;
}
/**
 * ink list in pdf ink annotation
 *
 * @public
 */
interface PdfInkListObject {
    points: Position[];
}
/**
 * Pdf ink annotation
 *
 * @public
 */
interface PdfInkAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.INK;
    /**
     * ink list of annotation
     */
    inkList: PdfInkListObject[];
    /**
     * color of ink annotation
     */
    color: string;
    /**
     * opacity of ink annotation
     */
    opacity: number;
    /**
     * stroke-width of ink annotation
     */
    strokeWidth: number;
}
/**
 * Pdf polygon annotation
 *
 * @public
 */
interface PdfPolygonAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.POLYGON;
    /**
     * vertices of annotation
     */
    vertices: Position[];
}
/**
 * PDF polyline annotation
 *
 * @public
 */
interface PdfPolylineAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.POLYLINE;
    /**
     * vertices of annotation
     */
    vertices: Position[];
}
/**
 * PDF line annotation
 *
 * @public
 */
interface PdfLineAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.LINE;
    /**
     * start point of line
     */
    startPoint: Position;
    /**
     * end point of line
     */
    endPoint: Position;
}
/**
 * PDF highlight annotation
 *
 * @public
 */
interface PdfHighlightAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.HIGHLIGHT;
    /**
     * Text contents of the highlight annotation
     */
    contents?: string;
    /**
     * color of highlight annotation
     */
    color: string;
    /**
     * opacity of highlight annotation
     */
    opacity: number;
    /**
     * quads of highlight area
     */
    segmentRects: Rect[];
}
/**
 * Matrix for transformation, in the form [a b c d e f], equivalent to:
 * | a  b  0 |
 * | c  d  0 |
 * | e  f  1 |
 *
 * Translation is performed with [1 0 0 1 tx ty].
 * Scaling is performed with [sx 0 0 sy 0 0].
 * See PDF Reference 1.7, 4.2.2 Common Transformations for more.
 */
interface PdfTransformMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}
/**
 * type of segment type in pdf path object
 *
 * @public
 */
declare enum PdfSegmentObjectType {
    UNKNOWN = -1,
    LINETO = 0,
    BEZIERTO = 1,
    MOVETO = 2
}
/**
 * segment of path object
 *
 * @public
 */
interface PdfSegmentObject {
    type: PdfSegmentObjectType;
    /**
     * point of the segment
     */
    point: Position;
    /**
     * whether this segment close the path
     */
    isClosed: boolean;
}
/**
 * Pdf path object
 *
 * @public
 */
interface PdfPathObject {
    type: PdfPageObjectType.PATH;
    /**
     * bound that contains the path
     */
    bounds: {
        left: number;
        bottom: number;
        right: number;
        top: number;
    };
    /**
     * segments of the path
     */
    segments: PdfSegmentObject[];
    /**
     * transform matrix
     */
    matrix: PdfTransformMatrix;
}
/**
 * Pdf image object
 *
 * @public
 */
interface PdfImageObject {
    type: PdfPageObjectType.IMAGE;
    /**
     * data of the image
     */
    imageData: ImageData;
    /**
     * transform matrix
     */
    matrix: PdfTransformMatrix;
}
/**
 * Pdf form object
 *
 * @public
 */
interface PdfFormObject {
    type: PdfPageObjectType.FORM;
    /**
     * objects that in this form object
     */
    objects: (PdfImageObject | PdfPathObject | PdfFormObject)[];
    /**
     * transform matrix
     */
    matrix: PdfTransformMatrix;
}
/**
 * Contents type of pdf stamp annotation
 *
 * @public
 */
type PdfStampAnnoObjectContents = Array<PdfPathObject | PdfImageObject | PdfFormObject>;
/**
 * Pdf stamp annotation
 *
 * @public
 */
interface PdfStampAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.STAMP;
    /**
     * contents in this stamp annotation
     */
    contents: PdfStampAnnoObjectContents;
}
/**
 * Pdf circle annotation
 *
 * @public
 */
interface PdfCircleAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.CIRCLE;
    /**
     * flags of circle annotation
     */
    flags: PdfAnnotationFlagName[];
    /**
     * color of circle annotation
     */
    color: string;
    /**
     * opacity of circle annotation
     */
    opacity: number;
    /**
     * stroke-width of circle annotation
     */
    strokeWidth: number;
    /**
     * stroke color of circle annotation
     */
    strokeColor: string;
    /**
     * stroke style of circle annotation
     */
    strokeStyle: PdfAnnotationBorderStyle;
    /**
     * stroke dash array of circle annotation
     */
    strokeDashArray?: number[];
    /**
     * cloudy border intensity of circle annotation
     */
    cloudyBorderIntensity?: number;
    /**
     * cloudy border inset of circle annotation
     */
    cloudyBorderInset?: number[];
}
/**
 * Pdf square annotation
 *
 * @public
 */
interface PdfSquareAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.SQUARE;
    /**
     * flags of square annotation
     */
    flags: PdfAnnotationFlagName[];
    /**
     * color of square annotation
     */
    color: string;
    /**
     * opacity of square annotation
     */
    opacity: number;
    /**
     * stroke-width of square annotation
     */
    strokeWidth: number;
    /**
     * stroke color of square annotation
     */
    strokeColor: string;
    /**
     * stroke style of square annotation
     */
    strokeStyle: PdfAnnotationBorderStyle;
    /**
     * stroke dash array of square annotation
     */
    strokeDashArray?: number[];
    /**
     * cloudy border intensity of circle annotation
     */
    cloudyBorderIntensity?: number;
    /**
     * cloudy border inset of circle annotation
     */
    cloudyBorderInset?: number[];
}
/**
 * Pdf squiggly annotation
 *
 * @public
 */
interface PdfSquigglyAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.SQUIGGLY;
    /**
     * Text contents of the highlight annotation
     */
    contents?: string;
    /**
     * color of strike out annotation
     */
    color: string;
    /**
     * opacity of strike out annotation
     */
    opacity: number;
    /**
     * quads of highlight area
     */
    segmentRects: Rect[];
}
/**
 * Pdf underline annotation
 *
 * @public
 */
interface PdfUnderlineAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.UNDERLINE;
    /**
     * Text contents of the highlight annotation
     */
    contents?: string;
    /**
     * color of strike out annotation
     */
    color: string;
    /**
     * opacity of strike out annotation
     */
    opacity: number;
    /**
     * quads of highlight area
     */
    segmentRects: Rect[];
}
/**
 * Pdf strike out annotation
 *
 * @public
 */
interface PdfStrikeOutAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.STRIKEOUT;
    /**
     * Text contents of the strike out annotation
     */
    contents?: string;
    /**
     * color of strike out annotation
     */
    color: string;
    /**
     * opacity of strike out annotation
     */
    opacity: number;
    /**
     * quads of highlight area
     */
    segmentRects: Rect[];
}
/**
 * Pdf caret annotation
 *
 * @public
 */
interface PdfCaretAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.CARET;
}
/**
 * Pdf free text annotation
 *
 * @public
 */
interface PdfFreeTextAnnoObject extends PdfAnnotationObjectBase {
    /** {@inheritDoc PdfAnnotationObjectBase.type} */
    type: PdfAnnotationSubtype.FREETEXT;
    contents: string;
    richContent?: string;
}
/**
 * All annotation that support
 *
 * @public
 */
type PdfSupportedAnnoObject = PdfInkAnnoObject | PdfTextAnnoObject | PdfLinkAnnoObject | PdfPolygonAnnoObject | PdfPolylineAnnoObject | PdfHighlightAnnoObject | PdfLineAnnoObject | PdfWidgetAnnoObject | PdfFileAttachmentAnnoObject | PdfStampAnnoObject | PdfSquareAnnoObject | PdfCircleAnnoObject | PdfSquigglyAnnoObject | PdfUnderlineAnnoObject | PdfStrikeOutAnnoObject | PdfCaretAnnoObject | PdfFreeTextAnnoObject;
/**
 * Pdf annotation that does not support
 *
 * @public
 */
interface PdfUnsupportedAnnoObject extends PdfAnnotationObjectBase {
    type: Exclude<PdfAnnotationSubtype, PdfSupportedAnnoObject['type']>;
}
/**
 * all annotations
 *
 * @public
 */
type PdfAnnotationObject = PdfSupportedAnnoObject | PdfUnsupportedAnnoObject;
/**
 * Pdf attachment
 *
 * @public
 */
interface PdfAttachmentObject {
    index: number;
    name: string;
    creationDate: string;
    checksum: string;
}
/**
 * Pdf engine features
 *
 * @public
 */
declare enum PdfEngineFeature {
    RenderPage = 0,
    RenderPageRect = 1,
    Thumbnails = 2,
    Bookmarks = 3,
    Annotations = 4
}
/**
 * All operations for this engine
 *
 * @public
 */
declare enum PdfEngineOperation {
    Create = 0,
    Read = 1,
    Update = 2,
    Delete = 3
}
/**
 * flags to match the text during searching
 *
 * @public
 */
declare enum MatchFlag {
    None = 0,
    MatchCase = 1,
    MatchWholeWord = 2,
    MatchConsecutive = 4
}
/**
 * Union all the flags
 * @param flags - all the flags
 * @returns union of flags
 *
 * @public
 */
declare function unionFlags(flags: MatchFlag[]): MatchFlag;
/**
 * Image conversion types
 *
 * @public
 */
type ImageConversionTypes = 'image/webp' | 'image/png' | 'image/jpeg';
/**
 * Targe for searching
 *
 * @public
 */
interface SearchTarget {
    keyword: string;
    flags: MatchFlag[];
}
/**
 * compare 2 search target
 * @param targetA - first target for search
 * @param targetB - second target for search
 * @returns whether 2 search target are the same
 *
 * @public
 */
declare function compareSearchTarget(targetA: SearchTarget, targetB: SearchTarget): boolean;
/** Context of one hit */
interface TextContext {
    /** Complete words that come *before* the hit (no ellipsis)            */
    before: string;
    /** Exactly the text that matched (case-preserved)                      */
    match: string;
    /** Complete words that come *after* the hit (no ellipsis)             */
    after: string;
    /** `true` ⇢ there were more words on the left that we cut off         */
    truncatedLeft: boolean;
    /** `true` ⇢ there were more words on the right that we cut off        */
    truncatedRight: boolean;
}
/**
 * Text slice
 *
 * @public
 */
interface PageTextSlice {
    /**
     * Index of the pdf page
     */
    pageIndex: number;
    /**
     * Index of the first character
     */
    charIndex: number;
    /**
     * Count of the characters
     */
    charCount: number;
}
/**
 * search result
 *
 * @public
 */
interface SearchResult {
    /**
     * Index of the pdf page
     */
    pageIndex: number;
    /**
     * index of the first character
     */
    charIndex: number;
    /**
     * count of the characters
     */
    charCount: number;
    /**
     * highlight rects
     */
    rects: Rect[];
    /**
     * context of the hit
     */
    context: TextContext;
}
/**
 * Results of searching through the entire document
 */
interface SearchAllPagesResult {
    /**
     * Array of all search results across all pages
     */
    results: SearchResult[];
    /**
     * Total number of results found
     */
    total: number;
}
/**
 * Glyph object
 *
 * @public
 */
interface PdfGlyphObject {
    /**
     * Origin of the glyph
     */
    origin: {
        x: number;
        y: number;
    };
    /**
     * Size of the glyph
     */
    size: {
        width: number;
        height: number;
    };
    /**
     * Whether the glyph is a space
     */
    isSpace?: boolean;
    /**
     * Whether the glyph is a empty
     */
    isEmpty?: boolean;
}
/**
 * Glyph object
 *
 * @public
 */
interface PdfGlyphSlim {
    /**
     * X coordinate of the glyph
     */
    x: number;
    /**
     * Y coordinate of the glyph
     */
    y: number;
    /**
     * Width of the glyph
     */
    width: number;
    /**
     * Height of the glyph
     */
    height: number;
    /**
     * Flags of the glyph
     */
    flags: number;
}
/**
 * Run object
 *
 * @public
 */
interface PdfRun {
    /**
     * Rectangle of the run
     */
    rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * Start index of the run
     */
    charStart: number;
    /**
     * Glyphs of the run
     */
    glyphs: PdfGlyphSlim[];
}
/**
 * Page geometry
 *
 * @public
 */
interface PdfPageGeometry {
    /**
     * Runs of the page
     */
    runs: PdfRun[];
}
/**
 * form field value
 * @public
 */
type FormFieldValue = {
    kind: 'text';
    text: string;
} | {
    kind: 'selection';
    index: number;
    isSelected: boolean;
} | {
    kind: 'checked';
    isChecked: boolean;
};
/**
 * Transformation that will be applied to annotation
 *
 * @public
 */
interface PdfAnnotationTransformation {
    /**
     * Translated offset
     */
    offset: Position;
    /**
     * Scaled factors
     */
    scale: Size;
}
/**
 * Render options
 *
 * @public
 */
interface PdfRenderOptions {
    /**
     * Whether needs to render the page with annotations
     */
    withAnnotations: boolean;
}
/**
 * source can be byte array contains pdf content
 *
 * @public
 */
type PdfFileContent = ArrayBuffer;
declare enum PdfPermission {
    PrintDocument = 8,
    ModifyContent = 16,
    CopyOrExtract = 32,
    AddOrModifyTextAnnot = 64,
    FillInExistingForm = 512,
    ExtractTextOrGraphics = 1024,
    AssembleDocument = 2048,
    PrintHighQuality = 4096
}
declare enum PdfPageFlattenFlag {
    Display = 0,
    Print = 1
}
declare enum PdfPageFlattenResult {
    Fail = 0,
    Success = 1,
    NothingToDo = 2
}
/**
 * Pdf File without content
 *
 * @public
 */
interface PdfFileWithoutContent {
    /**
     * id of file
     */
    id: string;
}
interface PdfFileLoader extends PdfFileWithoutContent {
    /**
     * length of file
     */
    fileLength: number;
    /**
     * read block of file
     * @param offset - offset of file
     * @param length - length of file
     * @returns block of file
     */
    callback: (offset: number, length: number) => Uint8Array;
}
/**
 * Pdf File
 *
 * @public
 */
interface PdfFile extends PdfFileWithoutContent {
    /**
     * content of file
     */
    content: PdfFileContent;
}
interface PdfFileUrl extends PdfFileWithoutContent {
    url: string;
}
interface PdfUrlOptions {
    mode?: 'auto' | 'range-request' | 'full-fetch';
    password?: string;
}
declare enum PdfErrorCode {
    Ok = 0,//  #define FPDF_ERR_SUCCESS 0    // No error.
    Unknown = 1,// #define FPDF_ERR_UNKNOWN 1    // Unknown error.
    NotFound = 2,// #define FPDF_ERR_FILE 2       // File not found or could not be opened.
    WrongFormat = 3,// #define FPDF_ERR_FORMAT 3     // File not in PDF format or corrupted.
    Password = 4,// #define FPDF_ERR_PASSWORD 4   // Password required or incorrect password.
    Security = 5,// #define FPDF_ERR_SECURITY 5   // Unsupported security scheme.
    PageError = 6,// #define FPDF_ERR_PAGE 6       // Page not found or content error.
    XFALoad = 7,// #ifdef PDF_ENABLE_XFA
    XFALayout = 8,//
    Cancelled = 9,
    Initialization = 10,
    NotReady = 11,
    NotSupport = 12,
    LoadDoc = 13,
    DocNotOpen = 14,
    CantCloseDoc = 15,
    CantCreateNewDoc = 16,
    CantImportPages = 17,
    CantCreateAnnot = 18,
    CantSetAnnotRect = 19,
    CantSetAnnotContent = 20,
    CantRemoveInkList = 21,
    CantAddInkStoke = 22,
    CantReadAttachmentSize = 23,
    CantReadAttachmentContent = 24,
    CantFocusAnnot = 25,
    CantSelectText = 26,
    CantSelectOption = 27,
    CantCheckField = 28
}
interface PdfErrorReason {
    code: PdfErrorCode;
    message: string;
}
type PdfEngineError = TaskError<PdfErrorReason>;
type PdfTask<R> = Task<R, PdfErrorReason>;
declare class PdfTaskHelper {
    /**
     * Create a task
     * @returns new task
     */
    static create<R>(): Task<R, PdfErrorReason>;
    /**
     * Create a task that has been resolved with value
     * @param result - resolved value
     * @returns resolved task
     */
    static resolve<R>(result: R): Task<R, PdfErrorReason>;
    /**
     * Create a task that has been rejected with error
     * @param reason - rejected error
     * @returns rejected task
     */
    static reject<T = any>(reason: PdfErrorReason): Task<T, PdfErrorReason>;
    /**
     * Create a task that has been aborted with error
     * @param reason - aborted error
     * @returns aborted task
     */
    static abort<T = any>(reason: PdfErrorReason): Task<T, PdfErrorReason>;
}
/**
 * Pdf engine
 *
 * @public
 */
interface PdfEngine<T = Blob> {
    /**
     * Check whether pdf engine supports this feature
     * @param feature - which feature want to check
     * @returns support or not
     */
    isSupport?: (feature: PdfEngineFeature) => PdfTask<PdfEngineOperation[]>;
    /**
     * Initialize the engine
     * @returns task that indicate whether initialization is successful
     */
    initialize?: () => PdfTask<boolean>;
    /**
     * Destroy the engine
     * @returns task that indicate whether destroy is successful
     */
    destroy?: () => PdfTask<boolean>;
    /**
     * Open a PDF from a URL with specified mode
     * @param url - The PDF file URL
     * @param options - Additional options including mode (auto, range-request, full-fetch) and password
     * @returns Task that resolves with the PdfDocumentObject or an error
     */
    openDocumentUrl: (file: PdfFileUrl, options?: PdfUrlOptions) => PdfTask<PdfDocumentObject>;
    /**
     * Open pdf document from buffer
     * @param file - pdf file
     * @param password - protected password for this file
     * @returns task that contains the file or error
     */
    openDocumentFromBuffer: (file: PdfFile, password: string) => PdfTask<PdfDocumentObject>;
    /**
     * Open pdf document from loader
     * @param file - pdf file
     * @param password - protected password for this file
     * @returns task that contains the file or error
     */
    openDocumentFromLoader: (file: PdfFileLoader, password: string) => PdfTask<PdfDocumentObject>;
    /**
     * Get the metadata of the file
     * @param doc - pdf document
     * @returns task that contains the metadata or error
     */
    getMetadata: (doc: PdfDocumentObject) => PdfTask<PdfMetadataObject>;
    /**
     * Get permissions of the file
     * @param doc - pdf document
     * @returns task that contains a 32-bit integer indicating permission flags
     */
    getDocPermissions: (doc: PdfDocumentObject) => PdfTask<number>;
    /**
     * Get the user permissions of the file
     * @param doc - pdf document
     * @returns task that contains a 32-bit integer indicating permission flags
     */
    getDocUserPermissions: (doc: PdfDocumentObject) => PdfTask<number>;
    /**
     * Get the signatures of the file
     * @param doc - pdf document
     * @returns task that contains the signatures or error
     */
    getSignatures: (doc: PdfDocumentObject) => PdfTask<PdfSignatureObject[]>;
    /**
     * Get the bookmarks of the file
     * @param doc - pdf document
     * @returns task that contains the bookmarks or error
     */
    getBookmarks: (doc: PdfDocumentObject) => PdfTask<PdfBookmarksObject>;
    /**
     * Render the specified pdf page
     * @param doc - pdf document
     * @param page - pdf page
     * @param scaleFactor - factor of scaling
     * @param rotation - rotated angle
     * @param dpr - devicePixelRatio
     * @param options - render options
     * @returns task contains the rendered image or error
     */
    renderPage: (doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation, dpr: number, options: PdfRenderOptions, imageType?: ImageConversionTypes) => PdfTask<T>;
    /**
     * Render the specified rect of pdf page
     * @param doc - pdf document
     * @param page - pdf page
     * @param scaleFactor - factor of scaling
     * @param rotation - rotated angle
     * @param dpr - devicePixelRatio
     * @param rect - target rect
     * @param options - render options
     * @returns task contains the rendered image or error
     */
    renderPageRect: (doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation, dpr: number, rect: Rect, options: PdfRenderOptions, imageType?: ImageConversionTypes) => PdfTask<T>;
    /**
     * Render a single annotation into an ImageData blob.
     *
     * Note:  • honours Display-Matrix, page rotation & DPR
     *        • you decide whether to include the page background
     * @param doc - pdf document
     * @param page - pdf page
     * @param annotation - the annotation to render
     * @param scaleFactor - factor of scaling
     * @param rotation - rotated angle
     * @param dpr - devicePixelRatio
     * @param mode - appearance mode
     */
    renderAnnotation(doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject, scaleFactor: number, rotation: Rotation, dpr: number, mode: AppearanceMode, imageType: ImageConversionTypes): PdfTask<T>;
    /**
     * Get annotations of pdf page
     * @param doc - pdf document
     * @param page - pdf page
     * @param scaleFactor - factor of scaling
     * @param rotation - rotated angle
     * @returns task contains the annotations or error
     */
    getPageAnnotations: (doc: PdfDocumentObject, page: PdfPageObject) => PdfTask<PdfAnnotationObject[]>;
    /**
     * Change the visible colour (and opacity) of an existing annotation.
     * @param doc - pdf document
     * @param page - pdf page
     * @param annotation - the annotation to recolour
     * @param colour - RGBA color values (0-255 per channel)
     * @param which - 0 = stroke/fill colour (PDFium's "colourType" param)
     * @returns task that indicates whether the operation succeeded
     */
    updateAnnotationColor: (doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObjectBase, color: WebAlphaColor, which?: number) => PdfTask<boolean>;
    /**
     * Create a annotation on specified page
     * @param doc - pdf document
     * @param page - pdf page
     * @param annotation - new annotations
     * @returns task whether the annotations is created successfully
     */
    createPageAnnotation: (doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject) => PdfTask<number>;
    /**
     * Update a annotation on specified page
     * @param doc - pdf document
     * @param page - pdf page
     * @param annotation - new annotations
     * @returns task that indicates whether the operation succeeded
     */
    updatePageAnnotation: (doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject) => PdfTask<boolean>;
    /**
     * Remove a annotation on specified page
     * @param doc - pdf document
     * @param page - pdf page
     * @param annotation - new annotations
     * @returns task whether the annotations is removed successfully
     */
    removePageAnnotation: (doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfAnnotationObject) => PdfTask<boolean>;
    /**
     * get all text rects in pdf page
     * @param doc - pdf document
     * @param page - pdf page
     * @param scaleFactor - factor of scaling
     * @param rotation - rotated angle
     * @returns task contains the text rects or error
     */
    getPageTextRects: (doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation) => PdfTask<PdfTextRectObject[]>;
    /**
     * Render the thumbnail of specified pdf page
     * @param doc - pdf document
     * @param page - pdf page
     * @param scaleFactor - factor of scaling
     * @param rotation - rotated angle
     * @param dpr - devicePixelRatio
     * @param options - render options
     * @returns task contains the rendered image or error
     */
    renderThumbnail: (doc: PdfDocumentObject, page: PdfPageObject, scaleFactor: number, rotation: Rotation, dpr: number) => PdfTask<T>;
    /**
     * Search across all pages in the document
     * @param doc - pdf document
     * @param keyword - search keyword
     * @param flags - match flags for search
     * @returns Task contains all search results throughout the document
     */
    searchAllPages: (doc: PdfDocumentObject, keyword: string, flags?: MatchFlag[]) => PdfTask<SearchAllPagesResult>;
    /**
     * Get all annotations in this file
     * @param doc - pdf document
     * @returns task that contains the annotations or error
     */
    getAllAnnotations: (doc: PdfDocumentObject) => PdfTask<Record<number, PdfAnnotationObject[]>>;
    /**
     * Get all attachments in this file
     * @param doc - pdf document
     * @returns task that contains the attachments or error
     */
    getAttachments: (doc: PdfDocumentObject) => PdfTask<PdfAttachmentObject[]>;
    /**
     * Read content of pdf attachment
     * @param doc - pdf document
     * @param attachment - pdf attachments
     * @returns task that contains the content of specified attachment or error
     */
    readAttachmentContent: (doc: PdfDocumentObject, attachment: PdfAttachmentObject) => PdfTask<ArrayBuffer>;
    /**
     * Set form field value
     * @param doc - pdf document
     * @param page - pdf page
     * @param annotation - pdf annotation
     * @param text - text value
     */
    setFormFieldValue: (doc: PdfDocumentObject, page: PdfPageObject, annotation: PdfWidgetAnnoObject, value: FormFieldValue) => PdfTask<boolean>;
    /**
     * Flatten annotations and form fields into the page contents.
     * @param doc - pdf document
     * @param page - pdf page
     * @param flag - flatten flag
     */
    flattenPage: (doc: PdfDocumentObject, page: PdfPageObject, flag: PdfPageFlattenFlag) => PdfTask<PdfPageFlattenResult>;
    /**
     * Extract pdf pages to a new file
     * @param doc - pdf document
     * @param pageIndexes - indexes of pdf pages
     * @returns task contains the new pdf file content
     */
    extractPages: (doc: PdfDocumentObject, pageIndexes: number[]) => PdfTask<ArrayBuffer>;
    /**
     * Extract text on specified pdf pages
     * @param doc - pdf document
     * @param pageIndexes - indexes of pdf pages
     * @returns task contains the text
     */
    extractText: (doc: PdfDocumentObject, pageIndexes: number[]) => PdfTask<string>;
    /**
     * Extract text on specified pdf pages
     * @param doc - pdf document
     * @param pageIndexes - indexes of pdf pages
     * @returns task contains the text
     */
    getTextSlices: (doc: PdfDocumentObject, slices: PageTextSlice[]) => PdfTask<string[]>;
    /**
     * Get all glyphs in the specified pdf page
     * @param doc - pdf document
     * @param page - pdf page
     * @returns task contains the glyphs
     */
    getPageGlyphs: (doc: PdfDocumentObject, page: PdfPageObject) => PdfTask<PdfGlyphObject[]>;
    /**
     * Get the geometry of the specified pdf page
     * @param doc - pdf document
     * @param page - pdf page
     * @returns task contains the geometry
     */
    getPageGeometry: (doc: PdfDocumentObject, page: PdfPageObject) => PdfTask<PdfPageGeometry>;
    /**
     * Merge multiple pdf documents
     * @param files - all the pdf files
     * @returns task contains the merged pdf file
     */
    merge: (files: PdfFile[]) => PdfTask<PdfFile>;
    /**
     * Merge specific pages from multiple PDF documents in a custom order
     * @param mergeConfigs Array of configurations specifying which pages to merge from which documents
     * @returns A PdfTask that resolves with the merged PDF file
     * @public
     */
    mergePages: (mergeConfigs: Array<{
        docId: string;
        pageIndices: number[];
    }>) => PdfTask<PdfFile>;
    /**
     * Save a copy of pdf document
     * @param doc - pdf document
     * @returns task contains the new pdf file content
     */
    saveAsCopy: (doc: PdfDocumentObject) => PdfTask<ArrayBuffer>;
    /**
     * Close pdf document
     * @param doc - pdf document
     * @returns task that file is closed or not
     */
    closeDocument: (doc: PdfDocumentObject) => PdfTask<boolean>;
}
/**
 * Method name of PdfEngine interface
 *
 * @public
 */
type PdfEngineMethodName = keyof Required<PdfEngine>;
/**
 * Arguments of PdfEngine method
 *
 * @public
 */
type PdfEngineMethodArgs<P extends PdfEngineMethodName> = Readonly<Parameters<Required<PdfEngine>[P]>>;
/**
 * Return type of PdfEngine method
 *
 * @public
 */
type PdfEngineMethodReturnType<P extends PdfEngineMethodName> = ReturnType<Required<PdfEngine>[P]>;

/**
 * Parse a PDF date string **D:YYYYMMDDHHmmSSOHH'mm'** to ISO-8601.
 *
 * Returns `undefined` if the input is malformed.
 *
 * @public
 */
declare function pdfDateToDate(pdf?: string): Date | undefined;
/**
 * Convert a date to a PDF date string
 * @param date - date to convert
 * @returns PDF date string
 *
 * @public
 */
declare function dateToPdfDate(date?: Date): string;

/**
 * Library contains the common definitions of data types and logic
 *
 * @remarks
 * The `@embedpdf/models` defines the interface and classes which are used to
 * handling PDF files.
 *
 * @packageDocumentation
 */

/**
 * ignore will do nothing when called.
 *
 * @public
 */
declare function ignore(): void;

export { AllLogger, AppearanceMode, type Box, ConsoleLogger, type FormFieldValue, type ImageConversionTypes, LevelLogger, LogLevel, type Logger, MatchFlag, type Matrix, MixedBlendMode, NoopLogger, PDF_FORM_FIELD_FLAG, PDF_FORM_FIELD_TYPE, type PageTextSlice, type PdfActionObject, PdfActionType, type PdfAlphaColor, PdfAnnotationBorderStyle, PdfAnnotationColorType, PdfAnnotationFlagName, PdfAnnotationFlags, type PdfAnnotationObject, type PdfAnnotationObjectBase, PdfAnnotationObjectStatus, PdfAnnotationState, PdfAnnotationStateModel, PdfAnnotationSubtype, PdfAnnotationSubtypeName, type PdfAnnotationTransformation, type PdfAttachmentObject, PdfBlendMode, PdfBomOrZwnbsp, type PdfBookmarkObject, type PdfBookmarksObject, type PdfCaretAnnoObject, type PdfCircleAnnoObject, type PdfDestinationObject, type PdfDocumentObject, type PdfEngine, type PdfEngineError, PdfEngineFeature, type PdfEngineMethodArgs, type PdfEngineMethodName, type PdfEngineMethodReturnType, PdfEngineOperation, PdfErrorCode, type PdfErrorReason, type PdfFile, type PdfFileAttachmentAnnoObject, type PdfFileContent, type PdfFileLoader, type PdfFileUrl, type PdfFileWithoutContent, type PdfFormObject, type PdfFreeTextAnnoObject, type PdfGlyphObject, type PdfGlyphSlim, type PdfHighlightAnnoObject, type PdfImage, type PdfImageObject, type PdfInkAnnoObject, type PdfInkListObject, type PdfLineAnnoObject, type PdfLinkAnnoObject, type PdfLinkTarget, type PdfMetadataObject, PdfNonCharacterFFFE, PdfNonCharacterFFFF, PdfPageFlattenFlag, PdfPageFlattenResult, type PdfPageGeometry, type PdfPageObject, PdfPageObjectType, type PdfPageObjectWithRotatedSize, type PdfPathObject, PdfPermission, type PdfPolygonAnnoObject, type PdfPolylineAnnoObject, type PdfPopupAnnoObject, type PdfRenderOptions, type PdfRun, type PdfSegmentObject, PdfSegmentObjectType, type PdfSignatureObject, PdfSoftHyphenMarker, type PdfSquareAnnoObject, type PdfSquigglyAnnoObject, type PdfStampAnnoObject, type PdfStampAnnoObjectContents, type PdfStrikeOutAnnoObject, type PdfSupportedAnnoObject, type PdfTask, PdfTaskHelper, type PdfTextAnnoObject, type PdfTextRectObject, type PdfTransformMatrix, type PdfUnderlineAnnoObject, type PdfUnsupportedAnnoObject, PdfUnwantedTextMarkers, PdfUnwantedTextRegex, type PdfUrlOptions, type PdfWidgetAnnoField, type PdfWidgetAnnoObject, type PdfWidgetAnnoOption, PdfWordJoiner, PdfZeroWidthSpace, PdfZoomMode, PerfLogger, type Position, type Quad, type Rect, type RejectedCallback, type ResolvedCallback, Rotation, type SearchAllPagesResult, type SearchResult, type SearchTarget, type Size, Task, TaskAbortedError, type TaskError, TaskRejectedError, type TaskReturn, type TaskSettledResult, TaskStage, type TaskState, type TextContext, type UiBlendModeValue, type WebAlphaColor, blendModeLabel, blendModeSelectOptions, blendModeToCss, boundingRect, calculateAngle, calculateDegree, compareSearchTarget, cssToBlendMode, dateToPdfDate, flagsToNames, getBlendModeInfo, ignore, makeMatrix, namesToFlags, pdfAlphaColorToWebAlphaColor, pdfDateToDate, quadToRect, rectToQuad, reduceBlendModes, restoreOffset, restorePosition, restoreRect, rotatePosition, rotateRect, scalePosition, scaleRect, stripPdfUnwantedMarkers, swap, toIntPos, toIntRect, toIntSize, transformPosition, transformRect, transformSize, uiBlendModeDisplay, unionFlags, webAlphaColorToPdfAlphaColor };
