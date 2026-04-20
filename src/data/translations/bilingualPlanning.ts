import type { Language } from "../../types/translations";
import { getLocalizedPath } from "../../utils/routing";

type BilingualPlanningPageContent = {
	metaTitle: string;
	description: string;
	hero: {
		title: string;
		description: string;
		primaryCta: string;
		secondaryCta: string;
	};
	signalsAsideTitle: string;
	signals: Array<{
		label: string;
		value: string;
	}>;
	tensions: {
		sectionName: string;
		title: string;
		description: string;
		points: string[];
	};
	playbook: {
		sectionName: string;
		title: string;
		description: string;
		steps: Array<{
			title: string;
			body: string;
		}>;
	};
	scenarios: {
		sectionName: string;
		title: string;
		description: string;
		cards: Array<{
			label: string;
			title: string;
			body: string;
		}>;
	};
	cta: {
		sectionName: string;
		headline: string;
		description: string;
		primaryLabel: string;
		secondaryLabel: string;
	};
};

const contentByLanguage: Record<Language, BilingualPlanningPageContent> = {
	en: {
		metaTitle: "Bilingual planning",
		description:
			"See how Orgo can support English and Arabic planning in one calmer weekly rhythm.",
		hero: {
			title: "Keep English and Arabic planning in the same calm operating rhythm.",
			description:
				"Orgo is being shaped for teams and personal systems that switch between languages without wanting the week itself to split into separate tools, duplicate notes, or awkward handoffs.",
			primaryCta: "Talk through the workflow",
			secondaryCta: "See team planning",
		},
		signalsAsideTitle: "What bilingual planning needs",
		signals: [
			{
				label: "One shared cadence",
				value:
					"Weekly planning, decisions, and follow-through stay visible even when language context changes.",
			},
			{
				label: "Less duplicate writing",
				value:
					"Important notes do not need to be recreated in parallel systems just to stay accessible.",
			},
			{
				label: "More respectful communication",
				value:
					"People can meet the product in the language that helps them think clearly without breaking alignment.",
			},
		],
		tensions: {
			sectionName: "Where it breaks down",
			title: "Most bilingual planning systems fail in the handoff moments.",
			description:
				"The real friction rarely comes from translation alone. It comes from decisions being separated from context, updates being rewritten from scratch, and teams losing confidence about which version of the week is current.",
			points: [
				"Planning notes end up in one language while delivery updates happen in another.",
				"People simplify their thinking just to fit the system instead of using the language that feels precise.",
				"Weekly reviews become slower because context has to be reconstructed before decisions can move forward.",
			],
		},
		playbook: {
			sectionName: "How it could work",
			title: "A calmer bilingual weekly playbook.",
			description:
				"Orgo is strongest when it gives mixed-language teams a steady rhythm rather than forcing a perfect translation layer on every interaction.",
			steps: [
				{
					title: "Start with a shared weekly frame",
					body: "Keep the commitments, focus areas, and decision trail visible first so everyone sees the same week before details diverge.",
				},
				{
					title: "Let notes stay expressive",
					body: "People should be able to capture nuance in the language that helps them think clearly while preserving the underlying context for the rest of the team.",
				},
				{
					title: "Review from one source of truth",
					body: "Weekly reflection becomes lighter when outcomes, blockers, and next steps are attached to the same operating rhythm instead of copied between surfaces.",
				},
			],
		},
		scenarios: {
			sectionName: "What that looks like",
			title: "Three situations this workflow is meant to support.",
			description:
				"These scenarios are where bilingual planning usually becomes either messy or overly rigid. Orgo aims for a calmer middle ground.",
			cards: [
				{
					label: "Product updates",
					title:
						"A product lead drafts the weekly plan in English while Arabic stakeholder notes stay close to the same decisions.",
					body: "Instead of rewriting the entire week twice, the team keeps one planning rhythm with room for language-specific detail where it matters.",
				},
				{
					label: "Meeting follow-through",
					title:
						"A mixed-language meeting ends with actions, decisions, and concerns still attached to the original context.",
					body: "That keeps Friday reviews lighter because nobody has to reconstruct why a choice was made before deciding what happens next.",
				},
				{
					label: "Personal + team context",
					title:
						"An operator can keep personal thinking in Arabic and outward-facing summaries in English without managing two systems.",
					body: "Reflection stays honest, while communication stays legible to the wider team.",
				},
			],
		},
		cta: {
			sectionName: "Next step",
			headline: "Built for teams that want bilingual clarity without double the process.",
			description:
				"If your planning rhythm keeps slipping between languages and tools, Orgo can offer a steadier center of gravity.",
			primaryLabel: "Contact Orgo",
			secondaryLabel: "Review pricing",
		},
	},
	ar: {
		metaTitle: "التخطيط الثنائي اللغة",
		description:
			"اطّلع على كيف يمكن لـ Orgo أن يدعم التخطيط العربي والإنجليزي ضمن إيقاع أسبوعي واحد أكثر هدوءًا.",
		hero: {
			title: "أبقِ التخطيط العربي والإنجليزي داخل الإيقاع التشغيلي الهادئ نفسه.",
			description:
				"يُصاغ Orgo للفرق والأنظمة الشخصية التي تنتقل بين اللغات من دون أن تريد تقسيم الأسبوع نفسه بين أدوات منفصلة أو ملاحظات مكررة أو تسليمات مربكة.",
			primaryCta: "ناقش سير العمل",
			secondaryCta: "اطّلع على تخطيط الفرق",
		},
		signalsAsideTitle: "ما يحتاجه التخطيط الثنائي",
		signals: [
			{
				label: "إيقاع مشترك",
				value: "يبقى التخطيط الأسبوعي والقرارات والمتابعة واضحة حتى عندما يتبدل السياق اللغوي.",
			},
			{
				label: "كتابة مكررة أقل",
				value: "لا تحتاج الملاحظات المهمة إلى إعادة إنشاء في أنظمة متوازية فقط لتظل متاحة.",
			},
			{
				label: "تواصل أكثر احترامًا",
				value: "يمكن للناس مقابلة المنتج باللغة التي تساعدهم على التفكير بوضوح من دون كسر الاتساق.",
			},
		],
		tensions: {
			sectionName: "أين ينهار الأمر",
			title: "تفشل معظم أنظمة التخطيط الثنائي اللغة في لحظات التسليم بين الأطراف.",
			description:
				"نادراً ما يأتي الاحتكاك من الترجمة وحدها. بل يأتي من انفصال القرارات عن سياقها، وإعادة كتابة التحديثات من الصفر، وفقدان الثقة بشأن النسخة الأحدث من الأسبوع.",
			points: [
				"تنتهي ملاحظات التخطيط بلغة بينما تحدث تحديثات التنفيذ بلغة أخرى.",
				"يبسّط الناس طريقة تفكيرهم فقط كي تناسب النظام بدلاً من استخدام اللغة الأدق بالنسبة لهم.",
				"تصبح المراجعات الأسبوعية أبطأ لأن السياق يحتاج إلى إعادة بناء قبل أن تتحرك القرارات.",
			],
		},
		playbook: {
			sectionName: "كيف يمكن أن ينجح",
			title: "دليل أسبوعي ثنائي اللغة أكثر هدوءًا.",
			description:
				"يظهر Orgo بأفضل صورة عندما يمنح الفرق المختلطة اللغة إيقاعًا ثابتًا، لا عندما يحاول فرض طبقة ترجمة مثالية على كل تفاعل.",
			steps: [
				{
					title: "ابدأ بإطار أسبوعي مشترك",
					body: "اجعل الالتزامات ونقاط التركيز وأثر القرارات واضحة أولًا حتى يرى الجميع الأسبوع نفسه قبل أن تتباين التفاصيل.",
				},
				{
					title: "دع الملاحظات تبقى معبّرة",
					body: "يجب أن يتمكن الناس من التقاط الفروق الدقيقة باللغة التي تساعدهم على التفكير بوضوح مع الحفاظ على السياق الأساسي لبقية الفريق.",
				},
				{
					title: "راجعوا من مصدر واحد للحقيقة",
					body: "تصبح المراجعة الأسبوعية أخف عندما تبقى النتائج والعوائق والخطوات التالية مرتبطة بالإيقاع نفسه بدل نسخها بين أسطح متعددة.",
				},
			],
		},
		scenarios: {
			sectionName: "كيف يبدو ذلك",
			title: "ثلاث حالات صُمم هذا الأسلوب لدعمها.",
			description:
				"هذه هي المواقف التي يصبح فيها التخطيط الثنائي اللغة إما فوضويًا أو شديد الصرامة. يهدف Orgo إلى منطقة وسط أهدأ.",
			cards: [
				{
					label: "تحديثات المنتج",
					title:
						"يكتب قائد المنتج الخطة الأسبوعية بالإنجليزية بينما تبقى ملاحظات أصحاب المصلحة بالعربية قريبة من القرارات نفسها.",
					body: "بدل إعادة كتابة الأسبوع كله مرتين، يحتفظ الفريق بإيقاع تخطيط واحد مع مساحة للتفاصيل الخاصة بكل لغة حين تكون مهمة.",
				},
				{
					label: "متابعة الاجتماعات",
					title:
						"ينتهي اجتماع مختلط اللغة فيما تبقى الإجراءات والقرارات والمخاوف مرتبطة بسياقها الأصلي.",
					body: "هذا يجعل مراجعات نهاية الأسبوع أخف لأن أحدًا لا يحتاج إلى إعادة بناء سبب اتخاذ القرار قبل تحديد الخطوة التالية.",
				},
				{
					label: "السياق الشخصي + الجماعي",
					title:
						"يمكن للمشغّل أن يحتفظ بتفكيره الشخصي بالعربية وملخصاته الخارجية بالإنجليزية من دون إدارة نظامين.",
					body: "تبقى المراجعة الذاتية صادقة، بينما تبقى المشاركة واضحة لبقية الفريق.",
				},
			],
		},
		cta: {
			sectionName: "الخطوة التالية",
			headline: "مصمم للفرق التي تريد وضوحًا ثنائي اللغة من دون مضاعفة التعقيد.",
			description:
				"إذا كان إيقاع التخطيط لديكم يتعثر بين اللغات والأدوات، فقد يمنح Orgo نقطة ارتكاز أكثر ثباتًا.",
			primaryLabel: "تواصل مع Orgo",
			secondaryLabel: "راجع الأسعار",
		},
	},
};

export function getBilingualPlanningPageContent(lang: Language) {
	const content = contentByLanguage[lang];

	return {
		...content,
		hero: {
			...content.hero,
			primaryHref: getLocalizedPath(lang, "/contact"),
			secondaryHref: getLocalizedPath(lang, "/teams"),
		},
		cta: {
			...content.cta,
			primaryHref: getLocalizedPath(lang, "/contact"),
			secondaryHref: getLocalizedPath(lang, "/pricing"),
		},
	};
}
