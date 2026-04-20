import { defaultLang, localeRegistry, type Language } from "../types/translations";
import { themeMetaColors } from "./theme";

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

type ScriptPolicy = {
	category: "analytics" | "verification";
	description: string;
	enabled: boolean;
	loadingStrategy: "async" | "meta";
	vendor: string;
};

const productionAnalyticsEnabled = import.meta.env.PROD;

export const siteConfig = {
	name: "Orgo",
	basePath: "/",
	defaultOgImage: "/og.png",
	themeColor: themeMetaColors.light,
} as const;

/** Public profile URLs for footer and meta; replace with real handles when available. */
export const publicSocialLinks = {
	linkedin: "https://x.com/m0code",
	x: "https://x.com/m0code",
	instagram: "https://x.com/m0code",
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
	postsPerPage: 7,
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

export const scriptPolicies = {
	googleAnalytics: {
		category: "analytics",
		description: "Behavior analytics for marketing and product-site traffic.",
		enabled: analyticsConfig.isEnabled && Boolean(analyticsConfig.googleAnalyticsId),
		loadingStrategy: "async",
		vendor: "Google Analytics",
	},
	plausible: {
		category: "analytics",
		description: "Lightweight privacy-conscious page analytics.",
		enabled: analyticsConfig.isEnabled && Boolean(analyticsConfig.plausibleDomain),
		loadingStrategy: "async",
		vendor: "Plausible",
	},
	googleSiteVerification: {
		category: "verification",
		description: "Search Console ownership verification for SEO tooling.",
		enabled: Boolean(verificationConfig.googleSiteVerificationId),
		loadingStrategy: "meta",
		vendor: "Google Search Console",
	},
} as const satisfies Record<string, ScriptPolicy>;

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
	scripts: scriptPolicies,
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

export function getVerificationMetaEntries() {
	return [
		scriptPolicies.googleSiteVerification.enabled &&
			verificationConfig.googleSiteVerificationId && {
				content: verificationConfig.googleSiteVerificationId,
				name: "google-site-verification",
			},
	].filter(
		(
			entry,
		): entry is {
			name: string;
			content: string;
		} => Boolean(entry),
	);
}

export function getEnabledAnalyticsProviders() {
	return {
		googleAnalytics: scriptPolicies.googleAnalytics.enabled
			? analyticsConfig.googleAnalyticsId
			: undefined,
		plausible: scriptPolicies.plausible.enabled ? analyticsConfig.plausibleDomain : undefined,
	};
}
