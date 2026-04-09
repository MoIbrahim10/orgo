import interLatin400Url from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import playfairDisplayLatin600Url from "@fontsource/playfair-display/files/playfair-display-latin-600-normal.woff2?url";

export const englishTypography = {
	displayFamily: "Playfair Display",
	preload: [
		{
			href: interLatin400Url,
			type: "font/woff2",
		},
		{
			href: playfairDisplayLatin600Url,
			type: "font/woff2",
		},
	],
	sansFamily: "Inter",
} as const;
