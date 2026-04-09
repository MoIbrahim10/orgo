import { localeRegistry, type Language } from "../types/translations";

export const siteConfig = {
	name: "Orgo",
	defaultOgImage: "/og.png",
	themeColor: "#0f172a",
} as const;

export function getLocaleConfig(lang: Language) {
	return localeRegistry[lang];
}

export function getHtmlLanguage(lang: Language): string {
	return getLocaleConfig(lang).htmlLang;
}

export function getLocaleCode(lang: Language): string {
	return getLocaleConfig(lang).ogLocale;
}

export function formatLocaleList(lang: Language, languages: Language[]): string {
	const formatter = new Intl.ListFormat(getLocaleConfig(lang).dateLocale, {
		style: "long",
		type: "conjunction",
	});

	return formatter.format(languages.map((language) => getLocaleConfig(language).nativeLabel));
}

export function formatLocalizedDate(
	lang: Language,
	date: Date,
	options: Intl.DateTimeFormatOptions = { dateStyle: "long" },
): string {
	return date.toLocaleDateString(getLocaleConfig(lang).dateLocale, options);
}
