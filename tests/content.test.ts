import { describe, expect, test } from "bun:test";
import type { CollectionEntry } from "astro:content";
import {
	getFaqCategorySummaries,
	getLocalizedChangelogEntries,
	getLocalizedFeatureEntries,
} from "../src/utils/marketingContent";
import { getLocalizedPerson, sortPeople } from "../src/utils/people";

function createFeature(
	id: string,
	overrides: Partial<CollectionEntry<"features">["data"]>,
): CollectionEntry<"features"> {
	return {
		collection: "features",
		data: {
			benefits: [],
			eyebrow: "Feature",
			language: "en",
			order: 1,
			summary: `${id} summary`,
			title: id,
			translationGroup: id,
			...overrides,
		},
		id,
	} as CollectionEntry<"features">;
}

function createFaq(
	id: string,
	overrides: Partial<CollectionEntry<"faq">["data"]>,
): CollectionEntry<"faq"> {
	return {
		collection: "faq",
		data: {
			answer: `${id} answer`,
			category: "Fit",
			isFeatured: false,
			language: "en",
			order: 1,
			question: `${id}?`,
			translationGroup: id,
			...overrides,
		},
		id,
	} as CollectionEntry<"faq">;
}

function createChangelog(
	id: string,
	overrides: Partial<CollectionEntry<"changelog">["data"]>,
): CollectionEntry<"changelog"> {
	return {
		collection: "changelog",
		data: {
			highlights: [],
			language: "en",
			releaseDate: new Date("2026-04-01T09:00:00.000Z"),
			summary: `${id} summary`,
			title: id,
			translationGroup: id,
			type: "improvement",
			version: "0.1.0",
			...overrides,
		},
		id,
	} as CollectionEntry<"changelog">;
}

function createPerson(id: string, order: number): CollectionEntry<"people"> {
	return {
		collection: "people",
		data: {
			id,
			localized: {
				en: {
					bio: `${id} bio`,
					focusAreas: ["Systems"],
					name: `${id} EN`,
					role: "Role",
					summary: `${id} summary`,
				},
				ar: {
					bio: `${id} سيرة`,
					focusAreas: ["الأنظمة"],
					name: `${id} AR`,
					role: "دور",
					summary: `${id} ملخص`,
				},
			},
			order,
		},
		id,
	} as CollectionEntry<"people">;
}

describe("marketing content helpers", () => {
	test("filters and sorts localized features", () => {
		const entries = [
			createFeature("three", { language: "en", order: 3 }),
			createFeature("one", { language: "en", order: 1 }),
			createFeature("arabic", { language: "ar", order: 2 }),
		];

		expect(getLocalizedFeatureEntries(entries, "en").map((entry) => entry.id)).toEqual([
			"one",
			"three",
		]);
	});

	test("summarizes FAQ categories per locale", () => {
		const entries = [
			createFaq("fit", { category: "Fit", language: "en" }),
			createFaq("workflow", { category: "Workflow", language: "en" }),
			createFaq("fit-2", { category: "Fit", language: "en" }),
			createFaq("arabic", { category: "الملاءمة", language: "ar" }),
		];

		expect(getFaqCategorySummaries(entries, "en")).toEqual([
			{ count: 2, label: "Fit" },
			{ count: 1, label: "Workflow" },
		]);
	});

	test("orders changelog entries by release date descending", () => {
		const entries = [
			createChangelog("older", { releaseDate: new Date("2026-04-01T09:00:00.000Z") }),
			createChangelog("newer", { releaseDate: new Date("2026-04-08T09:00:00.000Z") }),
		];

		expect(getLocalizedChangelogEntries(entries, "en").map((entry) => entry.id)).toEqual([
			"newer",
			"older",
		]);
	});
});

describe("people helpers", () => {
	test("returns localized person fields", () => {
		const person = createPerson("jane", 2);

		expect(getLocalizedPerson(person, "ar")).toMatchObject({
			id: "jane",
			name: "jane AR",
			role: "دور",
		});
	});

	test("sorts people by explicit order", () => {
		const people = [createPerson("b", 2), createPerson("a", 1)];

		expect(sortPeople(people).map((person) => person.id)).toEqual(["a", "b"]);
	});
});
