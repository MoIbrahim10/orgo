import type { Language } from "../../types/translations";
import { getLocalizedPath } from "../../utils/routing";

type ResourcePagesContent = {
	features: {
		metaTitle: string;
		title: string;
		description: string;
		intro: string;
		closingTitle: string;
		closingDescription: string;
		primaryLabel: string;
		secondaryLabel: string;
	};
	faq: {
		metaTitle: string;
		title: string;
		description: string;
		intro: string;
		sidebarTitle: string;
		sidebarDescription: string;
		primaryLabel: string;
		secondaryLabel: string;
	};
	changelog: {
		metaTitle: string;
		title: string;
		description: string;
		intro: string;
		sidebarTitle: string;
		sidebarDescription: string;
		primaryLabel: string;
		secondaryLabel: string;
	};
};

const contentByLanguage: Record<Language, ResourcePagesContent> = {
	en: {
		features: {
			metaTitle: "Features",
			title: "The product qualities that make Orgo feel calm",
			description:
				"Explore how capture, weekly rhythm, and bilingual product systems come together in Orgo.",
			intro:
				"This page is less about checkbox features and more about the qualities that make the product easier to trust over time.",
			closingTitle: "Want to see how these features fit together in practice?",
			closingDescription:
				"Start with the teams page for workflow context, or move straight into a conversation about fit.",
			primaryLabel: "See teams",
			secondaryLabel: "Talk to Orgo",
		},
		faq: {
			metaTitle: "FAQ",
			title: "Questions people usually ask before they commit",
			description:
				"Get quick answers about fit, bilingual support, workflows, and how to start a conversation with Orgo.",
			intro:
				"The goal here is clarity. If a question deserves a human conversation instead, the contact flow is close by.",
			sidebarTitle: "Still deciding?",
			sidebarDescription:
				"Use the FAQ to get oriented, then move to features, pricing, or contact depending on what you need next.",
			primaryLabel: "Explore features",
			secondaryLabel: "Contact Orgo",
		},
		changelog: {
			metaTitle: "Changelog",
			title: "A running record of what changed and why",
			description: "Follow the product, site, and editorial improvements shaping Orgo over time.",
			intro:
				"The changelog is meant to build trust. It captures the reasoning behind changes, not just the surface-level headline.",
			sidebarTitle: "Follow the product arc",
			sidebarDescription:
				"If you want the fuller story behind the product direction, pair the changelog with the journal and the features page.",
			primaryLabel: "Read the journal",
			secondaryLabel: "Open features",
		},
	},
	ar: {
		features: {
			metaTitle: "المزايا",
			title: "خصائص المنتج التي تجعل Orgo يبدو هادئًا",
			description: "اكتشف كيف تجتمع طبقة الالتقاط والإيقاع الأسبوعي والبنية الثنائية اللغة داخل Orgo.",
			intro:
				"هذه الصفحة أقل اهتمامًا بعدّ المزايا وأكثر اهتمامًا بالصفات التي تجعل المنتج أسهل ثقة واستمرارًا مع الوقت.",
			closingTitle: "هل تريد أن ترى كيف تجتمع هذه المزايا عمليًا؟",
			closingDescription: "ابدأ بصفحة الفرق لفهم سير العمل، أو انتقل مباشرة إلى حوار حول الملاءمة.",
			primaryLabel: "استكشف صفحة الفرق",
			secondaryLabel: "تواصل مع Orgo",
		},
		faq: {
			metaTitle: "الأسئلة الشائعة",
			title: "الأسئلة التي يطرحها الناس غالبًا قبل الالتزام",
			description:
				"احصل على إجابات سريعة حول الملاءمة ودعم اللغتين وسير العمل وكيفية بدء الحوار مع Orgo.",
			intro: "الهدف هنا هو الوضوح. وإذا كان السؤال يستحق حوارًا بشريًا، فمسار التواصل قريب منك.",
			sidebarTitle: "ما زلت تقرر؟",
			sidebarDescription:
				"استخدم هذه الصفحة لتكوين صورة أوضح، ثم انتقل إلى المزايا أو التسعير أو التواصل بحسب ما تحتاجه بعد ذلك.",
			primaryLabel: "استكشف المزايا",
			secondaryLabel: "تواصل مع Orgo",
		},
		changelog: {
			metaTitle: "سجل التحديثات",
			title: "سجل متواصل لما تغيّر ولماذا",
			description:
				"تابع التحسينات التي تشكّل Orgo عبر المنتج والموقع والطبقة التحريرية مع مرور الوقت.",
			intro: "صُمم سجل التحديثات لبناء الثقة. فهو يلتقط منطق التغييرات لا مجرد العنوان السريع لها.",
			sidebarTitle: "تابع مسار المنتج",
			sidebarDescription:
				"إذا أردت القصة الكاملة وراء اتجاه المنتج، فاقرأ سجل التحديثات إلى جانب المدوّنة وصفحة المزايا.",
			primaryLabel: "اقرأ المدوّنة",
			secondaryLabel: "افتح صفحة المزايا",
		},
	},
};

export function getResourcePagesContent(lang: Language) {
	const content = contentByLanguage[lang];

	return {
		features: {
			...content.features,
			primaryHref: getLocalizedPath(lang, "/teams"),
			secondaryHref: getLocalizedPath(lang, "/contact"),
		},
		faq: {
			...content.faq,
			primaryHref: getLocalizedPath(lang, "/features"),
			secondaryHref: getLocalizedPath(lang, "/contact"),
		},
		changelog: {
			...content.changelog,
			primaryHref: getLocalizedPath(lang, "/blog"),
			secondaryHref: getLocalizedPath(lang, "/features"),
		},
	};
}
