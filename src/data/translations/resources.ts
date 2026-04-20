import type { Language } from "../../types/translations";
import { getLocalizedPath } from "../../utils/routing";

type ResourcePagesContent = {
	features: {
		metaTitle: string;
		title: string;
		description: string;
		intro: string;
		cta: {
			sectionName: string;
			headline: string;
			description: string;
			primaryLabel: string;
			secondaryLabel: string;
		};
		benefitsAsideTitle: string;
	};
	faq: {
		metaTitle: string;
		title: string;
		description: string;
		intro: string;
		sidebarTitle: string;
		sidebarDescription: string;
		sidebarSectionName: string;
		categoriesLabel: string;
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
		sidebarSectionName: string;
		countLabels: {
			launch: string;
			improvement: string;
			note: string;
		};
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
			benefitsAsideTitle: "Why this matters",
			cta: {
				sectionName: "Next step",
				headline: "Want to see how these features fit together in practice?",
				description:
					"Start with the teams page for workflow context, or move straight into a conversation about fit.",
				primaryLabel: "See teams",
				secondaryLabel: "Talk to Orgo",
			},
		},
		faq: {
			metaTitle: "FAQ",
			title: "Questions people usually ask before they commit",
			description:
				"Get quick answers about fit, bilingual support, workflows, and how to start a conversation with Orgo.",
			intro:
				"The goal here is clarity. If a question deserves a human conversation instead, the contact flow is close by.",
			sidebarSectionName: "Quick paths",
			sidebarTitle: "Still deciding?",
			sidebarDescription:
				"Use the FAQ to get oriented, then move to features, pricing, or contact depending on what you need next.",
			categoriesLabel: "Categories",
			primaryLabel: "Explore features",
			secondaryLabel: "Contact Orgo",
		},
		changelog: {
			metaTitle: "Changelog",
			title: "A running record of what changed and why",
			description: "Follow the product, site, and editorial improvements shaping Orgo over time.",
			intro:
				"The changelog is meant to build trust. It captures the reasoning behind changes, not just the surface-level headline.",
			sidebarSectionName: "Summary",
			sidebarTitle: "Follow the product arc",
			sidebarDescription:
				"If you want the fuller story behind the product direction, pair the changelog with the journal and the features page.",
			countLabels: {
				launch: "Foundation releases",
				improvement: "Improvements",
				note: "Notes",
			},
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
			benefitsAsideTitle: "لماذا يهم هذا",
			cta: {
				sectionName: "الخطوة التالية",
				headline: "هل تريد أن ترى كيف تجتمع هذه المزايا عمليًا؟",
				description: "ابدأ بصفحة الفرق لفهم سير العمل، أو انتقل مباشرة إلى حوار حول الملاءمة.",
				primaryLabel: "استكشف صفحة الفرق",
				secondaryLabel: "تواصل مع Orgo",
			},
		},
		faq: {
			metaTitle: "الأسئلة الشائعة",
			title: "الأسئلة التي يطرحها الناس غالبًا قبل الالتزام",
			description:
				"احصل على إجابات سريعة حول الملاءمة ودعم اللغتين وسير العمل وكيفية بدء الحوار مع Orgo.",
			intro: "الهدف هنا هو الوضوح. وإذا كان السؤال يستحق حوارًا بشريًا، فمسار التواصل قريب منك.",
			sidebarSectionName: "مسار سريع",
			sidebarTitle: "ما زلت تقرر؟",
			sidebarDescription:
				"استخدم هذه الصفحة لتكوين صورة أوضح، ثم انتقل إلى المزايا أو التسعير أو التواصل بحسب ما تحتاجه بعد ذلك.",
			categoriesLabel: "الموضوعات",
			primaryLabel: "استكشف المزايا",
			secondaryLabel: "تواصل مع Orgo",
		},
		changelog: {
			metaTitle: "سجل التحديثات",
			title: "سجل متواصل لما تغيّر ولماذا",
			description:
				"تابع التحسينات التي تشكّل Orgo عبر المنتج والموقع والطبقة التحريرية مع مرور الوقت.",
			intro: "صُمم سجل التحديثات لبناء الثقة. فهو يلتقط منطق التغييرات لا مجرد العنوان السريع لها.",
			sidebarSectionName: "ملخص",
			sidebarTitle: "تابع مسار المنتج",
			sidebarDescription:
				"إذا أردت القصة الكاملة وراء اتجاه المنتج، فاقرأ سجل التحديثات إلى جانب المدوّنة وصفحة المزايا.",
			countLabels: {
				launch: "إصدارات تأسيسية",
				improvement: "تحسينات",
				note: "ملاحظات",
			},
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
			cta: {
				...content.features.cta,
				primaryHref: getLocalizedPath(lang, "/teams"),
				secondaryHref: getLocalizedPath(lang, "/contact"),
			},
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
