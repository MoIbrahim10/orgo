import type { Language } from "../../types/translations";
import { getLocalizedPath } from "../../utils/routing";

type ContactFlowContent = {
	metaTitle: string;
	title: string;
	description: string;
	intro: string;
	channels: {
		sectionName: string;
		title: string;
		description: string;
	};
	emailLabel: string;
	emailValue: string;
	emailHint: string;
	githubLabel: string;
	githubValue: string;
	githubHint: string;
	conversationsIntro: {
		sectionName: string;
		title: string;
		description: string;
	};
	conversations: Array<{
		title: string;
		body: string;
		ctaLabel: string;
		href: string;
	}>;
	process: {
		sectionName: string;
		title: string;
		description: string;
		steps: Array<{
			title: string;
			body: string;
		}>;
	};
	availabilityAsideTitle: string;
	availability: Array<{
		label: string;
		value: string;
	}>;
	quickLinksLabel: string;
	faqLinkLabel: string;
	blogLinkLabel: string;
};

const contentByLanguage: Record<Language, ContactFlowContent> = {
	en: {
		metaTitle: "Contact",
		title: "Start the right conversation with Orgo",
		description:
			"Questions about early access, bilingual workflows, or how Orgo fits your routine—say hello by email.",
		intro:
			"Email is the best line. Tell us how you plan, write, and coordinate—we reply with care, usually asynchronously, and only nudge the conversation forward when it helps.",
		channels: {
			sectionName: "Direct lines",
			title: "Email or GitHub",
			description:
				"Use email for anything personal or time-sensitive. GitHub is best for code, issues, and public technical threads.",
		},
		emailLabel: "Email",
		emailValue: "hello@orgo.app",
		emailHint: "We read every message—replies are usually asynchronous.",
		githubLabel: "GitHub",
		githubValue: "https://github.com/MoIbrahim10/orgo",
		githubHint: "Source, issues, and discussions in the open.",
		conversationsIntro: {
			sectionName: "Conversations",
			title: "Pick a starting point",
			description:
				"Each path below opens a different thread—choose what matches your question.",
		},
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
			sectionName: "How it works",
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
		availabilityAsideTitle: "What to expect",
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
		quickLinksLabel: "More on the site",
		faqLinkLabel: "FAQ",
		blogLinkLabel: "Blog",
	},
	ar: {
		metaTitle: "تواصل",
		title: "ابدأ الحوار المناسب مع Orgo",
		description:
			"راسلنا—أسئلة حول الوصول المبكر، أو سير العمل الثنائي اللغة، أو كيف يناسبك Orgo.",
		intro:
			"البريد هو الخط الأنسب. أخبرنا كيف تخطّط وتكتب وتنسّق—نرد بعناية، وغالباً بشكل غير متزامن، ونكمل الحوار فقط عندما يفيد ذلك.",
		channels: {
			sectionName: "خطوط التواصل",
			title: "البريد أو جيت هب",
			description:
				"استخدم البريد لما هو شخصي أو يحتاج متابعة. جيت هب أنسب للكود والقضايا والنقاش التقني العلني.",
		},
		emailLabel: "البريد الإلكتروني",
		emailValue: "hello@orgo.app",
		emailHint: "نقرأ كل رسالة—الردود عادة غير فورية.",
		githubLabel: "جيت هب",
		githubValue: "https://github.com/MoIbrahim10/orgo",
		githubHint: "الشفرة والقضايا والنقاش في العلن.",
		conversationsIntro: {
			sectionName: "محادثات",
			title: "اختر نقطة البداية",
			description: "كل مسار أدناه يفتح موضوعًا مختلفًا—اختر ما يناسب سؤالك.",
		},
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
			sectionName: "كيف تسير المحادثة",
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
		availabilityAsideTitle: "ماذا تتوقع",
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
		quickLinksLabel: "المزيد في الموقع",
		faqLinkLabel: "الأسئلة الشائعة",
		blogLinkLabel: "المدونة",
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
	};
}
