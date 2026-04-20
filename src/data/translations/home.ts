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
	Pick<HomePageContent, "proposal" | "stories"> & {
		perspectivesFocusLabel: string;
	}
> = {
	en: {
		stories: {
			eyebrow: "Workflow proof",
			title: "Three ways a calmer system shows up in real work.",
			description:
				"These are not abstract personas. They are the kinds of planning situations Orgo is being shaped to support from week to week.",
			outcomeLabel: "What shifts",
			cards: [
				{
					icon: "calendar",
					label: "Founder weekly review",
					title: "Close the week without reconstructing it from memory.",
					body: "A founder can gather loose notes, shipment decisions, and next-week priorities into one review instead of bouncing between chat, docs, and a half-updated list.",
					outcome: "The week ends with a sharper reset and fewer invisible leftovers.",
					cta: "See the teams page",
					href: getLocalizedPath("en", "/teams"),
				},
				{
					icon: "globe",
					label: "Bilingual team planning",
					title: "Keep English and Arabic planning in the same operating rhythm.",
					body: "Mixed-language teams can keep updates, planning notes, and shared rituals aligned without forcing everyone into a single linguistic compromise.",
					outcome: "More shared context, less translation overhead at the edges of the week.",
					cta: "Explore bilingual planning",
					href: getLocalizedPath("en", "/bilingual-planning"),
				},
				{
					icon: "journal",
					label: "Journal into action",
					title: "Let reflection change tomorrow instead of staying trapped in a note.",
					body: "A personal planner can use end-of-day writing to surface what changed, what still matters, and what deserves a cleaner decision next.",
					outcome: "Writing stays reflective, but the next step becomes easier to trust.",
					cta: "Explore features",
					href: getLocalizedPath("en", "/features"),
				},
			],
		},
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
		stories: {
			eyebrow: "إثبات سير العمل",
			title: "ثلاث طرق يظهر بها النظام الهادئ في العمل الحقيقي.",
			description:
				"هذه ليست شخصيات تسويقية مجردة، بل مواقف تخطيط فعلية يُصاغ Orgo لدعمها أسبوعاً بعد أسبوع.",
			outcomeLabel: "ما الذي يتغيّر",
			cards: [
				{
					icon: "calendar",
					label: "مراجعة أسبوعية للمؤسس",
					title: "اختم الأسبوع دون أن تعيد بناءه من الذاكرة.",
					body: "يمكن للمؤسس أن يجمع الملاحظات المتفرقة وقرارات الشحن وأولويات الأسبوع القادم في مراجعة واحدة بدلاً من التنقل بين المحادثات والمستندات والقوائم غير المكتملة.",
					outcome: "ينتهي الأسبوع بإعادة ضبط أوضح وبقايا أقل تختبئ خارج النظام.",
					cta: "اطّلع على صفحة الفرق",
					href: getLocalizedPath("ar", "/teams"),
				},
				{
					icon: "globe",
					label: "تخطيط ثنائي اللغة للفريق",
					title: "أبقِ التخطيط العربي والإنجليزي ضمن الإيقاع نفسه.",
					body: "يمكن للفرق المختلطة اللغة أن تحافظ على التحديثات وملاحظات التخطيط والطقوس المشتركة من دون إجبار الجميع على تنازل لغوي واحد.",
					outcome: "سياق مشترك أكبر، وجهد أقل للترجمة على أطراف الأسبوع.",
					cta: "استكشف التخطيط الثنائي اللغة",
					href: getLocalizedPath("ar", "/bilingual-planning"),
				},
				{
					icon: "journal",
					label: "من اليوميات إلى الفعل",
					title: "اجعل التأمل يغيّر الغد بدلاً من أن يبقى داخل ملاحظة.",
					body: "يمكن للمخطط الشخصي أن يستخدم كتابة نهاية اليوم لاكتشاف ما تغيّر وما لا يزال مهماً وما يستحق قراراً أوضح في اليوم التالي.",
					outcome: "تبقى الكتابة تأملية، لكن الخطوة التالية تصبح أوثق وأسهل.",
					cta: "استكشف المزايا",
					href: getLocalizedPath("ar", "/features"),
				},
			],
		},
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
		features: [
			{
				id: "features",
				scene: "capture",
				eyebrow: t(lang, "home.features.capture.eyebrow"),
				title: t(lang, "home.features.capture.title"),
				description: t(lang, "home.features.capture.description"),
				highlights: [
					{
						icon: "spark",
						title: t(lang, "home.features.capture.point_one_title"),
						body: t(lang, "home.features.capture.point_one_body"),
					},
					{
						icon: "layers",
						title: t(lang, "home.features.capture.point_two_title"),
						body: t(lang, "home.features.capture.point_two_body"),
					},
					{
						icon: "globe",
						title: t(lang, "home.features.capture.point_three_title"),
						body: t(lang, "home.features.capture.point_three_body"),
					},
				],
			},
			{
				id: "rhythm",
				scene: "rhythm",
				reverse: true,
				eyebrow: t(lang, "home.features.rhythm.eyebrow"),
				title: t(lang, "home.features.rhythm.title"),
				description: t(lang, "home.features.rhythm.description"),
				highlights: [
					{
						icon: "calendar",
						title: t(lang, "home.features.rhythm.point_one_title"),
						body: t(lang, "home.features.rhythm.point_one_body"),
					},
					{
						icon: "focus",
						title: t(lang, "home.features.rhythm.point_two_title"),
						body: t(lang, "home.features.rhythm.point_two_body"),
					},
					{
						icon: "wave",
						title: t(lang, "home.features.rhythm.point_three_title"),
						body: t(lang, "home.features.rhythm.point_three_body"),
					},
				],
			},
			{
				id: "journal",
				scene: "journal",
				eyebrow: t(lang, "home.features.journal.eyebrow"),
				title: t(lang, "home.features.journal.title"),
				description: t(lang, "home.features.journal.description"),
				highlights: [
					{
						icon: "journal",
						title: t(lang, "home.features.journal.point_one_title"),
						body: t(lang, "home.features.journal.point_one_body"),
					},
					{
						icon: "compass",
						title: t(lang, "home.features.journal.point_two_title"),
						body: t(lang, "home.features.journal.point_two_body"),
					},
					{
						icon: "sunrise",
						title: t(lang, "home.features.journal.point_three_title"),
						body: t(lang, "home.features.journal.point_three_body"),
					},
				],
			},
		],
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
		stories: enhancements.stories,
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
