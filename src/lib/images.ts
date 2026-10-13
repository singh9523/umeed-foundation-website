import type { ImageMetadata } from 'astro';

/**
 * Every image uploaded to src/assets/uploads (by hand or through /admin) is
 * registered here so Astro can resize and compress it at build time.
 * Content files refer to images by path, e.g. "/src/assets/uploads/photo.jpg".
 */
const uploads = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/uploads/**/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export type ResolvedImage = ImageMetadata | string;

/** Turns a content path into optimisable image data (or a plain URL as a fallback). */
export function resolveImage(path?: string | null): ResolvedImage | undefined {
  if (!path) return undefined;
  const normalised = path.startsWith('/') ? path : `/${path}`;
  const local = uploads[normalised] ?? uploads[`/src/assets/uploads/${path.split('/').pop()}`];
  if (local) return local.default;
  // Remote or /public images are used as-is (not optimised).
  return path;
}
