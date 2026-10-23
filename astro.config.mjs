import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { defaultLang, supportedLanguages } from "./src/types/translations";

import cloudflare from "@astrojs/cloudflare";

const locales = [...supportedLanguages];
const siteUrl = process.env.SITE_URL;

// https://astro.build/config
export default defineConfig({
	...(siteUrl ? { site: siteUrl } : {}),
	// Preserve Astro 6's whitespace output after the Astro 7 default change.
	compressHTML: true,

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
