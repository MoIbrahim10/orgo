import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { defaultLang, supportedLanguages } from "./src/types/translations";

const locales = [...supportedLanguages];

// https://astro.build/config
export default defineConfig({
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
});
