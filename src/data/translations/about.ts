import type { Language } from "../../types/translations";
import { getLocalizedPath } from "../../utils/routing";

type AboutPageContent = {
	metaTitle: string;
	title: string;
	description: string;
	hero: {
		intro: string;
		primaryCta: string;
		secondaryCta: string;
	};
	story: {
		sectionName: string;
		title: string;
		body: string;
		glanceTitle: string;
		glanceItems: [string, string, string];
	};
	principles: {
		sectionName: string;
		title: string;
		description: string;
		items: Array<{
			title: string;
			body: string;
		}>;
	};
	people: {
		sectionName: string;
		title: string;
		description: string;
	};
	cta: {
		sectionName: string;
		headline: string;
		description: string;
		primaryLabel: string;
		secondaryLabel: string;
	};
};

const contentByLanguage: Record<Language, AboutPageContent> = {
	en: {
		metaTitle: "About",
		title: "About Orgo",
		description:
			"Calm planning, thoughtful writing, and bilingual craft—the people and ideas behind the product.",
		hero: {
			intro:
				"We build one focused place for your calendar, notes, and tasks—so the week ahead stays legible, in English or Arabic, without the noise.",
			primaryCta: "See team workflow",
			secondaryCta: "Read the journal",
		},
		story: {
			sectionName: "Why we build",
			title: "The quiet work of staying organized matters.",
			body: "Most tools celebrate tasks shipped. We care about the layer underneath: rough notes, weekly reviews, small decisions that keep work humane—and interfaces that stay readable as the product grows.",
			glanceTitle: "At a glance",
			glanceItems: [
				"A small team across product, editorial, and Arabic experience.",
				"Bilingual routing, content, and UI details treated as one system.",
				"Decisions biased toward clarity and maintainability.",
			],
		},
		principles: {
			sectionName: "Principles",
			title: "How we judge tradeoffs.",
			description: "A short list we use to keep the product and the marketing site aligned as both evolve.",
			items: [
				{
					title: "Clarity before cleverness",
					body: "Make the next action obvious before trying to impress.",
				},
				{
					title: "Localization is product quality",
					body: "English and Arabic deserve the same care in voice, structure, and navigation.",
				},
				{
					title: "Readable systems",
					body: "Prefer patterns you can revisit and extend without untangling special cases.",
				},
			],
		},
		people: {
			sectionName: "People",
			title: "Who’s behind Orgo",
			description:
				"The folks shaping product direction, editorial voice, and bilingual polish.",
		},
		cta: {
			sectionName: "Next step",
			headline: "See the ideas in the product—or say hello.",
			description:
				"Walk the teams workflow, browse the journal, or start a conversation when you’re ready.",
			primaryLabel: "Team workflow",
			secondaryLabel: "Contact",
		},
	},
	ar: {
		metaTitle: "من نحن",
		title: "عن Orgo",
		description:
			"تخطيط هادئ، وكتابة واعية، وصنعة ثنائية اللغة—من يقف وراء المنتج وأفكاره.",
		hero: {
			intro:
				"نبني مساحة واحدة مركّزة لتقويمك وملاحظاتك ومهامك؛ لتبقى الأسابيع القادمة واضحة، بالعربية أو الإنجليزية، من دون ضوضاء.",
			primaryCta: "سير عمل الفِرق",
			secondaryCta: "اقرأ المجلة",
		},
		story: {
			sectionName: "لماذا نبني",
			title: "العمل الهادئ للبقاء منظمين يهم.",
			body: "كثير من الأدوات تحتفل بالمهام المنجزة. نحن نهتم بالطبقة تحتها: الملاحظات الخام، المراجعات الأسبوعية، القرارات الصغيرة التي تُبقي العلاقة إنسانية—وواجهات تبقى قابلة للقراءة كلما اتسع المنتج.",
			glanceTitle: "لقطة سريعة",
			glanceItems: [
				"فريق صغير يجمع المنتج والتحرير والتجربة العربية.",
				"مسارات ومحتوى وواجهة ثنائية اللغة كمنظومة واحدة.",
				"قرارات تميل إلى الوضوح وسهولة الصيانة.",
			],
		},
		principles: {
			sectionName: "المبادئ",
			title: "كيف نزن المفاضلات.",
			description: "قائمة قصيرة نلتزم بها ليبقى المنتج والموقع متسقين مع التوسع.",
			items: [
				{
					title: "الوضوح قبل الاستعراض",
					body: "اجعل الخطوة التالية واضحة قبل أن تحاول الإبهار.",
				},
				{
					title: "التعريب جودة المنتج",
					body: "العربية والإنجليزية تستحقان العناية نفسها في الصوت والبنية والتنقل.",
				},
				{
					title: "أنظمة قابلة للقراءة",
					body: "فضّل الأنماط التي يمكن إعادة استخدامها وتوسيعها دون حالات استثنائية معقّدة.",
				},
			],
		},
		people: {
			sectionName: "الفريق",
			title: "من وراء Orgo",
			description: "من يصوغ اتجاه المنتج والصوت التحريري والطبقة الثنائية اللغة.",
		},
		cta: {
			sectionName: "الخطوة التالية",
			headline: "شاهد الأفكار في المنتج أو راسلنا.",
			description: "اطّلع على سير عمل الفرق، أو تصفّح المجلة، أو ابدأ الحوار عندما يناسبك.",
			primaryLabel: "سير عمل الفرق",
			secondaryLabel: "تواصل",
		},
	},
};

export function getAboutPageContent(lang: Language) {
	const content = contentByLanguage[lang];

	return {
		...content,
		hero: {
			...content.hero,
			primaryHref: getLocalizedPath(lang, "/teams"),
			secondaryHref: getLocalizedPath(lang, "/blog"),
		},
		cta: {
			...content.cta,
			primaryHref: getLocalizedPath(lang, "/teams"),
			secondaryHref: getLocalizedPath(lang, "/contact"),
		},
	};
}

export type { AboutPageContent };
