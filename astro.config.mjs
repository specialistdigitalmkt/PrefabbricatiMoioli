// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Build statico puro: nessun framework UI, nessun JS di runtime spedito
 * al di fuori dei piccoli script inline dei componenti.
 */
/**
 * Dominio del sito.
 * In produzione si imposta SITE_URL; senza, si usa il dominio definitivo come
 * ripiego. Serve a canonical, Open Graph, dati strutturati e sitemap.
 */
const SITO = process.env.SITE_URL ?? 'https://www.prefabbricatimoioli.it';

export default defineConfig({
  site: SITO,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
