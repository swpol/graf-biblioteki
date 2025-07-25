import { A as AttachmentPlugin, a as AttachmentCapability } from '../index.d-B0bH2JvJ.cjs';
import '@embedpdf/core';
import '@embedpdf/models';

declare const useAttachmentPlugin: () => {
    plugin: AttachmentPlugin | null;
    isLoading: boolean;
    ready: Promise<void>;
};
declare const useAttachmentCapability: () => {
    provides: Readonly<AttachmentCapability> | null;
    isLoading: boolean;
    ready: Promise<void>;
};

export { useAttachmentCapability, useAttachmentPlugin };
