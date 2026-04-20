import type { CollectionEntry } from "astro:content";
import { blogConfig } from "../data/site";
import type { Language } from "../types/translations";
import { getLocalizedPath, resolveLocalePathMap, type LocalePathMap } from "./routing";

type BlogEntry = CollectionEntry<"blog">;

export type TaxonomySummary = {
	slug: string;
	label: string;
	count: number;
	href: string;
};

export type PaginationState = {
	currentPage: number;
	totalPages: number;
	prevPath?: string;
	nextPath?: string;
};

function sortPosts(left: BlogEntry, right: BlogEntry): number {
	return right.data.publishDate.getTime() - left.data.publishDate.getTime();
}

function stripCombiningMarks(value: string): string {
	return value.normalize("NFKD").replaceAll(/[\u0300-\u036f]/g, "");
}

export function getBlogEntrySlug(entry: BlogEntry): string {
	return entry.data.slug ?? entry.id;
}

export function getBlogPostPath(lang: Language, slug: string): string {
	return getLocalizedPath(lang, `/${blogConfig.pathname}/${slug}`);
}

export function getBlogIndexPath(lang: Language, page = 1): string {
	if (page <= 1) {
		return getLocalizedPath(lang, `/${blogConfig.pathname}`);
	}

	return getLocalizedPath(lang, `/${blogConfig.pathname}/${blogConfig.paginationSegment}/${page}`);
}

export function getBlogCategoryPath(lang: Language, categorySlug: string, page = 1): string {
	const basePath = `/${blogConfig.pathname}/${blogConfig.category.pathSegment}/${categorySlug}`;
	if (page <= 1) {
		return getLocalizedPath(lang, basePath);
	}

	return getLocalizedPath(lang, `${basePath}/${blogConfig.paginationSegment}/${page}`);
}

export function getBlogTagPath(lang: Language, tagSlug: string, page = 1): string {
	const basePath = `/${blogConfig.pathname}/${blogConfig.tag.pathSegment}/${tagSlug}`;
	if (page <= 1) {
		return getLocalizedPath(lang, basePath);
	}

	return getLocalizedPath(lang, `${basePath}/${blogConfig.paginationSegment}/${page}`);
}

