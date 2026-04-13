import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

/**
 * Handles Figma Make virtual module imports so the project builds
 * correctly outside of the Figma Make environment.
 *
 * - `figma:asset/*`            → returns an empty string (image gracefully absent)
 * - `figma:foundry-client-api` → returns an empty module
 */
function figmaVirtualModulesPlugin(): Plugin {
  const PREFIX = '\0figma:'
  return {
    name: 'figma-virtual-modules',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/') || id === 'figma:foundry-client-api') {
        return PREFIX + id
      }
    },
    load(id: string) {
      if (!id.startsWith(PREFIX)) return
      const original = id.slice(PREFIX.length)
      if (original.startsWith('figma:asset/')) {
        // Return an empty string so <img src={...} /> simply shows nothing
        return 'export default ""'
      }
      if (original === 'figma:foundry-client-api') {
        return 'export default {}'
      }
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaVirtualModulesPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
