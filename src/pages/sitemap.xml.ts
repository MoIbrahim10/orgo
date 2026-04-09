import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { supportedLanguages, type Language } from "../types/translations";
import {
	getBlogCategoryPath,
	getBlogEntrySlug,
	getBlogIndexPath,
	getBlogPostPath,
	getBlogTagPath,
	getCategorySummaries,
	getPostsForCategory,
	getPostsForTag,
	getPublishedBlogEntries,
	getTagSummaries,
	getTotalPages,
} from "../utils/blog";
import { getLocalizedPath } from "../utils/routing";

const staticRoutes = [
	"/",
	"/about",
	"/teams",
	"/pricing",
	"/blog",
	"/contact",
	"/features",
	"/faq",
	"/changelog",
] as const;
const sitemapXmlHeader = `<?xml version="1.0" encoding="UTF-8"?>`;
const emptySitemap = `${sitemapXmlHeader}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" />\n`;

type SitemapEntry = {
	url: string;
	lastModified?: string;
};

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		return new Response(emptySitemap, {
			headers: {
				"Cache-Control": "public, max-age=3600",
				"Content-Type": "application/xml; charset=utf-8",
			},
		});
	}

	const posts = await getCollection("blog", ({ data }) => !data.isDraft);
	const pages: SitemapEntry[] = supportedLanguages.flatMap((lang) =>
		staticRoutes.map((route) => ({
			url: new URL(getLocalizedPath(lang, route), site).toString(),
		})),
	);
	const archivePages: SitemapEntry[] = supportedLanguages.flatMap((lang) => {
		const localizedPosts = getPublishedBlogEntries(posts, lang);
		const archiveEntries: SitemapEntry[] = [];

		for (let page = 2; page <= getTotalPages(localizedPosts.length); page += 1) {
			archiveEntries.push({
				url: new URL(getBlogIndexPath(lang, page), site).toString(),
			});
		}

		for (const category of getCategorySummaries(posts, lang)) {
			archiveEntries.push({
				url: new URL(getBlogCategoryPath(lang, category.slug), site).toString(),
			});

			for (
				let page = 2;
				page <= getTotalPages(getPostsForCategory(posts, lang, category.slug).length);
				page += 1
			) {
				archiveEntries.push({
					url: new URL(getBlogCategoryPath(lang, category.slug, page), site).toString(),
				});
			}
		}

		for (const tag of getTagSummaries(posts, lang)) {
			archiveEntries.push({
				url: new URL(getBlogTagPath(lang, tag.slug), site).toString(),
			});

			for (
				let page = 2;
				page <= getTotalPages(getPostsForTag(posts, lang, tag.slug).length);
				page += 1
			) {
				archiveEntries.push({
					url: new URL(getBlogTagPath(lang, tag.slug, page), site).toString(),
				});
			}
		}

		return archiveEntries;
	});
	const blogPosts: SitemapEntry[] = posts.map((post) => ({
		url: new URL(
			getBlogPostPath(post.data.language as Language, getBlogEntrySlug(post)),
			site,
		).toString(),
		lastModified: post.data.updatedDate.toISOString(),
	}));

	const entries = [...pages, ...archivePages, ...blogPosts];
	const body = `${sitemapXmlHeader}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
		.map(
			(entry) =>
				`  <url>\n    <loc>${escapeXml(entry.url)}</loc>${entry.lastModified ? `\n    <lastmod>${entry.lastModified}</lastmod>` : ""}\n  </url>`,
		)
		.join("\n")}\n</urlset>\n`;

	return new Response(body, {
		headers: {
			"Cache-Control": "public, max-age=3600",
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
