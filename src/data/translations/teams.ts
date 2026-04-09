import type { Language } from "../../types/translations";
import { getLocalizedPath } from "../../utils/routing";

type TeamsPageContent = {
	hero: {
		eyebrow: string;
		title: string;
		description: string;
		primaryCta: string;
		secondaryCta: string;
	};
	signals: Array<{
		label: string;
		value: string;
	}>;
	pillars: Array<{
		title: string;
		body: string;
	}>;
	playbook: {
		eyebrow: string;
		title: string;
		description: string;
		steps: Array<{
			title: string;
			body: string;
		}>;
	};
	roster: {
		eyebrow: string;
		title: string;
		description: string;
	};
	closing: {
		title: string;
		description: string;
		primaryCta: string;
		secondaryCta: string;
	};
};

const contentByLanguage: Record<Language, TeamsPageContent> = {
	en: {
		hero: {
			eyebrow: "For teams",
			title: "Run calmer weekly planning with fewer status meetings.",
			description:
				"Orgo gives product, operations, and leadership teams a shared rhythm for commitments, decisions, and follow-through without turning every update into another meeting.",
			primaryCta: "See pricing",
			secondaryCta: "Read the journal",
		},
		signals: [
			{
				label: "Weekly rhythm",
				value: "Shared priorities, notes, and review points in one place.",
			},
			{
				label: "Decision trail",
				value: "Capture context so choices stay understandable a week later.",
			},
			{
				label: "Team calm",
				value: "Less chasing. More clarity about what moved, what slipped, and why.",
			},
		],
		pillars: [
			{
				title: "Plan with context, not just task lists",
				body: "Bring goals, meeting notes, and next actions into the same flow so people can see the story behind the work.",
			},
			{
				title: "Review without rebuilding the narrative",
				body: "Standups and weekly reviews become lighter when the project record is already organized before the meeting starts.",
			},
			{
				title: "Keep the team aligned across languages",
				body: "The product foundation already supports bilingual publishing, which makes it easier to communicate with mixed-language teams and stakeholders.",
			},
		],
		playbook: {
			eyebrow: "Team playbook",
			title: "A focused weekly operating rhythm.",
			description:
				"Instead of scattered updates across docs, chats, and calendars, Orgo supports a lightweight cadence the whole team can trust.",
			steps: [
				{
					title: "Monday: capture commitments",
					body: "Write what matters this week, who owns it, and what success should look like before momentum starts pulling people in different directions.",
				},
				{
					title: "Midweek: surface blockers early",
					body: "Use shared notes and tagged workstreams to spot uncertainty before it becomes last-minute firefighting.",
				},
				{
					title: "Friday: reflect and reset",
					body: "Close the loop with a short review that keeps decisions, outcomes, and next steps visible for the following week.",
				},
			],
		},
		roster: {
			eyebrow: "People",
			title: "The people shaping the workflow",
			description:
				"Orgo's team view feels stronger when the people behind product, editorial systems, and Arabic experience stay visible.",
		},
		closing: {
			title: "Built for teams that want clarity without extra process.",
			description:
				"If your team is outgrowing chat-based planning but not looking for a heavier system, Orgo can be the calmer middle ground.",
			primaryCta: "Talk through pricing",
			secondaryCta: "Explore the homepage",
		},
	},
	ar: {
		hero: {
			eyebrow: "للفرق",
			title: "نظّموا التخطيط الأسبوعي بهدوء واجتماعات أقل.",
			description:
				"يساعد Orgo فرق المنتج والعمليات والإدارة على بناء إيقاع مشترك للالتزامات والقرارات والمتابعة دون تحويل كل تحديث إلى اجتماع جديد.",
			primaryCta: "اطّلع على الأسعار",
			secondaryCta: "اقرأ المدوّنة",
		},
		signals: [
			{ label: "إيقاع أسبوعي", value: "أولويات وملاحظات ونقاط مراجعة مشتركة في مكان واحد." },
			{ label: "أثر للقرارات", value: "احتفظ بالسياق حتى تبقى القرارات مفهومة بعد أيام." },
			{ label: "هدوء للفريق", value: "مطاردة أقل وتوضيح أكبر لما أُنجز وما تأخر ولماذا." },
		],
		pillars: [
			{
				title: "خطّطوا مع السياق لا مع قائمة مهام فقط",
				body: "اجمعوا الأهداف وملاحظات الاجتماعات والخطوات التالية في تدفق واحد حتى يرى الجميع الصورة الكاملة وراء العمل.",
			},
			{
				title: "راجعوا التقدم دون إعادة سرد القصة",
				body: "تصبح الاجتماعات اليومية أو الأسبوعية أخف عندما يكون سجل العمل منظمًا مسبقًا قبل بدء الاجتماع.",
			},
			{
				title: "حافظوا على الاتساق بين اللغات",
				body: "الأساس الحالي للمنتج يدعم النشر بلغتين، مما يساعد الفرق المختلطة اللغة على مشاركة التحديثات بثقة.",
			},
		],
		playbook: {
			eyebrow: "إيقاع الفريق",
			title: "نظام أسبوعي عملي وواضح.",
			description:
				"بدلًا من تشتيت التحديثات بين المستندات والمحادثات والتقويم، يوفّر Orgo إيقاعًا خفيفًا يمكن للفريق الوثوق به.",
			steps: [
				{
					title: "بداية الأسبوع: تثبيت الالتزامات",
					body: "اكتبوا ما يهم هذا الأسبوع، ومن يملكه، وكيف يبدو النجاح قبل أن يبدأ التشتت في سحب الفريق في اتجاهات مختلفة.",
				},
				{
					title: "منتصف الأسبوع: كشف العوائق مبكرًا",
					body: "استخدموا الملاحظات المشتركة وتصنيف مسارات العمل لرصد الغموض قبل أن يتحول إلى ضغط في اللحظة الأخيرة.",
				},
				{
					title: "نهاية الأسبوع: مراجعة وإعادة ضبط",
					body: "اختموا الأسبوع بمراجعة قصيرة تُبقي القرارات والنتائج والخطوات التالية واضحة للأسبوع القادم.",
				},
			],
		},
		roster: {
			eyebrow: "الأشخاص",
			title: "الأشخاص الذين يصوغون سير العمل",
			description:
				"تبدو طبقة الفرق في Orgo أقوى عندما يبقى الأشخاص وراء المنتج والمحتوى والتجربة العربية ظاهرين وواضحين.",
		},
		closing: {
			title: "مصمم للفرق التي تريد وضوحًا دون تعقيد إضافي.",
			description:
				"إذا كان فريقك تجاوز التخطيط عبر المحادثات لكنه لا يريد نظامًا أثقل، فقد يكون Orgo هو المساحة الهادئة المناسبة بينهما.",
			primaryCta: "تحدّث عن الأسعار",
			secondaryCta: "استكشف الصفحة الرئيسية",
		},
	},
};

export function getTeamsPageContent(lang: Language) {
	const content = contentByLanguage[lang];

	return {
		...content,
		hero: {
			...content.hero,
			primaryHref: getLocalizedPath(lang, "/pricing"),
			secondaryHref: getLocalizedPath(lang, "/blog"),
		},
		closing: {
			...content.closing,
			primaryHref: getLocalizedPath(lang, "/contact"),
			secondaryHref: getLocalizedPath(lang, "/"),
		},
	};
}
