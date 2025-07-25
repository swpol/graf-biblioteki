import { BasePluginConfig, EventHook, Action, BasePlugin, PluginRegistry, PluginManifest, PluginPackage } from '@embedpdf/core';
import { WebAlphaColor, PdfAnnotationSubtype, PdfBlendMode, Task, PdfAnnotationObject, PdfErrorReason, Rotation, AppearanceMode, ImageConversionTypes, PdfEngine } from '@embedpdf/models';

type CommitState = 'new' | 'dirty' | 'deleted' | 'synced' | 'ignored';
interface TrackedAnnotation {
    /** A stable, client-side unique identifier for history and state management. */
    localId: number;
    /**
     * If the engine has already created the annotation in the PDF
     * this is the definitive id coming from the engine.
     * It is **never** cleared once set.
     */
    pdfId?: number;
    /** local commit bookkeeping */
    commitState: CommitState;
    /** the actual annotation object */
    object: PdfAnnotationObject;
}
interface RenderAnnotationOptions {
    pageIndex: number;
    annotation: PdfAnnotationObject;
    scaleFactor?: number;
    rotation?: Rotation;
    dpr?: number;
    mode?: AppearanceMode;
    imageType?: ImageConversionTypes;
}
interface BaseAnnotationDefaults extends WebAlphaColor {
    name: string;
    subtype: PdfAnnotationSubtype;
    interaction: {
        mode: string;
        exclusive: boolean;
        cursor?: string;
    };
    textSelection?: boolean;
    blendMode?: PdfBlendMode;
}
type TextMarkupSubtype = PdfAnnotationSubtype.HIGHLIGHT | PdfAnnotationSubtype.UNDERLINE | PdfAnnotationSubtype.STRIKEOUT | PdfAnnotationSubtype.SQUIGGLY;
interface TextMarkupDefaults extends BaseAnnotationDefaults {
    subtype: TextMarkupSubtype;
    blendMode: PdfBlendMode;
}
interface InkDefaults extends BaseAnnotationDefaults {
    subtype: PdfAnnotationSubtype.INK;
    strokeWidth: number;
    intent?: string;
}
interface TextDefaults extends BaseAnnotationDefaults {
    subtype: PdfAnnotationSubtype.FREETEXT;
    fontSize: number;
}
type AnnotationDefaults = TextMarkupDefaults | InkDefaults | TextDefaults;
type ToolDefaultsByMode = {
    [K in string]: AnnotationDefaults;
};
type ActiveTool = {
    variantKey: null;
    defaults: null;
} | {
    [K in string]: {
        variantKey: K;
        defaults: ToolDefaultsByMode[K];
    };
}[string];
interface AnnotationState {
    pages: Record<number, string[]>;
    byUid: Record<string, TrackedAnnotation>;
    selectedUid: string | null;
    activeVariant: string | null;
    toolDefaults: Record<string, AnnotationDefaults>;
    colorPresets: string[];
    hasPendingChanges: boolean;
}
interface AnnotationPluginConfig extends BasePluginConfig {
    toolDefaults?: Record<string, AnnotationDefaults>;
    colorPresets?: string[];
    /**
     * When `false` mutations are kept in memory and must be
     * flushed with `commitPendingChanges()`.
     */
    autoCommit?: boolean;
}
interface AnnotationCapability {
    getPageAnnotations: (options: GetPageAnnotationsOptions) => Task<PdfAnnotationObject[], PdfErrorReason>;
    getSelectedAnnotation: () => TrackedAnnotation | null;
    selectAnnotation: (pageIndex: number, annotationId: number) => void;
    deselectAnnotation: () => void;
    getActiveVariant: () => string | null;
    setActiveVariant: (variantKey: string | null) => void;
    /** strongly typed – only sub-types we have defaults for */
    getToolDefaults: (variantKey: string) => AnnotationDefaults;
    getToolDefaultsBySubtypeAndIntent: (subtype: PdfAnnotationSubtype, intent?: string) => AnnotationDefaults;
    getToolDefaultsBySubtype: (subtype: PdfAnnotationSubtype) => AnnotationDefaults;
    /** Partially patch a single tool’s defaults */
    setToolDefaults: (variantKey: string, patch: Partial<AnnotationDefaults>) => void;
    /** current palette – UI just reads this */
    getColorPresets: () => string[];
    /** append a swatch (deduped by RGBA) */
    addColorPreset: (color: string) => void;
    createAnnotation: (pageIndex: number, annotation: PdfAnnotationObject) => void;
    updateAnnotation: (pageIndex: number, annotationId: number, patch: Partial<PdfAnnotationObject>) => void;
    deleteAnnotation: (pageIndex: number, annotationId: number) => void;
    renderAnnotation: (options: RenderAnnotationOptions) => Task<Blob, PdfErrorReason>;
    /** undo / redo */
    onStateChange: EventHook<AnnotationState>;
    onActiveVariantChange: EventHook<string | null>;
    onActiveToolChange: EventHook<ActiveTool>;
    commit: () => void;
}
interface SelectedAnnotation {
    pageIndex: number;
    localId: number;
    annotation: PdfAnnotationObject;
}
interface GetPageAnnotationsOptions {
    pageIndex: number;
}
interface UpdateAnnotationColorOptions extends WebAlphaColor {
    pageIndex: number;
    annotationId: number;
}

