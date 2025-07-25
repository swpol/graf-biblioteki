import { PluginPackage } from '@embedpdf/core';
import { ScrollPlugin } from './scroll-plugin';
import { ScrollPluginConfig, ScrollState } from './types';
import { ScrollAction } from './actions';
export declare const ScrollPluginPackage: PluginPackage<ScrollPlugin, ScrollPluginConfig, ScrollState, ScrollAction>;
export * from './scroll-plugin';
export * from './types';
export * from './manifest';
export * from './types/virtual-item';
