import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getHtmlLanguage } from "../../data/site";
import { getSiteTranslations } from "../../data/translations/site";
import {
	getBlogEntrySlug,
	getBlogIndexPath,
	getBlogPostPath,
	getPublishedBlogEntries,
} from "../../utils/blog";
import { t } from "../../utils/i18n";
import { getLanguageFromParams, getLocalizedPath, getLocaleStaticPaths } from "../../utils/routing";

const rssHeader = `<?xml version="1.0" encoding="UTF-8"?>`;

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

export function getStaticPaths() {
	return getLocaleStaticPaths();
}

export const GET: APIRoute = async ({ params, request, site }) => {
	const lang = getLanguageFromParams(params.lang);
	const siteTranslations = getSiteTranslations(lang);
	const feedTitle = `${t(lang, "blog.index_title")} | ${siteTranslations.title}`;
	const feedDescription = t(lang, "blog.index_description");
	const baseUrl = site ?? new URL(request.url).origin;
	const feedLink = new URL(getBlogIndexPath(lang), baseUrl).toString();
	const feedSelfLink = new URL(getLocalizedPath(lang, "/rss.xml"), baseUrl).toString();
	const posts = getPublishedBlogEntries(await getCollection("blog"), lang);
	const lastBuildDate = (
		posts[0]?.data.updatedDate ??
		posts[0]?.data.publishDate ??
		new Date()
	).toUTCString();

	const items = posts
		.map((post) => {
			const postLink = new URL(getBlogPostPath(lang, getBlogEntrySlug(post)), baseUrl).toString();

			return `    <item>\n      <title>${escapeXml(post.data.title)}</title>\n      <description>${escapeXml(post.data.metaDescription ?? post.data.title)}</description>\n      <link>${escapeXml(postLink)}</link>\n      <guid isPermaLink="true">${escapeXml(postLink)}</guid>\n      <pubDate>${post.data.publishDate.toUTCString()}</pubDate>\n    </item>`;
		})
		.join("\n");

	const body = `${rssHeader}\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${escapeXml(feedTitle)}</title>\n    <description>${escapeXml(feedDescription)}</description>\n    <link>${escapeXml(feedLink)}</link>\n    <atom:link href="${escapeXml(feedSelfLink)}" rel="self" type="application/rss+xml" />\n    <language>${escapeXml(getHtmlLanguage(lang))}</language>\n    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`;

	return new Response(body, {
		headers: {
			"Cache-Control": "public, max-age=3600",
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
};
