import { applyTitleTemplate, blogConfig, metadataConfig, siteConfig } from "../data/site";
import type { Language } from "../types/translations";
import type { LocalePathMap } from "./routing";

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

type BaseMetadataInput = {
	title: string;
	description: string;
	ogImage?: string;
	canonicalUrl?: string;
	localeAlternates?: LocalePathMap;
	localeSwitcherPaths?: LocalePathMap;
	rssFeedTitle?: string;
	rssFeedUrl?: string;
	structuredData?: StructuredData;
	paginationPrevUrl?: string;
	paginationNextUrl?: string;
	noIndex?: boolean;
	showLocaleSuggestion?: boolean;
};

export type LayoutMetadataProps = Omit<BaseMetadataInput, "description" | "title"> & {
	lang: Language;
	pageTitle: string;
	pageDescription: string;
	openGraphType: "article" | "website";
};

type MarketingMetadataInput = BaseMetadataInput & {
	absoluteTitle?: boolean;
};

export function createMarketingMetadata(
	lang: Language,
	{ absoluteTitle = false, description, title, ...rest }: MarketingMetadataInput,
): LayoutMetadataProps {
	return {
		lang,
		pageTitle: absoluteTitle ? title : applyTitleTemplate(title),
		pageDescription: description,
		openGraphType: "website",
		...rest,
	};
}

export function createArchiveMetadata(
	lang: Language,
	{ description, noIndex = false, title, ...rest }: BaseMetadataInput,
): LayoutMetadataProps {
	return {
		lang,
		pageTitle: applyTitleTemplate(title),
		pageDescription: description,
		noIndex,
		openGraphType: "website",
		...rest,
	};
}

export function createArticleMetadata(
	lang: Language,
	{ description, title, ...rest }: BaseMetadataInput,
): LayoutMetadataProps {
	return {
		lang,
		pageTitle: applyTitleTemplate(title),
		pageDescription: description,
		openGraphType: "article",
		...rest,
	};
}

export function getDefaultMetadataDescription(): string {
	return metadataConfig.description;
}

export function getDefaultOgImage(): string {
	return siteConfig.defaultOgImage;
}

export function shouldIndexTagPages(): boolean {
	return blogConfig.tag.robots.index;
}
