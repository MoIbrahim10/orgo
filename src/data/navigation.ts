import type { NavigationConfig } from "../types/navigation";

export const navigation: NavigationConfig = {
	header: [
		{ key: "about", href: "/about" },
		{ key: "teams", href: "/teams" },
		{ key: "pricing", href: "/pricing" },
		{ key: "blog", href: "/blog" },
		{ key: "contact", href: "/contact" },
	],
	footer: {
		primary: [
			{ key: "about", href: "/about" },
			{ key: "teams", href: "/teams" },
			{ key: "pricing", href: "/pricing" },
			{ key: "blog", href: "/blog" },
			{ key: "contact", href: "/contact" },
		],
		resources: [
			{ key: "features", href: "/features" },
			{ key: "bilingual_planning", href: "/bilingual-planning" },
			{ key: "faq", href: "/faq" },
			{ key: "changelog", href: "/changelog" },
		],
	},
};
