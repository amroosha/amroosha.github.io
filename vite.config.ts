import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: ['5182-iy5pe0hgux0d2eky6xrt1.e2b.app', 'localhost', '169.254.0.21'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
