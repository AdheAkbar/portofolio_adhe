import { useEffect } from 'react';

/** Reveal untuk semua [data-reveal]. Tanpa observer atau saat reduced motion, konten tetap tampil. */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    let armed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting, boundingClientRect } of entries) {
          // Elemen di atas viewport (lompat lewat anchor) langsung ditampilkan.
          if (!isIntersecting && boundingClientRect.bottom >= 0) continue;
          target.setAttribute('data-shown', '');
          observer.unobserve(target);
        }
        if (armed) return;
        armed = true;
        // Panggilan pertama sudah menandai yang terlihat. Sisanya disembunyikan tanpa transisi agar tidak membebani pemuatan.
        root.classList.add('reveal-on', 'reveal-arm');
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('reveal-arm')));
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove('reveal-on', 'reveal-arm');
    };
  }, []);
}
