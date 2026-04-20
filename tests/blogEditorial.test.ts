import { describe, expect, test } from "bun:test";
import type { CollectionEntry } from "astro:content";
import {
	createEditorialPosts,
	formatReadingTimeLabel,
	getEditorialArchiveCopy,
} from "../src/utils/blogVariants";

function createBlogPost(
	id: string,
	overrides: Partial<CollectionEntry<"blog">["data"]> = {},
): CollectionEntry<"blog"> {
	return {
		body: "## Sample\n\nA short post body used for testing editorial enrichment.",
		collection: "blog",
		data: {
			author: "john-doe" as never,
			category: "Design",
			image: {
				alt: "Cover image",
				src: "/cover.png",
			},
			isDraft: false,
			language: "en",
			metaDescription: "Testing metadata",
			publishDate: new Date("2025-03-20T14:00:00.000Z"),
			relatedPosts: [],
			slug: "designing-focus",
			tags: ["ux", "design"],
			title: "Designing for Focus",
			translationGroup: "focus",
			updatedDate: new Date("2025-03-20T15:00:00.000Z"),
			...overrides,
		},
		id,
	} as CollectionEntry<"blog">;
}

function createPerson(id: string, name: string): CollectionEntry<"people"> {
	return {
		collection: "people",
		data: {
			availability: "Available",
			id,
			localized: {
				ar: {
					bio: "سيرة",
					focusAreas: ["تجربة"],
					name: "ماركوس",
					role: "مصمم",
					summary: "ملخص",
				},
				en: {
					bio: "Bio",
					focusAreas: ["Design systems"],
					name,
					role: "Lead product designer",
					summary: "Keeps the interface coherent.",
				},
			},
		},
		id,
	} as CollectionEntry<"people">;
}

describe("blog editorial helpers", () => {
	test("formats reading time labels per locale", () => {
		expect(formatReadingTimeLabel("en", 5)).toBe("5 min read");
		expect(formatReadingTimeLabel("ar", 5)).toBe("٥ دقائق قراءة");
	});

	test("returns archive copy for the live blog", () => {
		expect(getEditorialArchiveCopy("en").featuredLabel).toBe("Featured story");
		expect(getEditorialArchiveCopy("ar").archiveLabel).toBe("تصفّح الأرشيف");
	});

	test("creates editorial posts with enriched copy", () => {
		const posts = createEditorialPosts({
			entries: [createBlogPost("focus-post")],
			lang: "en",
			people: [createPerson("john-doe", "Marcus Lindgren")],
		});

		expect(posts[0]?.authorName).toBe("Marcus Lindgren");
		expect(posts[0]?.readingTimeLabel).toBe("5 min read");
		expect(posts[0]?.summary).toContain("reducing interruption");
		expect(posts[0]?.tagLinks.map((tag) => tag.href)).toEqual([
			"/en/blog/tag/ux",
			"/en/blog/tag/design",
		]);
	});

	test("resolves authors by collection id or person data id", () => {
		const posts = createEditorialPosts({
			entries: [
				createBlogPost("rtl-post", {
					author: "ahmed-ali" as never,
					category: "Localization",
					slug: "translation-is-product-work",
					tags: ["translation"],
					title: "Translation is product work",
					translationGroup: "translation-product-work",
				}),
			],
			lang: "en",
			people: [
				{
					collection: "people",
					data: {
						id: "youssef-mansour",
						localized: {
							ar: {
								bio: "سيرة",
								focusAreas: ["الترجمة"],
								name: "يوسف منصور",
								role: "قائد التجربة العربية",
								summary: "ملخص",
							},
							en: {
								bio: "Bio",
								focusAreas: ["Localization"],
								name: "Youssef Mansour",
								role: "Arabic experience lead",
								summary: "Keeps Arabic native.",
							},
						},
					},
					id: "ahmed-ali",
				} as CollectionEntry<"people">,
			],
		});

		expect(posts[0]?.authorName).toBe("Youssef Mansour");
	});
});
