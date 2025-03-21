import { t } from '../../utils/i18n';
import type { Language, TranslationKey } from '../../types/translations';
import { navigation } from '../navigation';

export const getHeaderTranslations = (lang: Language) => ({
  logo: t(lang, "header.logo"),
  cta: t(lang, "header.cta"),
  links: navigation.header.map(link => ({
    label: t(lang, `header.links.${link.key}` as TranslationKey),
    href: link.href,
  })),
});
