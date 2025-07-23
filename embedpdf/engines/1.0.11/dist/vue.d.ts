import { Ref } from 'vue';
import { Logger, PdfEngine } from '@embedpdf/models';

interface UsePdfiumEngineProps {
    wasmUrl?: string;
    worker?: boolean;
    logger?: Logger;
}
interface UsePdfiumEngineResult {
    engine: Ref<PdfEngine | null>;
    isLoading: Ref<boolean>;
    error: Ref<Error | null>;
}
/**
 * Vue composable that loads a PdfiumEngine (worker or direct)
 * and keeps its lifetime tied to the component.
 */
declare function usePdfiumEngine(props?: UsePdfiumEngineProps): UsePdfiumEngineResult;

export { usePdfiumEngine };
