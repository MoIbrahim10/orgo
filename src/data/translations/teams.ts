import type { Language } from "../../types/translations";
import { getLocalizedPath } from "../../utils/routing";

type TeamsPageContent = {
	metaTitle: string;
	metaDescription: string;
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
	pillars: {
		sectionName: string;
		title: string;
		description: string;
		items: Array<{
			title: string;
			body: string;
		}>;
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
	roster: {
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

const contentByLanguage: Record<Language, TeamsPageContent> = {
	en: {
		metaTitle: "Teams",
		metaDescription:
			"How teams use Orgo for calmer weekly planning—shared rhythm, lighter meetings, and bilingual updates in one place.",
		hero: {
			title: "A calmer rhythm for the week ahead.",
			description:
				"Give product, ops, and leadership one legible place for priorities, notes, and follow-through—without living in status meetings.",
			primaryCta: "See pricing",
			secondaryCta: "Read the journal",
		},
		signalsAsideTitle: "What teams get",
		signals: [
			{
				label: "Weekly rhythm",
				value: "Priorities, notes, and review points stay in one thread.",
			},
			{
				label: "Decision trail",
				value: "Context sticks around so choices still make sense next week.",
			},
			{
				label: "Less chasing",
				value: "See what moved, what slipped, and why—without another ping storm.",
			},
		],
		playbook: {
			sectionName: "Team playbook",
			title: "A light operating cadence everyone can trust.",
			description:
				"When updates aren’t scattered across docs, chat, and calendars, the week is easier to read—and easier to steer.",
			steps: [
				{
					title: "Monday: set commitments",
					body: "Name what matters, who owns it, and what “done” looks like before the week pulls people sideways.",
				},
				{
					title: "Midweek: surface blockers",
					body: "Shared notes and clear owners make uncertainty visible before it becomes a fire drill.",
				},
				{
					title: "Friday: reflect and reset",
					body: "Close the loop with a short review so decisions and next steps stay visible for Monday.",
				},
			],
		},
		pillars: {
			sectionName: "How we think about teams",
			title: "Clarity without extra process.",
			description: "A few habits that keep planning humane as the team grows.",
			items: [
				{
					title: "Context, not just tasks",
					body: "Goals, meeting notes, and next actions share one narrative so the work stays understandable.",
				},
				{
					title: "Reviews that don’t restart from zero",
					body: "Standups and weekly syncs feel lighter when the record is already organized.",
				},
				{
					title: "Bilingual by design",
					body: "English and Arabic stay first-class—so mixed-language teams and stakeholders aren’t an afterthought.",
				},
			],
		},
		roster: {
			sectionName: "People",
			title: "The people behind the workflow",
			description:
				"The small crew building product, editorial systems, and Arabic experience—same faces you’ll see on About.",
		},
		cta: {
			sectionName: "Next step",
			headline: "Ready to try it with your team?",
			description:
				"If you’ve outgrown chat-only planning but don’t want a heavyweight system, we’d love to help you find a fit.",
			primaryLabel: "Talk to us",
			secondaryLabel: "Back to home",
		},
	},
	ar: {
		metaTitle: "الفرق",
		metaDescription:
			"كيف تستخدم الفرق Orgo لتخطيط أسبوعي أوضح—إيقاع واحد، اجتماعات أخف، وتحديثات بلغتين في مكان واحد.",
		hero: {
			title: "إيقاع أهدأ للأسبوع القادم.",
			description:
				"امنحوا فرق المنتج والعمليات والإدارة مكانًا واحدًا واضحًا للأولويات والملاحظات والمتابعة—دون أن يصبح يومكم سلسلة اجتماعات حالة.",
			primaryCta: "اطّلع على الأسعار",
			secondaryCta: "اقرأ المدوّنة",
		},
		signalsAsideTitle: "ما الذي يتغيّر للفريق",
		signals: [
			{
				label: "إيقاع أسبوعي",
				value: "الأولويات والملاحظات ونقاط المراجعة تبقى في خيط واحد.",
			},
			{
				label: "أثر للقرارات",
				value: "السياق يبقى ظاهرًا حتى تظل القرارات مفهومة الأسبوع التالي.",
			},
			{
				label: "ضجيج أقل",
				value: "رؤية ما اكتمل وما تأخر ولماذا—دون مطاردة جديدة في المحادثات.",
			},
		],
		playbook: {
			sectionName: "دليل الفريق",
			title: "نظام خفيف يمكن الاعتماد عليه.",
			description:
				"عندما لا تتشتت التحديثات بين المستندات والمحادثات والتقويم، يصبح الأسبوع أسهل قراءة وأسهل توجيهًا.",
			steps: [
				{
					title: "بداية الأسبوع: تثبيت الالتزامات",
					body: "حدّدوا ما يهم، من يملكه، وكيف يبدو الإنجاز قبل أن يبعثر الأسبوع الجميع.",
				},
				{
					title: "منتصف الأسبوع: إبراز العوائق",
					body: "الملاحظات المشتركة والملاك الواضحون يكشفون الغموض قبل أن يتحول لأزمة وقت.",
				},
				{
					title: "نهاية الأسبوع: مراجعة وضبط",
					body: "اختموا بمراجعة قصيرة تُبقي القرارات والخطوات التالية جاهزة للاثنين.",
				},
			],
		},
		pillars: {
			sectionName: "كيف نفكر في الفرق",
			title: "وضوح دون تعقيد إضافي.",
			description: "بضع عادات تحافظ على هدوء التخطيط مع نمو الفريق.",
			items: [
				{
					title: "سياق لا قائمة مهام فقط",
					body: "الأهداف وملاحظات الاجتماعات والخطوات التالية تروي قصة واحدة يفهمها الجميع.",
				},
				{
					title: "مراجعات لا تبدأ من الصفر",
					body: "اللقاءات اليومية أو الأسبوعية أخف عندما يكون السجل مرتبًا مسبقًا.",
				},
				{
					title: "ثنائية اللغة من الأساس",
					body: "العربية والإنجليزية بنفس الاهتمام—للفرق والجهات المختلطة اللغة.",
				},
			],
		},
		roster: {
			sectionName: "الأشخاص",
			title: "من وراء سير العمل",
			description:
				"الفريق الصغير الذي يبني المنتج والأنظمة التحريرية والتجربة العربية—نفس الوجوه في صفحة عنّا.",
		},
		cta: {
			sectionName: "الخطوة التالية",
			headline: "جاهزون لتجربته مع فريقكم؟",
			description:
				"إذا تجاوزتم التخطيط عبر المحادثات ولا تريدون نظامًا ثقيلًا، يسعدنا مساعدتكم على إيجاد ما يناسبكم.",
			primaryLabel: "تواصل معنا",
			secondaryLabel: "الصفحة الرئيسية",
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
		cta: {
			...content.cta,
			primaryHref: getLocalizedPath(lang, "/contact"),
			secondaryHref: getLocalizedPath(lang, "/"),
		},
	};
}
