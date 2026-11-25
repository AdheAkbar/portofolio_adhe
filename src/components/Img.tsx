import type { Photo } from '../data/portfolioData';
import { asset } from '../lib/asset';

/** Gambar WebP responsif, dimuat malas kecuali `eager`. */
export function Img({ photo, sizes, className, eager = false }: { photo: Photo; sizes: string; className?: string; eager?: boolean }) {
  const url = (w: number) => asset(`assets/opt/${photo.name}-${w}.webp`);
  return (
    <img
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      src={url(photo.widths[photo.widths.length - 1])}
      srcSet={photo.widths.map((w) => `${url(w)} ${w}w`).join(', ')}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      className={className}
    />
  );
}
