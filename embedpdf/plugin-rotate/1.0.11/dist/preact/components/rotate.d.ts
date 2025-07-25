import { ComponentChildren, JSX } from 'preact';
import { Size } from '@embedpdf/models';
type RotateProps = JSX.HTMLAttributes<HTMLDivElement> & {
    children: ComponentChildren;
    pageSize: Size;
};
export declare function Rotate({ children, pageSize, ...props }: RotateProps): JSX.Element;
export {};
