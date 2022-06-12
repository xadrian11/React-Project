import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { basename } from './config.json';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  base: `/${basename}/`,
});
