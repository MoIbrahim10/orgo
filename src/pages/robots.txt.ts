import type { APIRoute } from "astro";

function getRobotsTxt(site?: URL): string {
	const lines = ["User-agent: *", "Allow: /"];

	if (site) {
		lines.push("", `Sitemap: ${new URL("sitemap.xml", site).href}`);
	}

	return `${lines.join("\n")}\n`;
}

export const GET: APIRoute = ({ site }) =>
	new Response(getRobotsTxt(site), {
		headers: {
			"Cache-Control": "public, max-age=3600",
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
