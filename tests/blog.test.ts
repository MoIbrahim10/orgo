import { describe, expect, test } from "bun:test";
import type { CollectionEntry } from "astro:content";
import {
	findCategorySummary,
	getBlogCategoryPath,
	getBlogIndexPath,
	getBlogTagPath,
	getPaginationState,
	getRelatedBlogPosts,
	getTagSummaries,
	slugifyTaxonomyTerm,
} from "../src/utils/blog";

function createPost(
	id: string,
	overrides: Partial<CollectionEntry<"blog">["data"]>,
): CollectionEntry<"blog"> {
	return {
		collection: "blog",
		data: {
			author: "john-doe" as never,
			category: "Product",
			image: {
				alt: "Cover image",
				src: "/cover.png",
			},
			isDraft: false,
			language: "en",
			metaDescription: `${id} description`,
			publishDate: new Date("2025-03-10T09:00:00.000Z"),
			relatedPosts: [],
			title: id,
			translationGroup: id,
			updatedDate: new Date("2025-03-11T09:00:00.000Z"),
			...overrides,
		},
		id,
	} as CollectionEntry<"blog">;
}

describe("blog helpers", () => {
	test("builds archive and taxonomy paths", () => {
		expect(getBlogIndexPath("en")).toBe("/en/blog");
		expect(getBlogIndexPath("en", 2)).toBe("/en/blog/page/2");
		expect(getBlogCategoryPath("ar", "product")).toBe("/ar/blog/category/product");
		expect(getBlogTagPath("en", "design", 3)).toBe("/en/blog/tag/design/page/3");
	});

	test("slugifies taxonomy labels with unicode-safe normalization", () => {
		expect(slugifyTaxonomyTerm("Design Systems")).toBe("design-systems");
		expect(slugifyTaxonomyTerm("تجربة المستخدم")).toBe("تجربة-المستخدم");
		expect(slugifyTaxonomyTerm("إعلان")).toBe("إعلان");
	});

	test("summarizes categories and tags from localized entries", () => {
		const entries = [
			createPost("one", { category: "Product", tags: ["announcement", "product"] }),
			createPost("two", { category: "Product", tags: ["product"] }),
			createPost("three", {
				category: "Design",
				language: "ar",
				tags: ["تصميم"],
				translationGroup: "design",
			}),
		];

		expect(findCategorySummary(entries, "en", "product")).toEqual({
			count: 2,
			href: "/en/blog/category/product",
			label: "Product",
			slug: "product",
		});
		expect(getTagSummaries(entries, "en")).toEqual([
			{ count: 2, href: "/en/blog/tag/product", label: "product", slug: "product" },
			{
				count: 1,
				href: "/en/blog/tag/announcement",
				label: "announcement",
				slug: "announcement",
			},
		]);
	});

	test("prefers explicit and closely related posts for related articles", () => {
		const current = createPost("current", {
			category: "Product",
			tags: ["announcement", "product"],
			translationGroup: "current",
		});
		const explicit = createPost("explicit", {
			category: "Architecture",
			publishDate: new Date("2025-03-12T09:00:00.000Z"),
			tags: ["technical"],
			translationGroup: "explicit-group",
		});
		const closeMatch = createPost("close-match", {
			category: "Product",
			publishDate: new Date("2025-03-14T09:00:00.000Z"),
			tags: ["product"],
			translationGroup: "close-match-group",
		});
		const weakMatch = createPost("weak-match", {
			category: "Design",
			publishDate: new Date("2025-03-13T09:00:00.000Z"),
			tags: ["ux"],
			translationGroup: "weak-match-group",
		});

		expect(
			getRelatedBlogPosts({
				entries: [current, explicit, closeMatch, weakMatch],
				entry: current,
				explicitEntries: [explicit],
			}).map((entry) => entry.id),
		).toEqual(["explicit", "close-match", "weak-match"]);
	});

	test("returns pagination state with neighboring links", () => {
		expect(
			getPaginationState({
				currentPage: 2,
				pathForPage: (page) => `/en/blog/page/${page}`,
				totalItems: 5,
				pageSize: 2,
			}),
		).toEqual({
			currentPage: 2,
			nextPath: "/en/blog/page/3",
			prevPath: "/en/blog/page/1",
			totalPages: 3,
		});
	});
});
