// import astroI18next from "astro-i18next";
import mdx from "@astrojs/mdx";
// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { defaultLang, supportedLanguages } from "./src/types/translations";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx()],

	vite: {
		plugins: [tailwindcss()],
	},
	i18n: {
		locales: supportedLanguages,
		defaultLocale: defaultLang,
		routing: {
			prefixDefaultLocale: true,
		},
	},
});
