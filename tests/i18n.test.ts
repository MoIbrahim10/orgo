import { describe, expect, test } from "bun:test";
import { getHeaderTranslations } from "../src/data/translations/header";
import { defaultLang } from "../src/types/translations";
import { t } from "../src/utils/i18n";
import {
	getLanguageDirection,
	getLanguageFromParams,
	getLocalizedPath,
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
});

describe("translations", () => {
	test("returns translated copy for nested keys", () => {
		expect(t("en", "hero.title")).toBe("Your Life, Beautifully Organized");
		expect(t("ar", "header.links.blog")).toBe("المدونة");
	});

	test("returns the key when a translation is missing", () => {
		expect(t("en", "hero.missing" as never)).toBe("hero.missing");
	});

	test("maps translated navigation labels", () => {
		expect(getHeaderTranslations("en").links).toEqual([
			{ href: "/about", label: "About" },
			{ href: "/pricing", label: "Pricing" },
			{ href: "/blog", label: "Blog" },
		]);
	});
});
