import type { Language, TranslationKey } from "../../types/translations";
import type { HomePageContent } from "../../types/home";
import { t } from "../../utils/i18n";
import { getLocalizedPath } from "../../utils/routing";

const SOCIAL_PROOF_QUOTE_COUNT = 12;

function getSocialProofTestimonials(lang: Language) {
	return Array.from({ length: SOCIAL_PROOF_QUOTE_COUNT }, (_, i) => {
		const n = String(i + 1).padStart(2, "0");
		return {
			author: t(lang, `home.social_proof.q${n}_author` as TranslationKey),
			company: t(lang, `home.social_proof.q${n}_company` as TranslationKey),
			content: t(lang, `home.social_proof.q${n}_body` as TranslationKey),
		};
	});
}

const homeEnhancements: Record<
	Language,
	Pick<HomePageContent, "proposal"> & {
		perspectivesFocusLabel: string;
	}
> = {
	en: {
		proposal: {
			eyebrow: "Why switch now",
			title:
				"If planning already lives across notes, meetings, and memory, Orgo can pull it back together.",
			description:
				"The point is not to add another productivity layer. It is to give your week a steadier home before more context disappears into scattered tools.",
			points: [
				"Keep the weekly picture visible before work fragments across tabs.",
				"Hold decisions beside the notes and follow-through they actually affect.",
				"Give bilingual teams a cleaner way to plan without splitting the operating rhythm in two.",
			],
			primaryCta: "See pricing",
			secondaryCta: "Explore bilingual planning",
		},
		perspectivesFocusLabel: "What they are trying to protect",
	},
	ar: {
		proposal: {
			eyebrow: "لماذا الآن",
			title: "إذا كان التخطيط موزعاً بين الملاحظات والاجتماعات والذاكرة، يستطيع Orgo جمعه من جديد.",
			description:
				"الفكرة ليست إضافة طبقة إنتاجية جديدة، بل إعطاء أسبوعك بيتاً أكثر ثباتاً قبل أن يختفي مزيد من السياق في أدوات متفرقة.",
			points: [
				"أبقِ صورة الأسبوع ظاهرة قبل أن يتشظى العمل بين التبويبات.",
				"ضع القرارات قرب الملاحظات والمتابعة التي تؤثر فيها فعلاً.",
				"امنح الفرق الثنائية اللغة طريقة أنظف للتخطيط من دون تقسيم الإيقاع التشغيلي إلى مسارين.",
			],
			primaryCta: "اطّلع على الأسعار",
			secondaryCta: "استكشف التخطيط الثنائي اللغة",
		},
		perspectivesFocusLabel: "ما الذي يحاولون حمايته",
	},
};

