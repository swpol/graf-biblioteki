import { useState, useRef, useEffect } from 'preact/hooks';

const defaultWasmUrl = `https://cdn.jsdelivr.net/npm/@embedpdf/pdfium@1.0.11/dist/pdfium.wasm`;
function usePdfiumEngine(config) {
    const { wasmUrl = defaultWasmUrl, worker = true, logger } = config ?? {};
    const [engine, setEngine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const engineRef = useRef(null);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const { createPdfiumEngine } = worker
                    ? await import('@embedpdf/engines/pdfium-worker-engine')
                    : await import('@embedpdf/engines/pdfium-direct-engine');
                const pdfEngine = await createPdfiumEngine(wasmUrl, logger);
                engineRef.current = pdfEngine;
                setEngine(pdfEngine);
                setLoading(false);
            }
            catch (e) {
                if (!cancelled) {
                    setError(e);
                    setLoading(false);
                }
            }
        })();
        return () => {
            cancelled = true;
            engineRef.current?.destroy();
            engineRef.current = null;
        };
    }, [wasmUrl, worker, logger]);
    return { engine, isLoading: loading, error };
}

export { usePdfiumEngine };
//# sourceMappingURL=preact.js.map
