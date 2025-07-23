'use strict';

var react = require('react');

const defaultWasmUrl = `https://cdn.jsdelivr.net/npm/@embedpdf/pdfium@1.0.11/dist/pdfium.wasm`;
function usePdfiumEngine(config) {
    const { wasmUrl = defaultWasmUrl, worker = true, logger } = config ?? {};
    const [engine, setEngine] = react.useState(null);
    const [loading, setLoading] = react.useState(true);
    const [error, setError] = react.useState(null);
    const engineRef = react.useRef(null);
    react.useEffect(() => {
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

exports.usePdfiumEngine = usePdfiumEngine;
//# sourceMappingURL=react.cjs.map
