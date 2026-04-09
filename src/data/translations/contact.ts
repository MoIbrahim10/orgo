import type { Language } from "../../types/translations";
import { getLocalizedPath } from "../../utils/routing";

type ContactFlowContent = {
	metaTitle: string;
	title: string;
	description: string;
	intro: string;
	emailLabel: string;
	emailValue: string;
	githubLabel: string;
	githubValue: string;
	conversations: Array<{
		title: string;
		body: string;
		ctaLabel: string;
		href: string;
	}>;
	process: {
		eyebrow: string;
		title: string;
		description: string;
		steps: Array<{
			title: string;
			body: string;
		}>;
	};
	availability: Array<{
		label: string;
		value: string;
	}>;
	closing: {
		title: string;
		description: string;
		primaryLabel: string;
		secondaryLabel: string;
	};
};

const contentByLanguage: Record<Language, ContactFlowContent> = {
	en: {
		metaTitle: "Contact",
		title: "Start the right conversation with Orgo",
		description:
			"Reach out for product fit, bilingual workflow questions, early access interest, or thoughtful feedback.",
		intro:
			"The goal of the contact page is not to pressure you into a demo. It is to help you choose the conversation that actually matches where you are.",
		emailLabel: "Email",
		emailValue: "hello@orgo.app",
		githubLabel: "GitHub",
		githubValue: "https://github.com/MoIbrahim10/orgo",
		conversations: [
			{
				title: "Product fit",
				body: "Talk through whether Orgo fits your planning style, team rhythm, or bilingual workflow needs.",
				ctaLabel: "Explore features first",
				href: "/features",
			},
			{
				title: "Pricing direction",
				body: "If you want to understand where plans are headed before committing, we can start there.",
				ctaLabel: "Review pricing",
				href: "/pricing",
			},
			{
				title: "Feedback and ideas",
				body: "Share product notes, editorial suggestions, or regional UX feedback that could sharpen the product.",
				ctaLabel: "Read the changelog",
				href: "/changelog",
			},
		],
		process: {
			eyebrow: "How it works",
			title: "A calm sales flow, if sales is even the right word.",
			description:
				"The contact experience is intentionally lightweight: understand your context, reply with care, and only keep going if the conversation is useful.",
			steps: [
				{
					title: "Share context",
					body: "Tell us what you are organizing, where the friction lives today, and what you are trying to improve.",
				},
				{
					title: "Get a thoughtful reply",
					body: "Expect a human response that points you toward the most relevant page, answer, or next step.",
				},
				{
					title: "Keep it moving only if it helps",
					body: "If the fit is real, we continue. If not, the conversation should still leave you clearer than before.",
				},
			],
		},
		availability: [
			{
				label: "Best for",
				value:
					"Product feedback, early access interest, bilingual planning workflows, and calm team systems.",
			},
			{
				label: "Response rhythm",
				value: "Replies are usually thoughtful and asynchronous rather than instant.",
			},
		],
		closing: {
			title: "Prefer to learn more before reaching out?",
			description:
				"Start with the journal or the FAQ, then come back once you know which conversation you actually want.",
			primaryLabel: "Read the FAQ",
			secondaryLabel: "Open the blog",
		},
	},
	ar: {
		metaTitle: "تواصل",
		title: "ابدأ الحوار المناسب مع Orgo",
		description:
			"تواصل معنا بخصوص ملاءمة المنتج أو العمل الثنائي اللغة أو الاهتمام بالوصول المبكر أو الملاحظات المتأنية.",
		intro:
			"الهدف من صفحة التواصل ليس دفعك إلى عرض سريع، بل مساعدتك على اختيار الحوار الذي يناسب مرحلتك فعلًا.",
		emailLabel: "البريد الإلكتروني",
		emailValue: "hello@orgo.app",
		githubLabel: "جيت هب",
		githubValue: "https://github.com/MoIbrahim10/orgo",
		conversations: [
			{
				title: "ملاءمة المنتج",
				body: "ناقش ما إذا كان Orgo يناسب أسلوب تخطيطك أو إيقاع فريقك أو احتياجاتك الثنائية اللغة.",
				ctaLabel: "استكشف المزايا أولًا",
				href: "/features",
			},
			{
				title: "اتجاه التسعير",
				body: "إذا كنت تريد فهم اتجاه الباقات قبل الالتزام، يمكننا البدء من هنا.",
				ctaLabel: "راجع التسعير",
				href: "/pricing",
			},
			{
				title: "الملاحظات والأفكار",
				body: "شارك ملاحظاتك حول المنتج أو المحتوى أو تجربة المستخدم الإقليمية لتحسين التجربة.",
				ctaLabel: "اقرأ سجل التحديثات",
				href: "/changelog",
			},
		],
		process: {
			eyebrow: "كيف تسير المحادثة",
			title: "مسار مبيعات هادئ، إن صحّ أن نسميه مبيعات أصلًا.",
			description:
				"صُممت تجربة التواصل لتكون خفيفة: نفهم سياقك، نرد بعناية، ثم نواصل فقط إذا كانت الخطوة التالية مفيدة فعلًا.",
			steps: [
				{
					title: "شارك السياق",
					body: "أخبرنا بما تحاول تنظيمه، وأين يكمن الاحتكاك الآن، وما الذي ترغب في تحسينه.",
				},
				{
					title: "احصل على رد متأنٍ",
					body: "توقع ردًا بشريًا يوجهك إلى الصفحة أو الإجابة أو الخطوة التالية الأكثر صلة.",
				},
				{
					title: "واصل فقط إذا كان ذلك مفيدًا",
					body: "إذا كانت الملاءمة حقيقية نكمل، وإذا لم تكن كذلك يجب أن يتركك الحوار أوضح من قبل.",
				},
			],
		},
		availability: [
			{
				label: "الأفضل من أجله",
				value:
					"ملاحظات المنتج، والاهتمام بالوصول المبكر، وروتين التخطيط الثنائي اللغة، وأنظمة العمل الهادئة للفرق.",
			},
			{
				label: "إيقاع الرد",
				value: "الردود عادة متأنية وغير فورية بطبيعتها.",
			},
		],
		closing: {
			title: "تفضّل أن تتعرف أكثر قبل أن تتواصل؟",
			description:
				"ابدأ بالأسئلة الشائعة أو المدوّنة، ثم عد عندما يتضح لك نوع الحوار الذي تحتاجه فعلًا.",
			primaryLabel: "اقرأ الأسئلة الشائعة",
			secondaryLabel: "افتح المدوّنة",
		},
	},
};

export function getContactPageContent(lang: Language) {
	const content = contentByLanguage[lang];

	return {
		...content,
		conversations: content.conversations.map((conversation) => ({
			...conversation,
			href: getLocalizedPath(lang, conversation.href),
		})),
		closing: {
			...content.closing,
			primaryHref: getLocalizedPath(lang, "/faq"),
			secondaryHref: getLocalizedPath(lang, "/blog"),
		},
	};
}