declare const SET_ANNOTATIONS = "ANNOTATION/SET_ANNOTATIONS";
declare const REINDEX_PAGE_ANNOTATIONS = "ANNOTATION/REINDEX_PAGE";
declare const SELECT_ANNOTATION = "ANNOTATION/SELECT_ANNOTATION";
declare const DESELECT_ANNOTATION = "ANNOTATION/DESELECT_ANNOTATION";
declare const UPDATE_TOOL_DEFAULTS = "ANNOTATION/UPDATE_TOOL_DEFAULTS";
declare const ADD_COLOR_PRESET = "ANNOTATION/ADD_COLOR_PRESET";
declare const CREATE_ANNOTATION = "ANNOTATION/CREATE_ANNOTATION";
declare const PATCH_ANNOTATION = "ANNOTATION/PATCH_ANNOTATION";
declare const DELETE_ANNOTATION = "ANNOTATION/DELETE_ANNOTATION";
declare const COMMIT_PENDING_CHANGES = "ANNOTATION/COMMIT";
declare const STORE_PDF_ID = "ANNOTATION/STORE_PDF_ID";
declare const PURGE_ANNOTATION = "ANNOTATION/PURGE_ANNOTATION";
declare const SET_ACTIVE_VARIANT = "ANNOTATION/SET_ACTIVE_VARIANT";
interface SetAnnotationsAction extends Action {
    type: typeof SET_ANNOTATIONS;
    payload: Record<number, PdfAnnotationObject[]>;
}
interface ReindexPageAnnotationsAction extends Action {
    type: typeof REINDEX_PAGE_ANNOTATIONS;
    payload: {
        pageIndex: number;
    };
}
interface SelectAnnotationAction extends Action {
    type: typeof SELECT_ANNOTATION;
    payload: {
        pageIndex: number;
        localId: number;
    };
}
interface DeselectAnnotationAction extends Action {
    type: typeof DESELECT_ANNOTATION;
}
interface UpdateToolDefaultsAction extends Action {
    type: typeof UPDATE_TOOL_DEFAULTS;
    payload: {
        variantKey: string;
        patch: Partial<AnnotationDefaults>;
    };
}
interface AddColorPresetAction extends Action {
    type: typeof ADD_COLOR_PRESET;
    payload: string;
}
interface CreateAnnotationAction extends Action {
    type: typeof CREATE_ANNOTATION;
    payload: {
        pageIndex: number;
        localId: number;
        annotation: PdfAnnotationObject;
    };
}
interface PatchAnnotationAction extends Action {
    type: typeof PATCH_ANNOTATION;
    payload: {
        pageIndex: number;
        localId: number;
        patch: Partial<PdfAnnotationObject>;
    };
}
interface DeleteAnnotationAction extends Action {
    type: typeof DELETE_ANNOTATION;
    payload: {
        pageIndex: number;
        localId: number;
    };
}
interface CommitAction extends Action {
    type: typeof COMMIT_PENDING_CHANGES;
}
interface StorePdfIdAction extends Action {
    type: typeof STORE_PDF_ID;
    payload: {
        uid: string;
        pdfId: number;
    };
}
interface PurgeAnnotationAction extends Action {
    type: typeof PURGE_ANNOTATION;
    payload: {
        uid: string;
    };
}
interface SetActiveVariantAction extends Action {
    type: typeof SET_ACTIVE_VARIANT;
    payload: string | null;
}
type AnnotationAction = SetAnnotationsAction | ReindexPageAnnotationsAction | SelectAnnotationAction | DeselectAnnotationAction | UpdateToolDefaultsAction | AddColorPresetAction | CreateAnnotationAction | PatchAnnotationAction | DeleteAnnotationAction | CommitAction | StorePdfIdAction | PurgeAnnotationAction | SetActiveVariantAction;

