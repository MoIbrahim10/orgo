import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { defaultLang, supportedLanguages } from "./src/types/translations";

import cloudflare from "@astrojs/cloudflare";

const locales = [...supportedLanguages];
const siteUrl = process.env.SITE_URL;

// https://astro.build/config
export default defineConfig({
  ...(siteUrl ? { site: siteUrl } : {}),

  vite: {
      plugins: [tailwindcss({ applyBaseStyles: false })],
	},

  i18n: {
      locales,
      defaultLocale: defaultLang,
      routing: {
          prefixDefaultLocale: true,
      },
	},

  adapter: cloudflare(),
});