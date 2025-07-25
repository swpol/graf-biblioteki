import { ReactNode } from 'react';
import { Size } from '@embedpdf/models';
type RotateProps = React.HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    pageSize: Size;
};
export declare function Rotate({ children, pageSize, ...props }: RotateProps): import("react/jsx-runtime").JSX.Element;
export {};
