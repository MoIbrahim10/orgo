import ar from "../locales/ar.json";
import en from "../locales/en.json";
import {
	defaultLang,
	type Language,
	type TranslationKey,
	type TranslationSchema,
} from "../types/translations";
import { getLanguageFromPathname } from "./routing";

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

export function tWithParams(
	lang: Language,
	key: TranslationKey,
	params: Record<string, string | number>,
): string {
	return t(lang, key).replace(/\{(\w+)\}/g, (_, paramName: string) =>
		String(params[paramName] ?? `{${paramName}}`),
	);
}

export function getLangFromUrl(url: URL): Language {
	return getLanguageFromPathname(url.pathname) ?? defaultLang;
}
