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
	links: translateLinks(lang, navigation.header),
});

export const getFooterTranslations = (lang: Language) => ({
	links: translateLinks(lang, navigation.footer),
});
