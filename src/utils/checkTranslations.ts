import ar from "../locales/ar.json" with { type: "json" };
import en from "../locales/en.json" with { type: "json" };
import {
	type Language,
	supportedLanguages,
	type TranslationSchema,
} from "../types/translations.ts";

const translations: Record<Language, TranslationSchema> = { en, ar };

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
	return Object.keys(obj).flatMap((key) => {
		const path = prefix ? `${prefix}.${key}` : key;
		return typeof obj[key] === "object" && obj[key] !== null
			? getKeys(obj[key] as Record<string, unknown>, path)
			: [path];
	});
}

function compareKeys() {
	const defaultKeys = getKeys(translations.en);
	let isConsistent = true;
	for (const lang of supportedLanguages) {
		if (lang === "en") continue;

		const langKeys = getKeys(translations[lang]);
		const missingKeys = defaultKeys.filter((key) => !langKeys.includes(key));
		const extraKeys = langKeys.filter((key) => !defaultKeys.includes(key));

		if (missingKeys.length || extraKeys.length) {
			isConsistent = false;
			globalThis.console.error(`🔴 Keys mismatch in ${lang}.json`);
			if (missingKeys.length) {
				globalThis.console.error("Missing keys:", missingKeys);
			}
			if (extraKeys.length) {
				globalThis.console.error("Extra keys:", extraKeys);
			}
		} else {
			globalThis.console.log(`🟢 ${lang}.json is consistent.`);
		}
	}

	if (!isConsistent) process.exit(1);
}

compareKeys();
