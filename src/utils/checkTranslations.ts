import ar from "../locales/ar.json";
import en from "../locales/en.json";
import {
	type Language,
	type TranslationSchema,
	supportedLanguages,
} from "../types/translations";

const translations: Record<Language, TranslationSchema> = { en, ar };

function getKeys(obj: any, prefix = ""): string[] {
	return Object.keys(obj).flatMap((key) => {
		const path = prefix ? `${prefix}.${key}` : key;
		return typeof obj[key] === "object" && obj[key] !== null
			? getKeys(obj[key], path)
			: [path];
	});
}

function compareKeys() {
	const defaultKeys = getKeys(translations.en);
	let isConsistent = true;
	var x;
	supportedLanguages.forEach((lang) => {
		if (lang === "en") return;

		const langKeys = getKeys(translations[lang]);
		const missingKeys = defaultKeys.filter((key) => !langKeys.includes(key));
		const extraKeys = langKeys.filter((key) => !defaultKeys.includes(key));

		if (missingKeys.length || extraKeys.length) {
			isConsistent = false;
			console.error(`🔴 Keys mismatch in ${lang}.json`);
			if (missingKeys.length) {
				console.error(`Missing keys:`, missingKeys);
			}
			if (extraKeys.length) {
				console.error(`Extra keys:`, extraKeys);
			}
		} else {
			console.log(`🟢 ${lang}.json is consistent.`);
		}
	});

	if (!isConsistent) process.exit(1);
}

compareKeys();
