import { Rotation } from '@embedpdf/models';
/**
 * Returns the 6-tuple you can drop straight into
 * `matrix(a,b,c,d,e,f)` or a ready-made CSS string.
 * Rotation is clockwise, origin = top-left (0 0).
 *
 * ── Note on e,f ───────────────────────────────
 * For 0°/180° no translation is needed.
 * For 90°/270° you may want to pass the page
 * height / width so the page stays in positive
 * coordinates.  Keep them 0 and handle layout
 * elsewhere if that’s what you do today.
 */
export declare function rotationMatrix(rotation: Rotation, w: number, h: number, asString?: boolean): [number, number, number, number, number, number] | string;
