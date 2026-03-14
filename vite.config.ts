import { defineConfig } from 'vite';

export default defineConfig({
  base: '/isekai-rpg/',
  build: {
    assetsInlineLimit: 0, // Ensure assets are always loaded as separate files if needed
  }
});
