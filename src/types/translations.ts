import type en from "../locales/en.json";

export type TranslationSchema = typeof en;
export const supportedLanguages = ["en", "ar"] as const;
export type Language = (typeof supportedLanguages)[number];

export type SupportedTranslations = {
	[key in Language]: TranslationSchema;
};

export const languageLabels: Record<Language, string> = {
	en: "English 🇺🇸",
	ar: "العربية 🇪🇬",
};
export const defaultLang: Language = "en";
export const rtlLanguages = ["ar"] as const satisfies readonly Language[];

type Join<K, P> = K extends string ? (P extends string ? `${K}.${P}` : never) : never;

type Paths<T> = {
	[K in keyof T]: T[K] extends object ? Join<K, Paths<T[K]>> : K;
}[keyof T];

export type TranslationKey = Paths<TranslationSchema>;
