import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const defaultWasmUrl = 'https://cdn.jsdelivr.net/npm/@embedpdf/pdfium@1.0.11/dist/pdfium.wasm';
/**
 * Vue composable that loads a PdfiumEngine (worker or direct)
 * and keeps its lifetime tied to the component.
 */
function usePdfiumEngine(props = {}) {
    const { wasmUrl = defaultWasmUrl, worker = true, logger } = props;
    const engine = ref(null);
    const isLoading = ref(true);
    const error = ref(null);
    /* create / destroy tied to component lifecycle ----------------- */
    onMounted(loadEngine);
    onBeforeUnmount(destroyEngine);
    /* re‑load if reactive props change ----------------------------- */
    watch(() => [wasmUrl, worker, logger], () => {
        destroyEngine();
        loadEngine();
    });
    async function loadEngine() {
        try {
            const { createPdfiumEngine } = worker
                ? await import('@embedpdf/engines/pdfium-worker-engine')
                : await import('@embedpdf/engines/pdfium-direct-engine');
            engine.value = await createPdfiumEngine(wasmUrl, logger);
            isLoading.value = false;
        }
        catch (e) {
            error.value = e;
            isLoading.value = false;
        }
    }
    function destroyEngine() {
        engine.value?.destroy?.();
        engine.value = null;
        isLoading.value = true;
        error.value = null;
    }
    return { engine, isLoading, error };
}

export { usePdfiumEngine };
//# sourceMappingURL=vue.js.map
