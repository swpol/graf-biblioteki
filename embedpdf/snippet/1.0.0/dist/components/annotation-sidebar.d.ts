/** @jsxImportSource preact */
import { h } from 'preact';
import { type SelectedAnnotation } from '@embedpdf/plugin-annotation';
interface LeftPanelAnnotationStyleProps {
    selectedAnnotation: SelectedAnnotation | null;
    activeVariant: string | null;
    colorPresets: string[];
}
export declare const leftPanelAnnotationStyleRenderer: ({ selectedAnnotation, activeVariant, colorPresets, }: LeftPanelAnnotationStyleProps) => h.JSX.Element | null;
export {};
//# sourceMappingURL=annotation-sidebar.d.ts.map