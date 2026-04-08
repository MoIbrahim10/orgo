import ar from "../locales/ar.json";
import en from "../locales/en.json";
import {
	defaultLang,
	type Language,
	supportedLanguages,
	type TranslationKey,
	type TranslationSchema,
} from "../types/translations";

const translations: Record<Language, TranslationSchema> = { en, ar };

export function t(lang: Language, key: TranslationKey): string {
	const keys = key.split(".") as string[];
	let result: unknown = translations[lang] ?? translations[defaultLang];

	for (const k of keys) {
		if (typeof result === "object" && result !== null && k in result) {
			result = (result as Record<string, unknown>)[k];
		} else {
			return key;
		}
	}
	return typeof result === "string" ? result : key;
}

export function getLangFromUrl(url: URL): Language {
	const [, lang] = url.pathname.split("/") as [string, Language?];
	return lang && supportedLanguages.includes(lang) ? lang : defaultLang;
}
