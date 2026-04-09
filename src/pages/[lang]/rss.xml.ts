import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getSiteTranslations } from "../../data/translations/site";
import {
	getBlogEntrySlug,
	getBlogIndexPath,
	getBlogPostPath,
	getPublishedBlogEntries,
} from "../../utils/blog";
import { t } from "../../utils/i18n";
import { getLanguageFromParams, getLocaleStaticPaths } from "../../utils/routing";

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

export const GET: APIRoute = async ({ params, site }) => {
	const lang = getLanguageFromParams(params.lang);
	const siteTranslations = getSiteTranslations(lang);
	const feedTitle = `${t(lang, "blog.index_title")} | ${siteTranslations.title}`;
	const feedDescription = t(lang, "blog.index_description");
	const feedLink = site ? new URL(getBlogIndexPath(lang), site).toString() : getBlogIndexPath(lang);
	const posts = getPublishedBlogEntries(await getCollection("blog"), lang);

	const items = posts
		.map((post) => {
			const postLink = site
				? new URL(getBlogPostPath(lang, getBlogEntrySlug(post)), site).toString()
				: getBlogPostPath(lang, getBlogEntrySlug(post));

			return `    <item>\n      <title>${escapeXml(post.data.title)}</title>\n      <description>${escapeXml(post.data.metaDescription ?? post.data.title)}</description>\n      <link>${escapeXml(postLink)}</link>\n      <guid>${escapeXml(postLink)}</guid>\n      <pubDate>${post.data.publishDate.toUTCString()}</pubDate>\n    </item>`;
		})
		.join("\n");

	const body = `${rssHeader}\n<rss version="2.0">\n  <channel>\n    <title>${escapeXml(feedTitle)}</title>\n    <description>${escapeXml(feedDescription)}</description>\n    <link>${escapeXml(feedLink)}</link>\n${items}\n  </channel>\n</rss>\n`;

	return new Response(body, {
		headers: {
			"Cache-Control": "public, max-age=3600",
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
};