declare class AnnotationPlugin extends BasePlugin<AnnotationPluginConfig, AnnotationCapability, AnnotationState, AnnotationAction> {
    static readonly id: "annotation";
    private readonly ANNOTATION_HISTORY_TOPIC;
    private readonly config;
    private engine;
    private readonly state$;
    private readonly interactionManager;
    private readonly selection;
    private readonly history;
    private readonly modeByVariant;
    private readonly variantByMode;
    private readonly activeVariantChange$;
    private readonly activeTool$;
    constructor(id: string, registry: PluginRegistry, engine: PdfEngine, config: AnnotationPluginConfig);
    initialize(): Promise<void>;
    private registerTool;
    protected buildCapability(): AnnotationCapability;
    private createActiveTool;
    private emitActiveTool;
    onStoreUpdated(prev: AnnotationState, next: AnnotationState): void;
    private getAllAnnotations;
    private getPageAnnotations;
    private renderAnnotation;
    private selectAnnotation;
    private createAnnotation;
    private updateAnnotation;
    private deleteAnnotation;
    private commit;
}

declare const ANNOTATION_PLUGIN_ID = "annotation";
declare const manifest: PluginManifest<AnnotationPluginConfig>;

/** All annotations _objects_ on a single page (order preserved). */
declare const getAnnotationsByPageIndex: (s: AnnotationState, page: number) => TrackedAnnotation[];
/** Shortcut: every page → list of annotation objects. */
declare const getAnnotations: (s: AnnotationState) => Record<number, TrackedAnnotation[]>;
/** The full `TrackedAnnotation` for the current selection. */
declare const getSelectedAnnotation: (s: AnnotationState) => TrackedAnnotation | null;
declare const getSelectedAnnotationWithPageIndex: (s: AnnotationState) => SelectedAnnotation | null;
declare const getSelectedAnnotationByPageIndex: (s: AnnotationState, pageIndex: number) => TrackedAnnotation | null;
declare const isInAnnotationVariant: (s: AnnotationState) => boolean;
declare const getSelectedAnnotationVariant: (s: AnnotationState) => string | null;
/** Check if a given anno on a page is the current selection. */
declare const isAnnotationSelected: (s: AnnotationState, page: number, id: number) => boolean;

type VariantKey = string;
declare const makeVariantKey: (subtype: PdfAnnotationSubtype, intent?: string | null | undefined) => VariantKey;
declare const parseVariantKey: (key: VariantKey) => {
    subtype: PdfAnnotationSubtype;
    intent?: string;
};
declare const variantKeyFromAnnotation: (a: PdfAnnotationObject) => VariantKey;

declare const AnnotationPluginPackage: PluginPackage<AnnotationPlugin, AnnotationPluginConfig, AnnotationState, AnnotationAction>;

export { ANNOTATION_PLUGIN_ID, type ActiveTool, type AnnotationCapability, type AnnotationDefaults, AnnotationPlugin, type AnnotationPluginConfig, AnnotationPluginPackage, type AnnotationState, type BaseAnnotationDefaults, type CommitState, type GetPageAnnotationsOptions, type InkDefaults, type RenderAnnotationOptions, type SelectedAnnotation, type TextDefaults, type TextMarkupDefaults, type TextMarkupSubtype, type ToolDefaultsByMode, type TrackedAnnotation, type UpdateAnnotationColorOptions, type VariantKey, getAnnotations, getAnnotationsByPageIndex, getSelectedAnnotation, getSelectedAnnotationByPageIndex, getSelectedAnnotationVariant, getSelectedAnnotationWithPageIndex, isAnnotationSelected, isInAnnotationVariant, makeVariantKey, manifest, parseVariantKey, variantKeyFromAnnotation };
