// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * URL publique du site — utilisée pour les balises canonical, hreflang,
 * Open Graph et le sitemap. ⚠️ À remplacer par ton domaine définitif
 * (ex : https://tiemokosissoko.dev) dès qu'il est connu.
 */
export const SITE_URL = 'https://tiemoko-sissoko.vercel.app';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',

  // Bilingue : FR à la racine (/), EN sous /en/
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],

  // Les CSS critiques de petite taille sont inlinées dans le <head>
  build: { inlineStylesheets: 'auto' },

  // Préchargement des liens au survol (navigation FR ⇄ EN instantanée)
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
