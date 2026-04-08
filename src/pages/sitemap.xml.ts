import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { supportedLanguages, type Language } from "../types/translations";
import { getLocalizedPath } from "../utils/routing";

const staticRoutes = ["/", "/about", "/pricing", "/blog"] as const;
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
	const blogPosts: SitemapEntry[] = posts.map((post) => ({
		url: new URL(
			getLocalizedPath(post.data.language as Language, `/blog/${post.data.slug ?? post.id}`),
			site,
		).toString(),
		lastModified: post.data.updatedDate.toISOString(),
	}));

	const entries = [...pages, ...blogPosts];
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
