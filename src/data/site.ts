import { defaultLang, localeRegistry, type Language } from "../types/translations";

type RobotsPolicy = {
	index: boolean;
	follow: boolean;
};

type BlogTaxonomyConfig = {
	enabled: boolean;
	pathSegment: string;
	robots: RobotsPolicy;
};

type BlogConfig = {
	enabled: boolean;
	pathname: string;
	paginationSegment: string;
	postsPerPage: number;
	relatedPostsCount: number;
	listRobots: RobotsPolicy;
	category: BlogTaxonomyConfig;
	tag: BlogTaxonomyConfig;
};

type AnalyticsConfig = {
	isEnabled: boolean;
	googleAnalyticsId?: string;
	plausibleDomain?: string;
};

type VerificationConfig = {
	googleSiteVerificationId?: string;
};

type FeatureFlags = {
	localeSuggestionBanner: boolean;
	teamsLandingPage: boolean;
	blogTaxonomies: boolean;
};

const productionAnalyticsEnabled = import.meta.env.PROD;

export const siteConfig = {
	name: "Orgo",
	basePath: "/",
	defaultOgImage: "/og.png",
	themeColor: "#0f172a",
} as const;

export const metadataConfig = {
	titleTemplate: `%s | ${siteConfig.name}`,
	description:
		"Orgo brings planning, reflection, and calm team coordination into one thoughtfully designed workspace.",
	robots: {
		index: true,
		follow: true,
	},
	openGraphType: "website",
	twitterCard: "summary_large_image",
} as const;

export const verificationConfig: VerificationConfig = {
	googleSiteVerificationId: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined,
};

export const analyticsConfig: AnalyticsConfig = {
	isEnabled:
		productionAnalyticsEnabled &&
		Boolean(import.meta.env.PUBLIC_GOOGLE_ANALYTICS_ID || import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN),
	googleAnalyticsId: import.meta.env.PUBLIC_GOOGLE_ANALYTICS_ID?.trim() || undefined,
	plausibleDomain: import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN?.trim() || undefined,
};

export const blogConfig: BlogConfig = {
	enabled: true,
	pathname: "blog",
	paginationSegment: "page",
	postsPerPage: 2,
	relatedPostsCount: 3,
	listRobots: {
		index: true,
		follow: true,
	},
	category: {
		enabled: true,
		pathSegment: "category",
		robots: {
			index: true,
			follow: true,
		},
	},
	tag: {
		enabled: true,
		pathSegment: "tag",
		robots: {
			index: false,
			follow: true,
		},
	},
};

export const featureFlags: FeatureFlags = {
	localeSuggestionBanner: true,
	teamsLandingPage: true,
	blogTaxonomies: blogConfig.category.enabled || blogConfig.tag.enabled,
};

export const appConfig = {
	site: siteConfig,
	metadata: metadataConfig,
	verification: verificationConfig,
	analytics: analyticsConfig,
	blog: blogConfig,
	features: featureFlags,
	defaultLanguage: defaultLang,
} as const;

export function applyTitleTemplate(title?: string): string {
	if (!title || title === siteConfig.name) {
		return siteConfig.name;
	}

	return metadataConfig.titleTemplate.replace("%s", title);
}

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
