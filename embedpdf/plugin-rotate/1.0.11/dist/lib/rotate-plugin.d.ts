import { BasePlugin, PluginRegistry } from '@embedpdf/core';
import { RotateCapability, RotatePluginConfig } from './types';
export declare class RotatePlugin extends BasePlugin<RotatePluginConfig, RotateCapability> {
    static readonly id: "rotate";
    private readonly rotate$;
    constructor(id: string, registry: PluginRegistry, cfg: RotatePluginConfig);
    initialize(_config: RotatePluginConfig): Promise<void>;
    private setRotation;
    private rotateForward;
    private rotateBackward;
    protected buildCapability(): RotateCapability;
    destroy(): Promise<void>;
}
