import { VNode, JSX } from 'preact';
import { IconIdentifier, IconRenderOptions } from '@embedpdf/plugin-ui';
type IconProps = JSX.ButtonHTMLAttributes<HTMLSpanElement> & IconRenderOptions & {
    icon: IconIdentifier;
};
/**
 * Icon component for React
 * Renders an icon from the registry or a raw SVG string in an SSR-compatible way
 */
export declare function Icon({ icon, title, ...props }: IconProps): VNode | null;
export {};
//# sourceMappingURL=icon.d.ts.map