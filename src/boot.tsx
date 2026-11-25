import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

export function boot(root: HTMLElement) {
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  // Hasil build sudah berisi HTML (lihat plugin prerender di vite.config.ts); server dev tidak.
  if (root.firstElementChild) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
