import { PdfEngine, Logger } from '@embedpdf/models';

interface UsePdfiumEngineProps {
    wasmUrl?: string;
    worker?: boolean;
    logger?: Logger;
}
declare function usePdfiumEngine(config?: UsePdfiumEngineProps): {
    engine: PdfEngine<Blob> | null;
    isLoading: boolean;
    error: Error | null;
};

export { usePdfiumEngine };
