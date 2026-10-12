import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Determine GitHub Pages base path:
  // 1. Explicit VITE_BASE_PATH if provided (from actions/configure-pages or workflow)
  // 2. Derive from GITHUB_REPOSITORY (e.g. "user/repo" -> "/repo/")
  // 3. Fallback to "./"
  let base = process.env.VITE_BASE_PATH;
  if (!base && process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    base = repoName ? `/${repoName}/` : '/';
  }
  if (!base) {
    base = './';
  }
  // If base is a path like "/repo", ensure trailing slash for Vite
  if (base !== './' && !base.endsWith('/')) {
    base = `${base}/`;
  }

  return {
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
