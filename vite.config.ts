import { createServer, defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

/** Menulis HTML aplikasi ke index.html saat build agar konten tampil sebelum JavaScript selesai dimuat. */
function prerender(): Plugin {
  return {
    name: 'prerender',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      async handler(html, { bundle }) {
        // CSS disisipkan ke HTML agar tampilan pertama tidak menunggu permintaan kedua.
        for (const file of Object.values(bundle ?? {})) {
          if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue;
          const css = String(file.source).replace(/url\((["']?)(?:\.\/)?(?!data:|https?:|\/|\.)/g, 'url($1./assets/');
          html = html.replace(new RegExp(`<link rel="stylesheet"[^>]*${file.fileName.split('/').pop()}"[^>]*>`), () => `<style>${css}</style>`);
        }
        const boot = Object.values(bundle ?? {}).find((f) => f.type === 'chunk' && f.name === 'boot');
        if (boot) html = html.replace('</head>', () => `<link rel="modulepreload" crossorigin fetchpriority="low" href="./${boot.fileName}"></head>`);
        const server = await createServer({ configFile: false, logLevel: 'error', appType: 'custom', server: { middlewareMode: true, ws: false, watch: null } })
        try {
          const { default: App } = await server.ssrLoadModule('/src/App.tsx')
          return html.replace('<div id="root"></div>', () => `<div id="root">${renderToString(createElement(App))}</div>`)
        } finally {
          await server.close()
        }
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  appType: 'mpa', // halaman yang tidak ada dijawab 404, bukan index.html
  plugins: [
    react(),
    tailwindcss(),
    prerender(),
  ],
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: true,
    headers: { 'Cache-Control': 'no-cache' },
  }
})
