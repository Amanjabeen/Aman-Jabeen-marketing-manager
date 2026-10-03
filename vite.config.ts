import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// Determine the base path dynamically based on the deployment target:
// 1. Explicit env variables (VITE_BASE, BASE_URL, VITE_BASE_PATH) take priority if specified.
// 2. Netlify builds (NETLIFY === 'true') use root '/'.
// 3. GitHub Actions / Pages builds (GITHUB_ACTIONS === 'true') use '/Aman-Jabeen/'.
// 4. Default / local / manual build uses './' (relative) which works universally on both.
const getBase = () => {
  if (process.env.VITE_BASE) return process.env.VITE_BASE;
  if (process.env.BASE_URL) return process.env.BASE_URL;
  if (process.env.VITE_BASE_PATH) return process.env.VITE_BASE_PATH;

  if (process.env.NETLIFY === 'true') {
    return '/';
  }

  if (
    process.env.GITHUB_ACTIONS === 'true' ||
    process.env.GITHUB_PAGES === 'true' ||
    process.env.GITHUB_REPOSITORY?.toLowerCase().includes('aman-jabeen')
  ) {
    return '/Aman-Jabeen/';
  }

  // Universal relative base: works out-of-the-box on both root domains and repository subpaths
  return './';
};

export default defineConfig(() => {
  return {
    base: getBase(),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
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
