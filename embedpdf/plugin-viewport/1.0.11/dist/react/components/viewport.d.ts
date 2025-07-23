import { default as React, ReactNode } from 'react';
type ViewportProps = React.HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};
export declare function Viewport({ children, ...props }: ViewportProps): import("react/jsx-runtime").JSX.Element;
export {};
