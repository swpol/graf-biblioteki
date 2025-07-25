import { Position } from '@embedpdf/models';
import { InteractionManagerCapability, InteractionScope } from '..';
/**
 * Hook one DOM element into the interaction-manager.
 *  – keeps handlers & cursor in-sync with the current mode
 *  – returns a teardown fn for React/Preact effects
 */
export declare function createPointerProvider(cap: InteractionManagerCapability, scope: InteractionScope, element: HTMLElement, convertEventToPoint?: (evt: PointerEvent, host: HTMLElement) => Position): () => void;
