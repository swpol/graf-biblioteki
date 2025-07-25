import { ComponentChildren, JSX } from 'preact';
interface GlobalPointerProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children: ComponentChildren;
    style?: JSX.CSSProperties;
}
export declare const GlobalPointerProvider: ({ children, style, ...props }: GlobalPointerProviderProps) => JSX.Element;
export {};
