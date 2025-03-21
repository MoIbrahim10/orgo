import { t } from '../../utils/i18n';
import type { Language } from '../../types/translations';

export const getHeroTranslations = (lang: Language) => ({
  banner: t(lang, "hero.banner"),
  title: t(lang, "hero.title"),
  description: t(lang, "hero.description"),
  ctaPrimary: t(lang, "hero.cta_primary"),
  ctaSecondary: t(lang, "hero.cta_secondary"),
});
