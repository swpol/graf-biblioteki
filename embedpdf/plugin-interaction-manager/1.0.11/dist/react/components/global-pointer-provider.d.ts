import { ReactNode } from 'react';
interface GlobalPointerProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    style?: React.CSSProperties;
}
export declare const GlobalPointerProvider: ({ children, style, ...props }: GlobalPointerProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};
