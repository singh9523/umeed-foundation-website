// @ts-check
import { defineConfig } from 'astro/config';

// The public address of the website. Used for SEO tags and the sitemap.
// Change this once you connect a custom domain (e.g. https://www.umeedfoundation.org),
// or set a SITE_URL environment variable in your hosting dashboard.
const SITE_URL = process.env.SITE_URL || 'https://umeed-foundation-website.umeedfoundation2026.workers.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  image: {
    // Uploaded photos are resized and converted to modern formats at build time.
    responsiveStyles: false,
  },
});