export function slugifyTaxonomyTerm(value: string): string {
	const normalizedValue = (/\p{Script=Arabic}/u.test(value) ? value : stripCombiningMarks(value))
		.trim()
		.toLocaleLowerCase()
		.replaceAll(/['’]/g, "")
		.replaceAll(/[^\p{Letter}\p{Number}]+/gu, "-")
		.replaceAll(/^-+|-+$/g, "");

	return normalizedValue || "topic";
}

export function getCategorySlug(value: string): string {
	return slugifyTaxonomyTerm(value);
}

export function getTagSlug(value: string): string {
	return slugifyTaxonomyTerm(value);
}

export function getPublishedBlogEntries(entries: BlogEntry[], lang?: Language): BlogEntry[] {
	return entries
		.filter((entry) => !entry.data.isDraft && (!lang || entry.data.language === lang))
		.sort(sortPosts);
}

export function getBlogTranslationEntries(entry: BlogEntry, entries: BlogEntry[]): BlogEntry[] {
	return getPublishedBlogEntries(entries).filter(
		(candidate) => candidate.data.translationGroup === entry.data.translationGroup,
	);
}

export function getBlogLocaleAlternates(entries: BlogEntry[]): LocalePathMap {
	return entries.reduce((alternates, entry) => {
		alternates[entry.data.language as Language] = getBlogPostPath(
			entry.data.language as Language,
			getBlogEntrySlug(entry),
		);
		return alternates;
	}, {} as LocalePathMap);
}

export function getBlogLocaleSwitcherPaths(alternates: LocalePathMap): Record<Language, string> {
	return resolveLocalePathMap(alternates, (language) => getBlogIndexPath(language));
}

export function getPaginatedItems<T>(
	items: T[],
	currentPage: number,
	pageSize = blogConfig.postsPerPage,
): T[] {
	const startIndex = (currentPage - 1) * pageSize;
	return items.slice(startIndex, startIndex + pageSize);
}

export function getTotalPages(totalItems: number, pageSize = blogConfig.postsPerPage): number {
	return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function getPaginationState({
	currentPage,
	pageSize = blogConfig.postsPerPage,
	pathForPage,
	totalItems,
}: {
	currentPage: number;
	totalItems: number;
	pageSize?: number;
	pathForPage: (page: number) => string;
}): PaginationState {
	const totalPages = getTotalPages(totalItems, pageSize);
	return {
		currentPage,
		totalPages,
		prevPath: currentPage > 1 ? pathForPage(currentPage - 1) : undefined,
		nextPath: currentPage < totalPages ? pathForPage(currentPage + 1) : undefined,
	};
}

export function getCategorySummaries(entries: BlogEntry[], lang: Language): TaxonomySummary[] {
	const categoryMap = new Map<string, TaxonomySummary>();

	for (const entry of getPublishedBlogEntries(entries, lang)) {
		const slug = getCategorySlug(entry.data.category);
		const existingSummary = categoryMap.get(slug);

		if (existingSummary) {
			existingSummary.count += 1;
			continue;
		}

		categoryMap.set(slug, {
			slug,
			label: entry.data.category,
			count: 1,
			href: getBlogCategoryPath(lang, slug),
		});
	}

	return Array.from(categoryMap.values()).sort(
		(left, right) => right.count - left.count || left.label.localeCompare(right.label),
	);
}

export function getTagSummaries(entries: BlogEntry[], lang: Language): TaxonomySummary[] {
	const tagMap = new Map<string, TaxonomySummary>();

	for (const entry of getPublishedBlogEntries(entries, lang)) {
		for (const tag of entry.data.tags ?? []) {
			const slug = getTagSlug(tag);
			const existingSummary = tagMap.get(slug);

			if (existingSummary) {
				existingSummary.count += 1;
				continue;
			}

			tagMap.set(slug, {
				slug,
				label: tag,
				count: 1,
				href: getBlogTagPath(lang, slug),
			});
		}
	}

	return Array.from(tagMap.values()).sort(
		(left, right) => right.count - left.count || left.label.localeCompare(right.label),
	);
}

export function findCategorySummary(
	entries: BlogEntry[],
	lang: Language,
	categorySlug: string,
): TaxonomySummary | undefined {
	return getCategorySummaries(entries, lang).find((summary) => summary.slug === categorySlug);
}

export function findTagSummary(
	entries: BlogEntry[],
	lang: Language,
	tagSlug: string,
): TaxonomySummary | undefined {
	return getTagSummaries(entries, lang).find((summary) => summary.slug === tagSlug);
}

export function getPostsForCategory(
	entries: BlogEntry[],
	lang: Language,
	categorySlug: string,
): BlogEntry[] {
	return getPublishedBlogEntries(entries, lang).filter(
		(entry) => getCategorySlug(entry.data.category) === categorySlug,
	);
}

export function getPostsForTag(entries: BlogEntry[], lang: Language, tagSlug: string): BlogEntry[] {
	return getPublishedBlogEntries(entries, lang).filter((entry) =>
		(entry.data.tags ?? []).some((tag) => getTagSlug(tag) === tagSlug),
	);
}

export function getRelatedBlogPosts({
	count = blogConfig.relatedPostsCount,
	entries,
	entry,
	explicitEntries = [],
}: {
	entry: BlogEntry;
	entries: BlogEntry[];
	explicitEntries?: BlogEntry[];
	count?: number;
}): BlogEntry[] {
	const explicitIds = new Set(explicitEntries.map((candidate) => candidate.id));
	const entryTags = new Set(entry.data.tags ?? []);
	const localeEntries = getPublishedBlogEntries(entries, entry.data.language as Language).filter(
		(candidate) =>
			candidate.id !== entry.id && candidate.data.translationGroup !== entry.data.translationGroup,
	);

	return localeEntries
		.map((candidate) => {
			const candidateTags = candidate.data.tags ?? [];
			const sharedTagCount = candidateTags.filter((tag) => entryTags.has(tag)).length;
			const hasLocalizedSibling = entries.some(
				(other) =>
					other.id !== candidate.id &&
					other.data.translationGroup === candidate.data.translationGroup &&
					!other.data.isDraft,
			);

			let score = 0;
			if (explicitIds.has(candidate.id)) {
				score += 30;
			}
			if (candidate.data.category === entry.data.category) {
				score += 12;
			}
			score += sharedTagCount * 4;
			if (hasLocalizedSibling) {
				score += 1;
			}

			return {
				candidate,
				score,
			};
		})
		.sort(
			(left, right) =>
				right.score - left.score ||
				right.candidate.data.publishDate.getTime() - left.candidate.data.publishDate.getTime(),
		)
		.slice(0, count)
		.map(({ candidate }) => candidate);
}
