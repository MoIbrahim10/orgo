import type { CollectionEntry } from "astro:content";
import type { Language } from "../types/translations";

type FeatureEntry = CollectionEntry<"features">;
type FaqEntry = CollectionEntry<"faq">;
type ChangelogEntry = CollectionEntry<"changelog">;

export function getLocalizedFeatureEntries(
	entries: FeatureEntry[],
	lang: Language,
): FeatureEntry[] {
	return [...entries]
		.filter((entry) => entry.data.language === lang)
		.sort((left, right) => left.data.order - right.data.order);
}

export function getLocalizedFaqEntries(entries: FaqEntry[], lang: Language): FaqEntry[] {
	return [...entries]
		.filter((entry) => entry.data.language === lang)
		.sort((left, right) => left.data.order - right.data.order);
}

export function getFaqCategorySummaries(entries: FaqEntry[], lang: Language) {
	const categoryMap = new Map<
		string,
		{
			label: string;
			count: number;
		}
	>();

	for (const entry of getLocalizedFaqEntries(entries, lang)) {
		const existingCategory = categoryMap.get(entry.data.category);

		if (existingCategory) {
			existingCategory.count += 1;
			continue;
		}

		categoryMap.set(entry.data.category, {
			label: entry.data.category,
			count: 1,
		});
	}

	return Array.from(categoryMap.values()).sort(
		(left, right) => right.count - left.count || left.label.localeCompare(right.label),
	);
}

export function getLocalizedChangelogEntries(
	entries: ChangelogEntry[],
	lang: Language,
): ChangelogEntry[] {
	return [...entries]
		.filter((entry) => entry.data.language === lang)
		.sort((left, right) => right.data.releaseDate.getTime() - left.data.releaseDate.getTime());
}
