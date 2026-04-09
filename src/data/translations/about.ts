import type { Language } from "../../types/translations";
import { getLocalizedPath } from "../../utils/routing";

type AboutPageContent = {
	metaTitle: string;
	title: string;
	description: string;
	intro: string;
	story: {
		eyebrow: string;
		title: string;
		body: string;
	};
	principles: {
		eyebrow: string;
		title: string;
		description: string;
		items: Array<{
			title: string;
			body: string;
		}>;
	};
	cta: {
		title: string;
		description: string;
		primaryLabel: string;
		secondaryLabel: string;
	};
};

const contentByLanguage: Record<Language, AboutPageContent> = {
	en: {
		metaTitle: "About",
		title: "About Orgo",
		description: "Learn more about the product thinking, people, and principles shaping Orgo.",
		intro:
			"Orgo is designed for people who want planning, reflection, and follow-through to live closer together.",
		story: {
			eyebrow: "Why Orgo exists",
			title: "We care about the invisible work of staying organized.",
			body: "Most productivity tools focus on visible execution. Orgo pays attention to the quieter layer underneath: rough notes, weekly reviews, product context, and the small decisions that keep work humane.",
		},
		principles: {
			eyebrow: "Principles",
			title: "A calmer standard for product decisions.",
			description:
				"The product and site are both shaped by a few principles that keep us honest as the system grows.",
			items: [
				{
					title: "Clarity before cleverness",
					body: "The product should make decisions easier to understand before it tries to impress anyone.",
				},
				{
					title: "Localization as product quality",
					body: "English and Arabic experiences deserve the same care in tone, structure, and navigation.",
				},
				{
					title: "Systems that stay readable",
					body: "We prefer reusable patterns that make the next page, section, or release easier to maintain.",
				},
			],
		},
		cta: {
			title: "Want to see how these ideas show up in the product?",
			description:
				"Explore the teams workflow, read the journal, or start a thoughtful conversation about fit.",
			primaryLabel: "See the team view",
			secondaryLabel: "Talk to Orgo",
		},
	},
	ar: {
		metaTitle: "من نحن",
		title: "عن Orgo",
		description: "تعرّف أكثر على طريقة التفكير والأشخاص والمبادئ التي تشكّل Orgo.",
		intro: "صُمّم Orgo للأشخاص الذين يريدون أن يعيش التخطيط والتأمل والمتابعة في مساحة أقرب لبعضها.",
		story: {
			eyebrow: "لماذا يوجد Orgo",
			title: "نهتم بالعمل غير المرئي المطلوب للبقاء منظمين.",
			body: "تركّز معظم أدوات الإنتاجية على التنفيذ الظاهر. أما Orgo فيمنح اهتمامًا للطبقة الأكثر هدوءًا أسفل ذلك: الملاحظات الخام، والمراجعات الأسبوعية، وسياق المنتج، والقرارات الصغيرة التي تبقي العمل إنسانيًا.",
		},
		principles: {
			eyebrow: "المبادئ",
			title: "معيار أهدأ لاتخاذ قرارات المنتج.",
			description:
				"يتشكل المنتج والموقع معًا حول عدد قليل من المبادئ التي تبقينا صادقين كلما اتسع النظام.",
			items: [
				{
					title: "الوضوح قبل الاستعراض",
					body: "يجب أن يجعل المنتج القرارات أوضح للفهم قبل أن يحاول إبهار أحد.",
				},
				{
					title: "التعريب جزء من جودة المنتج",
					body: "تستحق التجربتان العربية والإنجليزية القدر نفسه من العناية في النبرة والبنية والتنقل.",
				},
				{
					title: "أنظمة تبقى قابلة للقراءة",
					body: "نفضّل الأنماط القابلة لإعادة الاستخدام التي تجعل الصفحة أو القسم أو الإصدار التالي أسهل صيانة.",
				},
			],
		},
		cta: {
			title: "هل تريد أن ترى كيف تظهر هذه الأفكار داخل المنتج؟",
			description: "استكشف صفحة الفرق، أو اقرأ المدوّنة، أو ابدأ حوارًا متأنيًا حول الملاءمة.",
			primaryLabel: "شاهد صفحة الفرق",
			secondaryLabel: "تواصل مع Orgo",
		},
	},
};

export function getAboutPageContent(lang: Language) {
	const content = contentByLanguage[lang];

	return {
		...content,
		cta: {
			...content.cta,
			primaryHref: getLocalizedPath(lang, "/teams"),
			secondaryHref: getLocalizedPath(lang, "/contact"),
		},
	};
}
