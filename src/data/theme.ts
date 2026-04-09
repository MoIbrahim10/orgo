export const themeStorageKey = "orgo.theme" as const;

export const themeMetaColors = {
	dark: "#0c0c0c",
	light: "#f8fafc",
} as const;

export type ThemePreference = keyof typeof themeMetaColors | "system";
export type ResolvedTheme = keyof typeof themeMetaColors;
