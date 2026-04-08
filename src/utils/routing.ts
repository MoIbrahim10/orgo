import type { GetStaticPathsItem } from "astro";
import {
	defaultLang,
	isLanguage,
	type Language,
	localeRegistry,
	supportedLanguages,
} from "../types/translations";

export type RoutePath = `/${string}` | "/";
export type LocalePathMap = Partial<Record<Language, string>>;

export function normalizeRoutePath(path: RoutePath | string = "/"): RoutePath {
	const trimmedPath = path.replace(/^\/+|\/+$/g, "");
	return trimmedPath ? (`/${trimmedPath}` as RoutePath) : "/";
}

export function getLocaleStaticPaths(): GetStaticPathsItem[] {
	return supportedLanguages.map((lang): GetStaticPathsItem => ({ params: { lang } }));
}

export function getLocalizedPath(lang: Language, path: RoutePath | string = "/"): string {
	const normalizedPath = normalizeRoutePath(path);
	return normalizedPath === "/" ? `/${lang}` : `/${lang}${normalizedPath}`;
}

export function buildLocalePathMap(path: RoutePath | string = "/"): Record<Language, string> {
	return supportedLanguages.reduce(
		(paths, language) => ({
			...paths,
			[language]: getLocalizedPath(language, path),
		}),
		{} as Record<Language, string>,
	);
}

export function resolveLocalePathMap(
	pathMap: LocalePathMap,
	fallback: (language: Language) => string,
): Record<Language, string> {
	return supportedLanguages.reduce(
		(paths, language) => ({
			...paths,
			[language]: pathMap[language] ?? fallback(language),
		}),
		{} as Record<Language, string>,
	);
}

export function stripLocaleFromPath(pathname: string): RoutePath {
	const normalizedPath = normalizeRoutePath(pathname);
	const segments = normalizedPath.split("/");
	const maybeLanguage = segments[1];

	if (!isLanguage(maybeLanguage)) {
		return normalizedPath;
	}

	const remainingPath = segments.slice(2).join("/");
	return remainingPath ? (`/${remainingPath}` as RoutePath) : "/";
}

export function getLanguageFromParams(lang?: string): Language {
	return isLanguage(lang) ? lang : defaultLang;
}

export function getLanguageFromPathname(pathname: string): Language {
	const [, lang] = pathname.split("/");
	return getLanguageFromParams(lang);
}

export function getLanguageDirection(lang: Language): "ltr" | "rtl" {
	return localeRegistry[lang].dir;
}

export function matchPreferredLanguage(candidate?: string | null): Language | undefined {
	const normalizedCandidate = candidate?.toLowerCase();

	if (!normalizedCandidate) {
		return undefined;
	}

	if (isLanguage(normalizedCandidate)) {
		return normalizedCandidate;
	}

	const [baseLanguage] = normalizedCandidate.split("-");
	return isLanguage(baseLanguage) ? baseLanguage : undefined;
}
