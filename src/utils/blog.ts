import type { CollectionEntry } from "astro:content";
import type { Language } from "../types/translations";
import { getLocalizedPath, resolveLocalePathMap, type LocalePathMap } from "./routing";

type BlogEntry = CollectionEntry<"blog">;

export function getBlogTranslationEntries(entry: BlogEntry, entries: BlogEntry[]): BlogEntry[] {
	return entries.filter(
		(candidate) =>
			candidate.data.translationGroup === entry.data.translationGroup && !candidate.data.isDraft,
	);
}

export function getBlogLocaleAlternates(entries: BlogEntry[]): LocalePathMap {
	return entries.reduce((alternates, entry) => {
		alternates[entry.data.language as Language] = getLocalizedPath(
			entry.data.language as Language,
			`/blog/${entry.data.slug ?? entry.id}`,
		);
		return alternates;
	}, {} as LocalePathMap);
}

export function getBlogLocaleSwitcherPaths(alternates: LocalePathMap): Record<Language, string> {
	return resolveLocalePathMap(alternates, (language) => getLocalizedPath(language, "/blog"));
}
