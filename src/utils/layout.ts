import { featureFlags, getHtmlLanguage, getLocaleCode, metadataConfig, siteConfig } from "../data/site";
import { getSiteTranslations } from "../data/translations/site";
import { defaultLang, type Language } from "../types/translations";
import type { LayoutMetadataProps } from "./metadata";
import {
	buildLocalePathMap,
	getLocalizedPath,
	resolveLocalePathMap,
	stripLocaleFromPath,
	type LocalePathMap,
} from "./routing";

type LocalePathResolutionInput = {
	lang: Language;
	pathname: string;
	localeAlternates?: LocalePathMap;
	localeSwitcherPaths?: LocalePathMap;
};

type ResolveLayoutChromeInput = LocalePathResolutionInput & {
	showLocaleSuggestion?: boolean;
};

type ResolveHeadMetadataInput = Pick<
	LayoutMetadataProps,
	| "canonicalUrl"
	| "lang"
	| "localeAlternates"
	| "noIndex"
	| "ogImage"
	| "openGraphType"
	| "pageDescription"
	| "pageTitle"
	| "paginationNextUrl"
	| "paginationPrevUrl"
	| "rssFeedUrl"
	| "structuredData"
> & {
	localeBodyClass: string;
	pathname: string;
	site?: URL;
};

function resolveAbsoluteUrl(site: URL | undefined, urlOrPath?: string): string | undefined {
	if (!urlOrPath) {
		return undefined;
	}

	if (/^https?:\/\//.test(urlOrPath)) {
		return urlOrPath;
	}

	return site ? new URL(urlOrPath, site).toString() : undefined;
}

function resolveLocalePaths({
	lang,
	localeAlternates,
	localeSwitcherPaths,
	pathname,
}: LocalePathResolutionInput) {
	const isLocalizedPath = pathname === `/${lang}` || pathname.startsWith(`/${lang}/`);
	const pathWithoutLocale = isLocalizedPath ? stripLocaleFromPath(pathname) : "/";
	const defaultLocalePaths: LocalePathMap = isLocalizedPath ? buildLocalePathMap(pathWithoutLocale) : {};
	const resolvedLocaleAlternates = localeAlternates ?? defaultLocalePaths;
	const resolvedLocaleSwitcherPaths =
		localeSwitcherPaths ??
		(isLocalizedPath
			? resolveLocalePathMap(
					resolvedLocaleAlternates,
					(language) => defaultLocalePaths[language] ?? getLocalizedPath(language),
				)
			: {});

	return {
		resolvedLocaleAlternates,
		resolvedLocaleSwitcherPaths,
	};
}

export function resolveLayoutChrome({
	lang,
	localeAlternates,
	localeSwitcherPaths,
	pathname,
	showLocaleSuggestion,
}: ResolveLayoutChromeInput) {
	const { resolvedLocaleAlternates, resolvedLocaleSwitcherPaths } = resolveLocalePaths({
		lang,
		localeAlternates,
		localeSwitcherPaths,
		pathname,
	});

	return {
		resolvedLocaleAlternates,
		resolvedLocaleSwitcherPaths,
		showLocaleSuggestion: showLocaleSuggestion ?? featureFlags.localeSuggestionBanner,
	};
}

export function resolveHeadMetadata({
	canonicalUrl,
	lang,
	localeAlternates,
	localeBodyClass,
	noIndex = false,
	ogImage,
	openGraphType = metadataConfig.openGraphType,
	pageDescription,
	pageTitle,
	paginationNextUrl,
	paginationPrevUrl,
	pathname,
	rssFeedUrl,
	site,
	structuredData,
}: ResolveHeadMetadataInput) {
	const siteTranslations = getSiteTranslations(lang);
	const metaTitle = pageTitle ?? siteTranslations.title;
	const metaDescription = pageDescription ?? siteTranslations.description ?? metadataConfig.description;
	const { resolvedLocaleAlternates } = resolveLocalePaths({
		lang,
		localeAlternates,
		pathname,
	});
	const resolvedCanonicalUrl = canonicalUrl ?? (site ? new URL(pathname, site).toString() : undefined);
	const resolvedOgImage = resolveAbsoluteUrl(site, ogImage ?? siteConfig.defaultOgImage);
	const resolvedRssFeedUrl = resolveAbsoluteUrl(site, rssFeedUrl);
	const resolvedPaginationPrevUrl = resolveAbsoluteUrl(site, paginationPrevUrl);
	const resolvedPaginationNextUrl = resolveAbsoluteUrl(site, paginationNextUrl);
	const alternateLinks =
		site && Object.keys(resolvedLocaleAlternates).length > 0
			? (Object.keys(resolvedLocaleAlternates) as Language[]).flatMap((language) => {
					const path = resolvedLocaleAlternates[language];
					return path
						? [
								{
									href: new URL(path, site).toString(),
									hreflang: getHtmlLanguage(language),
								},
							]
						: [];
				})
			: [];
	const xDefaultPath =
		resolvedLocaleAlternates[defaultLang] ?? Object.values(resolvedLocaleAlternates)[0];
	const structuredDataItems = [
		site && {
			"@context": "https://schema.org",
			"@type": "WebSite",
			inLanguage: getHtmlLanguage(defaultLang),
			name: siteConfig.name,
			url: site.toString(),
		},
		resolvedCanonicalUrl && {
			"@context": "https://schema.org",
			"@type": "WebPage",
			description: metaDescription,
			inLanguage: getHtmlLanguage(lang),
			name: metaTitle,
			url: resolvedCanonicalUrl,
		},
		...(Array.isArray(structuredData)
			? structuredData
			: structuredData
				? [structuredData]
				: []),
	].filter((item): item is Record<string, unknown> => Boolean(item));

	return {
		alternateLinks,
		metaDescription,
		metaTitle,
		openGraphType,
		robotsContent: noIndex
			? "noindex, nofollow"
			: `${metadataConfig.robots.index ? "index" : "noindex"}, ${metadataConfig.robots.follow ? "follow" : "nofollow"}`,
		resolvedCanonicalUrl,
		resolvedLocaleCode: getLocaleCode(lang),
		resolvedOgImage,
		resolvedPaginationNextUrl,
		resolvedPaginationPrevUrl,
		resolvedRssFeedUrl,
		shouldPreloadEnglishFonts: localeBodyClass === "locale-latin",
		structuredDataItems,
		xDefaultHref: xDefaultPath && site ? new URL(xDefaultPath, site).toString() : undefined,
	};
}