export function getHomePageContent(lang: Language): HomePageContent {
	const enhancements = homeEnhancements[lang];

	return {
		hero: {
			eyebrow: t(lang, "home.hero.eyebrow"),
			title: t(lang, "home.hero.title"),
			description: t(lang, "home.hero.description"),
			primaryCta: t(lang, "home.hero.primary_cta"),
			secondaryCta: t(lang, "home.hero.secondary_cta"),
			badges: [
				t(lang, "home.hero.badges.capture"),
				t(lang, "home.hero.badges.review"),
				t(lang, "home.hero.badges.reflect"),
			],
		},
		featureSpotlight: {
			sectionName: t(lang, "home.feature_spotlight.section_name"),
			headline: t(lang, "home.feature_spotlight.headline"),
			description: t(lang, "home.feature_spotlight.description"),
			cards: [
				{
					icon: "calendar",
					title: t(lang, "home.feature_spotlight.card_organization_title"),
					body: t(lang, "home.feature_spotlight.card_organization_body"),
				},
				{
					icon: "quadrants",
					title: t(lang, "home.feature_spotlight.card_reflection_title"),
					body: t(lang, "home.feature_spotlight.card_reflection_body"),
				},
				{
					icon: "journal",
					title: t(lang, "home.feature_spotlight.card_focus_title"),
					body: t(lang, "home.feature_spotlight.card_focus_body"),
				},
				{
					icon: "gear",
					title: t(lang, "home.feature_spotlight.card_productivity_title"),
					body: t(lang, "home.feature_spotlight.card_productivity_body"),
				},
				{
					icon: "team",
					title: t(lang, "home.feature_spotlight.card_social_title"),
					body: t(lang, "home.feature_spotlight.card_social_body"),
				},
				{
					icon: "laurel",
					title: t(lang, "home.feature_spotlight.card_privacy_title"),
					body: t(lang, "home.feature_spotlight.card_privacy_body"),
				},
			],
		},
		workspaceGlance: {
			sectionName: t(lang, "home.workspace_glance.section_name"),
			headline: t(lang, "home.workspace_glance.headline"),
			description: t(lang, "home.workspace_glance.description"),
			imageAlt: t(lang, "home.workspace_glance.image_alt"),
		},
		benefits: {
			sectionName: t(lang, "home.benefits.section_name"),
			headline: t(lang, "home.benefits.headline"),
			description: t(lang, "home.benefits.description"),
			cards: [
				{
					title: t(lang, "home.benefits.card_calendar_title"),
					body: t(lang, "home.benefits.card_calendar_body"),
					imageAlt: t(lang, "home.benefits.card_calendar_image_alt"),
				},
				{
					title: t(lang, "home.benefits.card_journal_title"),
					body: t(lang, "home.benefits.card_journal_body"),
					imageAlt: t(lang, "home.benefits.card_journal_image_alt"),
				},
				{
					title: t(lang, "home.benefits.card_tasks_title"),
					body: t(lang, "home.benefits.card_tasks_body"),
					imageAlt: t(lang, "home.benefits.card_tasks_image_alt"),
				},
				{
					title: t(lang, "home.benefits.card_integrations_title"),
					body: t(lang, "home.benefits.card_integrations_body"),
					imageAlt: t(lang, "home.benefits.card_integrations_image_alt"),
				},
			],
		},
		connectedTools: {
			sectionName: t(lang, "home.connected_tools.section_name"),
			headline: t(lang, "home.connected_tools.headline"),
			description: t(lang, "home.connected_tools.description"),
		},
		socialProof: {
			sectionName: t(lang, "home.social_proof.section_name"),
			headline: t(lang, "home.social_proof.headline"),
			description: t(lang, "home.social_proof.description"),
			testimonials: getSocialProofTestimonials(lang),
		},
		workflow: {
			eyebrow: t(lang, "home.workflow.eyebrow"),
			title: t(lang, "home.workflow.title"),
			description: t(lang, "home.workflow.description"),
			steps: [
				{
					icon: "spark",
					title: t(lang, "home.workflow.capture_title"),
					body: t(lang, "home.workflow.capture_body"),
				},
				{
					icon: "focus",
					title: t(lang, "home.workflow.clarify_title"),
					body: t(lang, "home.workflow.clarify_body"),
				},
				{
					icon: "check-circle",
					title: t(lang, "home.workflow.commit_title"),
					body: t(lang, "home.workflow.commit_body"),
				},
				{
					icon: "journal",
					title: t(lang, "home.workflow.reflect_title"),
					body: t(lang, "home.workflow.reflect_body"),
				},
			],
		},
		proposal: enhancements.proposal,
		pricing: {
			eyebrow: t(lang, "home.pricing.eyebrow"),
			title: t(lang, "home.pricing.title"),
			description: t(lang, "home.pricing.description"),
			featuresHeading: t(lang, "home.pricing.features_heading"),
			perMonth: t(lang, "home.pricing.per_month"),
			plans: [
				{
					accent: "light",
					eyebrow: t(lang, "home.pricing.starter_eyebrow"),
					title: t(lang, "pages.pricing.plans.starter.title"),
					description: t(lang, "pages.pricing.plans.starter.description"),
					features: [
						t(lang, "home.pricing.starter_point_one"),
						t(lang, "home.pricing.starter_point_two"),
						t(lang, "home.pricing.starter_point_three"),
						t(lang, "home.pricing.starter_point_four"),
					],
					price: t(lang, "home.pricing.starter_price"),
					cta: t(lang, "home.pricing.card_cta"),
					href: getLocalizedPath(lang, "/pricing"),
				},
				{
					accent: "dark",
					eyebrow: t(lang, "home.pricing.pro_eyebrow"),
					title: t(lang, "pages.pricing.plans.pro.title"),
					description: t(lang, "pages.pricing.plans.pro.description"),
					features: [
						t(lang, "home.pricing.pro_point_one"),
						t(lang, "home.pricing.pro_point_two"),
						t(lang, "home.pricing.pro_point_three"),
						t(lang, "home.pricing.pro_point_four"),
					],
					price: t(lang, "home.pricing.pro_price"),
					cta: t(lang, "home.pricing.card_cta"),
					href: getLocalizedPath(lang, "/pricing"),
				},
			],
		},
		perspectives: {
			eyebrow: t(lang, "home.proof.eyebrow"),
			title: t(lang, "home.proof.title"),
			description: t(lang, "home.proof.description"),
			focusLabel: enhancements.perspectivesFocusLabel,
			cards: [
				{
					icon: "team",
					title: t(lang, "home.proof.founders_title"),
					body: t(lang, "home.proof.founders_body"),
					focus: t(lang, "home.proof.founders_quote"),
				},
				{
					icon: "compass",
					title: t(lang, "home.proof.consultants_title"),
					body: t(lang, "home.proof.consultants_body"),
					focus: t(lang, "home.proof.consultants_quote"),
				},
				{
					icon: "leaf",
					title: t(lang, "home.proof.personal_title"),
					body: t(lang, "home.proof.personal_body"),
					focus: t(lang, "home.proof.personal_quote"),
				},
			],
		},
		cta: {
			title: t(lang, "home.cta.title"),
			description: t(lang, "home.cta.description"),
			primaryCta: t(lang, "home.cta.primary_cta"),
			secondaryCta: t(lang, "home.cta.secondary_cta"),
		},
	};
}
