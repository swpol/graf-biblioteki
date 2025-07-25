/**
 * Function type for converting ImageData to Blob
 * In browser: uses OffscreenCanvas
 * In Node.js: can use Sharp or other image processing libraries
 */
type ImageDataConverter<T = Blob> = (imageData: ImageData, imageType?: ImageConversionTypes) => Promise<T>;
type ImageConversionTypes = 'image/webp' | 'image/png' | 'image/jpeg';
/**
 * Browser implementation using OffscreenCanvas
 * This is the default implementation used in browser environments
 */
declare const browserImageDataToBlobConverter: ImageDataConverter;
/**
 * Node.js implementation using Sharp
 * This requires the 'sharp' package to be installed
 *
 * @example
 * ```typescript
 * import sharp from 'sharp';
 * import { createNodeImageDataToBufferConverter } from '@embedpdf/engines/pdfium/image-converters';
 *
 * const converter = createNodeImageDataToBufferConverter(sharp);
 * const engine = new PdfiumEngine(pdfiumModule, logger, converter);
 * ```
 */
declare function createNodeImageDataToBufferConverter(sharp: any): ImageDataConverter<Buffer>;
/**
 * Alternative Node.js implementation using canvas (node-canvas)
 * This requires the 'canvas' package to be installed
 *
 * @example
 * ```typescript
 * import { createCanvas } from 'canvas';
 * import { createNodeCanvasImageDataToBlobConverter } from '@embedpdf/engines/pdfium/image-converters';
 *
 * const converter = createNodeCanvasImageDataToBlobConverter(createCanvas, 'image/png');
 * const engine = new PdfiumEngine(pdfiumModule, logger, converter);
 * ```
 */
declare function createNodeCanvasImageDataToBlobConverter(createCanvas: any): ImageDataConverter<Buffer>;
/**
 * Generic Node.js implementation that works with any image processing library
 * that can handle raw RGBA data
 *
 * @example
 * ```typescript
 * const converter = createCustomImageDataToBlobConverter(async (imageData) => {
 *   // Your custom image processing logic here
 *   // Return a Buffer that will be wrapped in a Blob
 *   return processImageWithYourLibrary(imageData);
 * });
 * ```
 */
declare function createCustomImageDataToBlobConverter(processor: (imageData: ImageData) => Promise<Buffer>): ImageDataConverter;
/**
 * Create a custom converter that returns a Buffer
 * @param processor - function to process the image data
 * @param imageType - image type
 * @returns ImageDataToBlobConverter<Buffer>
 */
declare function createCustomImageDataToBufferConverter(processor: (imageData: ImageData, imageType: ImageConversionTypes) => Promise<Buffer>): ImageDataConverter<Buffer>;

export { browserImageDataToBlobConverter, createCustomImageDataToBlobConverter, createCustomImageDataToBufferConverter, createNodeCanvasImageDataToBlobConverter, createNodeImageDataToBufferConverter };
export type { ImageConversionTypes, ImageDataConverter };
