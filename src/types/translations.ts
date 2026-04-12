import type en from "../locales/en.json";

export type TranslationSchema = typeof en;
export const localeRegistry = {
	en: {
		label: "English",
		nativeLabel: "English",
		code: "EN",
		flag: "🇺🇸",
		htmlLang: "en-US",
		ogLocale: "en_US",
		dir: "ltr",
		dateLocale: "en-US",
		numberLocale: "en-US",
		bodyClass: "locale-latin",
	},
	ar: {
		label: "Arabic",
		nativeLabel: "العربية",
		code: "AR",
		flag: "🇪🇬",
		htmlLang: "ar",
		ogLocale: "ar_EG",
		dir: "rtl",
		dateLocale: "ar-EG",
		numberLocale: "ar-EG",
		bodyClass: "locale-arabic",
	},
} as const;
export type Language = keyof typeof localeRegistry;
export const supportedLanguages = Object.keys(localeRegistry) as Language[];

export function isLanguage(value?: string): value is Language {
	return typeof value === "string" && value in localeRegistry;
}

export type SupportedTranslations = {
	[key in Language]: TranslationSchema;
};

export const languageLabels = Object.fromEntries(
	supportedLanguages.map((lang) => [lang, localeRegistry[lang].nativeLabel]),
) as Record<Language, string>;
export const defaultLang: Language = "en";
export const rtlLanguages = supportedLanguages.filter(
	(lang) => localeRegistry[lang].dir === "rtl",
) as readonly Language[];

type Join<K, P> = K extends string ? (P extends string ? `${K}.${P}` : never) : never;

type Paths<T> = {
	[K in keyof T]: T[K] extends object ? Join<K, Paths<T[K]>> : K;
}[keyof T];

export type TranslationKey = Paths<TranslationSchema>;
