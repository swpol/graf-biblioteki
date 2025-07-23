import { ComponentChildren, JSX } from 'preact';
type ViewportProps = JSX.HTMLAttributes<HTMLDivElement> & {
    children: ComponentChildren;
};
export declare function Viewport({ children, ...props }: ViewportProps): JSX.Element;
export {};
