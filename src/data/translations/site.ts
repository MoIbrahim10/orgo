import { t } from '../../utils/i18n';
import type { Language } from '../../types/translations';

export const getSiteTranslations = (lang: Language) => ({
  title: t(lang, "site.title"),
});
