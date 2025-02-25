import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: 'src',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      injectManifest: {
        injectionPoint: undefined,
      },
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Hospital Sin Nombre',
        short_name: 'HSN',
        description: 'Aplicación PWA del Hospital Sin Nombre',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/icons/hlogo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/hlogo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ['**/*.{js,css,html}'],
        // globDirectory: 'dev-dist',
        // globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
      },
    }),
  ],
});
