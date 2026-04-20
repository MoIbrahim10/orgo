import { t } from "../../utils/i18n";
import type { Language, TranslationKey } from "../../types/translations";
import { navigation } from "../navigation";
import type { NavLink } from "../../types/navigation";

function translateLinks(lang: Language, links: NavLink[]) {
	return links.map((link) => ({
		label: t(lang, `header.links.${link.key}` as TranslationKey),
		href: link.href,
	}));
}

export const getHeaderTranslations = (lang: Language) => ({
	logo: t(lang, "header.logo"),
	cta: t(lang, "header.cta"),
	menuLabel: t(lang, "header.menu_label" as TranslationKey),
	stickyNavLabel: t(lang, "header.sticky_nav_label" as TranslationKey),
	links: translateLinks(lang, navigation.header),
});

export const getFooterTranslations = (lang: Language) => ({
	tagline: t(lang, "footer.tagline" as TranslationKey),
	primaryTitle: t(lang, "footer.primary_title" as TranslationKey),
	resourcesTitle: t(lang, "footer.resources_title" as TranslationKey),
	socialNavLabel: t(lang, "footer.social_nav" as TranslationKey),
	linkedinAria: t(lang, "footer.linkedin_aria" as TranslationKey),
	xAria: t(lang, "footer.x_aria" as TranslationKey),
	instagramAria: t(lang, "footer.instagram_aria" as TranslationKey),
	primaryLinks: translateLinks(lang, navigation.footer.primary),
	resourceLinks: translateLinks(lang, navigation.footer.resources),
});
