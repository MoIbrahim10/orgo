import type { GetStaticPathsItem } from "astro";
import {
	defaultLang,
	type Language,
	rtlLanguages,
	supportedLanguages,
} from "../types/translations";

type RoutePath = `/${string}` | "/";

export function getLocaleStaticPaths(): GetStaticPathsItem[] {
	return supportedLanguages.map((lang): GetStaticPathsItem => ({ params: { lang } }));
}

export function getLocalizedPath(lang: Language, path: RoutePath | string = "/"): string {
	const normalizedPath = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
	return `/${lang}${normalizedPath}`;
}

export function getLanguageFromParams(lang?: string): Language {
	return supportedLanguages.includes(lang as Language) ? (lang as Language) : defaultLang;
}

export function getLanguageDirection(lang: Language): "ltr" | "rtl" {
	return rtlLanguages.includes(lang as (typeof rtlLanguages)[number]) ? "rtl" : "ltr";
}
