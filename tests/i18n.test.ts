import { describe, expect, test } from "bun:test";
import { getHeaderTranslations } from "../src/data/translations/header";
import { defaultLang } from "../src/types/translations";
import { t, tWithParams } from "../src/utils/i18n";
import {
	buildLocalePathMap,
	getLanguageDirection,
	getLanguageFromParams,
	getLocalizedPath,
	matchPreferredLanguage,
	stripLocaleFromPath,
} from "../src/utils/routing";

describe("routing helpers", () => {
	test("builds localized paths without duplicate slashes", () => {
		expect(getLocalizedPath("en")).toBe("/en");
		expect(getLocalizedPath("en", "/pricing")).toBe("/en/pricing");
		expect(getLocalizedPath("ar", "blog/welcome-to-ordo")).toBe("/ar/blog/welcome-to-ordo");
	});

	test("falls back to the default language for unknown params", () => {
		expect(getLanguageFromParams("en")).toBe("en");
		expect(getLanguageFromParams("ar")).toBe("ar");
		expect(getLanguageFromParams("fr")).toBe(defaultLang);
	});

	test("returns the expected document direction", () => {
		expect(getLanguageDirection("en")).toBe("ltr");
		expect(getLanguageDirection("ar")).toBe("rtl");
	});

	test("builds locale path maps from a shared route", () => {
		expect(buildLocalePathMap("/pricing")).toEqual({
			en: "/en/pricing",
			ar: "/ar/pricing",
		});
	});

	test("strips locale prefixes from localized paths", () => {
		expect(stripLocaleFromPath("/en/blog/designing-focus")).toBe("/blog/designing-focus");
		expect(stripLocaleFromPath("/ar")).toBe("/");
	});

	test("matches preferred languages from regional browser locales", () => {
		expect(matchPreferredLanguage("ar-EG")).toBe("ar");
		expect(matchPreferredLanguage("en-GB")).toBe("en");
		expect(matchPreferredLanguage("fr-FR")).toBeUndefined();
	});
});

describe("translations", () => {
	test("returns translated copy for nested keys", () => {
		expect(t("en", "home.hero.title")).toBe(
			"Plan clearly. Write intentionally. Move through the week with calm.",
		);
		expect(t("ar", "header.links.blog")).toBe("المدونة");
	});

	test("returns the key when a translation is missing", () => {
		expect(t("en", "home.hero.missing" as never)).toBe("home.hero.missing");
	});

	test("formats translated strings with placeholders", () => {
		expect(
			tWithParams("en", "blog.coming_soon", {
				languages: "Arabic",
			}),
		).toBe("Coming soon in Arabic.");
	});

	test("maps translated navigation labels", () => {
		expect(getHeaderTranslations("en").links).toEqual([
			{ href: "/about", label: "About" },
			{ href: "/pricing", label: "Pricing" },
			{ href: "/blog", label: "Blog" },
		]);
	});
});
