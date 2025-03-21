import type en from '../locales/en.json';

export type TranslationSchema = typeof en;

export type SupportedTranslations = {
  [key in Language]: TranslationSchema;
};

export const languages = {
  en: "English 🇺🇸",
  ar: "العربية 🇪🇬",
} as const;

export type Language = keyof typeof languages;
export const defaultLang: Language = "en";
export const supportedLanguages = Object.keys(languages) as Language[];


type Join<K, P> = K extends string
  ? P extends string
    ? `${K}.${P}`
    : never
  : never;

type Paths<T> = {
  [K in keyof T]: T[K] extends object ? Join<K, Paths<T[K]>> : K;
}[keyof T];

export type TranslationKey = Paths<TranslationSchema>;