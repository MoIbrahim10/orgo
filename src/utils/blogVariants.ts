import type { CollectionEntry } from "astro:content";
import { formatLocalizedDate, getLocaleConfig } from "../data/site";
import type { Language } from "../types/translations";
import {
	getBlogCategoryPath,
	getBlogEntrySlug,
	getBlogPostPath,
	getBlogTagPath,
	getCategorySlug,
	getPublishedBlogEntries,
	getTagSlug,
} from "./blog";

type StoryEditorialCopy = {
	label: string;
	deck: string;
	excerpt: string;
	summary: string;
	takeaway: string;
	context: string;
	highlights: [string, string, string];
	readingMinutes: number;
};

export type EditorialArchiveCopy = {
	pageTitle: string;
	pageDescription: string;
	heroTitle: string;
	heroLead: string;
	heroSummaryTitle: string;
	heroSummaryItems: [string, string, string];
	statementTitle: string;
	statementBody: string;
	statementPoints: [string, string, string];
	newsletterTitle: string;
	newsletterBody: string;
	newsletterPoints: [string, string, string];
	newsletterNote: string;
	featuredLabel: string;
	recentLabel: string;
	allStoriesLabel: string;
	sidebarTitle: string;
	sidebarLead: string;
	readingTimePrefix: string;
	publishedLabel: string;
	updatedLabel: string;
	keyTakeawayLabel: string;
	summaryLabel: string;
	contextLabel: string;
	highlightsLabel: string;
	authorLabel: string;
	focusAreasLabel: string;
	timelineLabel: string;
	archiveLabel: string;
	curatedLabel: string;
};

export type EditorialTag = {
	label: string;
	slug: string;
	href: string;
};

export type EditorialPost = {
	entry: CollectionEntry<"blog">;
	authorAvailability?: string;
	authorEmail?: string;
	authorLocation?: string;
	authorName: string;
	authorRole?: string;
	authorSummary?: string;
	categoryHref: string;
	context: string;
	deck: string;
	excerpt: string;
	highlights: [string, string, string];
	href: string;
	id: string;
	imageAlt: string;
	label: string;
	publishDate: Date;
	publishedLabel: string;
	readingMinutes: number;
	readingTimeLabel: string;
	sequence: string;
	slug: string;
	summary: string;
	tagLinks: EditorialTag[];
	takeaway: string;
	title: string;
	translationGroup: string;
	updatedLabel?: string;
};

const editorialUiCopy: Record<Language, EditorialArchiveCopy> = {
	en: {
		pageTitle: "Journal",
		pageDescription:
			"A calmer record of product decisions, design craft, bilingual UX work, and technical thinking from inside Orgo.",
		heroTitle: "A calm record of how Orgo is built",
		heroLead:
			"Product decisions, interface notes, bilingual lessons, and architectural thinking gathered in one place so readers can move from context to detail without the usual blog noise.",
		heroSummaryTitle: "Inside the journal",
		heroSummaryItems: [
			"Launch notes that explain scope and trade-offs.",
			"Design essays about attention, hierarchy, and bilingual rhythm.",
			"Technical write-ups that keep the system legible as it grows.",
		],
		statementTitle: "Why we write",
		statementBody:
			"We treat the journal as part of the product. It is where decisions become legible: what changed, why it mattered, and how the next layer of work stays coherent.",
		statementPoints: [
			"Explain the reasoning, not just the release.",
			"Keep product language calm, precise, and useful.",
			"Leave enough context for future readers to pick up the thread.",
		],
		newsletterTitle: "Curate your inbox",
		newsletterBody:
			"Occasional letters for readers who want the strongest pieces, the clearest takeaways, and the quieter side of product work.",
		newsletterPoints: [
			"Fresh essays and release notes worth keeping.",
			"Design and language observations that rarely fit inside a changelog.",
			"A light cadence that respects focus instead of chasing attention.",
		],
		newsletterNote:
			"Email opens a prefilled subscription note to the team. RSS stays available for readers who prefer a feed reader.",
		featuredLabel: "Featured story",
		recentLabel: "Recent notes",
		allStoriesLabel: "All stories",
		sidebarTitle: "Explore the journal",
		sidebarLead: "Browse by topic, category, or the questions each piece helps answer.",
		readingTimePrefix: "min read",
		publishedLabel: "Published",
		updatedLabel: "Updated",
		keyTakeawayLabel: "Key takeaway",
		summaryLabel: "Summary",
		contextLabel: "Context",
		highlightsLabel: "Highlights",
		authorLabel: "Written by",
		focusAreasLabel: "Focus areas",
		timelineLabel: "Journal timeline",
		archiveLabel: "Browse archive",
		curatedLabel: "Curated themes",
	},
	ar: {
		pageTitle: "المجلة",
		pageDescription:
			"سجلّ أهدأ لقرارات المنتج وحرفية التصميم وتجربة الاستخدام ثنائية اللغة والتفكير التقني داخل Orgo.",
		heroTitle: "سجل هادئ لكيف نبني Orgo",
		heroLead:
			"قرارات المنتج وملاحظات الواجهة ودروس العمل ثنائي اللغة والتفكير المعماري في مكان واحد، كي ينتقل القارئ من السياق إلى التفاصيل بلا ضوضاء المدونات المعتادة.",
		heroSummaryTitle: "ما الذي ستجده هنا",
		heroSummaryItems: [
			"ملاحظات إطلاق تشرح النطاق والمفاضلات بوضوح.",
			"مقالات تصميم عن الانتباه والهرمية وإيقاع الواجهات ثنائية اللغة.",
			"كتابات تقنية تُبقي النظام مفهوماً مع نموّه.",
		],
		statementTitle: "لماذا نكتب",
		statementBody:
			"نتعامل مع المجلة كجزء من المنتج نفسه. هنا تصبح القرارات واضحة: ما الذي تغيّر، ولماذا كان مهماً، وكيف يبقى العمل التالي متماسكاً.",
		statementPoints: [
			"نشرح منطق القرار لا الإعلان فقط.",
			"نحافظ على لغة هادئة ودقيقة ومفيدة.",
			"نترك سياقاً كافياً لمن يعود إلى الخيط لاحقاً.",
		],
		newsletterTitle: "رتّب صندوق بريدك",
		newsletterBody:
			"رسائل متباعدة لمن يريد أفضل المقالات وأوضح الخلاصات والجانب الهادئ من عمل المنتج.",
		newsletterPoints: [
			"مقالات وملاحظات إصدار تستحق الاحتفاظ بها.",
			"ملاحظات تصميم ولغة لا تجد مكانها عادة داخل سجل التغييرات.",
			"إيقاع خفيف يحترم التركيز بدل أن يطارده.",
		],
		newsletterNote:
			"زر البريد يفتح رسالة اشتراك جاهزة للفريق، وتبقى RSS متاحة لمن يفضّل قارئات الخلاصات.",
		featuredLabel: "المقال الأبرز",
		recentLabel: "أحدث الملاحظات",
		allStoriesLabel: "كل المقالات",
		sidebarTitle: "استكشف المجلة",
		sidebarLead: "تصفّح حسب الموضوع أو التصنيف أو السؤال الذي تساعدك كل قطعة على فهمه.",
		readingTimePrefix: "دقائق قراءة",
		publishedLabel: "نُشر",
		updatedLabel: "حُدِّث",
		keyTakeawayLabel: "الخلاصة الأساسية",
		summaryLabel: "ملخص",
		contextLabel: "السياق",
		highlightsLabel: "أبرز النقاط",
		authorLabel: "بقلم",
		focusAreasLabel: "مجالات التركيز",
		timelineLabel: "التسلسل الزمني",
		archiveLabel: "تصفّح الأرشيف",
		curatedLabel: "محاور منتقاة",
	},
};

const storyCopy: Record<Language, Record<string, StoryEditorialCopy>> = {
	en: {
		introduction: {
			label: "Launch note",
			deck: "The launch story behind Orgo and the product choices that shaped its first public release.",
			excerpt:
				"Orgo did not begin as a feature checklist. It started as a quieter question: how can planning feel deliberate again when calendars, notes, and responsibilities keep fragmenting attention? This opening note explains what we chose to build first, what we left out, and why calmness is a product requirement rather than a cosmetic layer.",
			summary:
				"A grounded introduction to Orgo's purpose, early constraints, and the product values guiding the roadmap.",
			takeaway: "A planning tool earns trust by reducing noise before it adds power.",
			context:
				"Published alongside the first public look at the workspace, when launch scope mattered as much as launch polish.",
			highlights: [
				"What Orgo is designed to replace in a fragmented weekly workflow.",
				"The trade-offs behind the first release.",
				"Why calmness is treated as a product principle, not a decorative mood.",
			],
			readingMinutes: 4,
		},
		focus: {
			label: "Design essay",
			deck: "A closer look at the interaction, typography, and bilingual design decisions that protect attention in day-to-day use.",
			excerpt:
				"Designing for focus in Orgo means treating every interruption as a cost. This piece breaks down the small decisions that make the product feel lighter to use: fewer competing actions, steadier rhythm between Arabic and English layouts, and interfaces that explain themselves without talking too much.",
			summary:
				"A product design essay on reducing interruption, clarifying hierarchy, and sustaining attention across languages.",
			takeaway:
				"Focus comes from consistent hierarchy, restrained motion, and copy that knows when to step aside.",
			context:
				"Written after early interface reviews, when the team was tightening layout rhythm and bilingual behavior.",
			highlights: [
				"How hierarchy guides the next action without urgency theatre.",
				"What bilingual layout changes in spacing, alignment, and scanning patterns.",
				"Why the product avoids decorative friction in favour of quiet clarity.",
			],
			readingMinutes: 5,
		},
		architecture: {
			label: "Technical note",
			deck: "An under-the-hood tour of the system decisions that keep Orgo flexible without making the experience feel heavy.",
			excerpt:
				"This technical note walks through the structure behind Orgo: modular surfaces, clear boundaries between planning states, and the connective tissue that keeps data, narrative, and interface behaviour coherent. It is less about cleverness and more about keeping growth understandable.",
			summary:
				"A systems view of how Orgo balances modular architecture, maintainability, and a calm product surface.",
			takeaway:
				"Architecture matters most when it keeps future change legible to the people building it.",
			context:
				"Published as the implementation moved from prototype conventions to long-lived product boundaries.",
			highlights: [
				"How modules communicate without leaking complexity into the interface.",
				"What maintainability looks like in a product built for iterative planning.",
				"Why architectural clarity supports editorial clarity in the journal too.",
			],
			readingMinutes: 6,
		},
	},
	ar: {
		introduction: {
			label: "مذكرة إطلاق",
			deck: "قصة إطلاق Orgo والقرارات التي شكّلت النسخة العامة الأولى من المنتج.",
			excerpt:
				"لم يبدأ Orgo كقائمة ميزات طويلة، بل كسؤال أهدأ: كيف يمكن أن يبدو التخطيط مقصوداً من جديد حين يجزّئ التقويم والملاحظات والالتزامات انتباهك طوال الأسبوع؟ تشرح هذه الافتتاحية ما اخترنا بناءه أولاً، وما الذي تركناه عمداً، ولماذا تعد الهدوء شرطاً في المنتج لا طبقة تجميلية فوقه.",
			summary: "مقدمة واضحة لهدف Orgo وقيوده الأولى والقيم التي تضبط اتجاه خارطة الطريق.",
			takeaway: "أداة التخطيط تكسب الثقة عندما تقلل الضجيج قبل أن تضيف القوة.",
			context:
				"نُشرت مع أول إطلالة عامة على مساحة العمل، حين كان نطاق الإطلاق مهماً بقدر جودة الإطلاق نفسها.",
			highlights: [
				"ما الذي صُمم Orgo ليحلّه داخل أسبوع عمل متشظٍ.",
				"المفاضلات التي حددت النسخة الأولى.",
				"لماذا يُعامل الهدوء كمبدأ منتج لا كمزاج بصري فقط.",
			],
			readingMinutes: 4,
		},
		focus: {
			label: "مقال تصميم",
			deck: "نظرة أقرب إلى قرارات التفاعل والخط والواجهة ثنائية اللغة التي تحمي الانتباه في الاستخدام اليومي.",
			excerpt:
				"التصميم من أجل التركيز في Orgo يعني التعامل مع كل مقاطعة على أنها تكلفة. يشرح هذا المقال القرارات الصغيرة التي تجعل المنتج أخف في الاستخدام: أفعال أقل تتنافس على النظر، وإيقاع أكثر ثباتاً بين العربية والإنجليزية، وواجهات تشرح نفسها من دون إفراط في الكلام.",
			summary: "مقال عن تقليل المقاطعة وتوضيح الهرمية والحفاظ على الانتباه عبر اللغتين.",
			takeaway: "التركيز يأتي من هرمية ثابتة وحركة منضبطة ونص يعرف متى يتراجع خطوة.",
			context:
				"كُتب بعد جولات مبكرة من مراجعة الواجهة، حين كان الفريق يشدّ إيقاع التخطيط وسلوك ثنائية اللغة.",
			highlights: [
				"كيف توجه الهرمية الفعل التالي من دون استعجال مصطنع.",
				"ما الذي تغيّره ثنائية اللغة في المسافات والمحاذاة وأنماط المسح.",
				"لماذا يتجنب المنتج الاحتكاك الزخرفي لصالح وضوح هادئ.",
			],
			readingMinutes: 5,
		},
		architecture: {
			label: "مذكرة تقنية",
			deck: "جولة داخل القرارات المعمارية التي تُبقي Orgo مرناً من دون أن تثقل التجربة.",
			excerpt:
				"تمشي هذه المذكرة عبر البنية وراء Orgo: أسطح منفصلة بوضوح، وحدود ثابتة بين حالات التخطيط، ونسيج يربط البيانات والسرد وسلوك الواجهة من دون تعقيد غير ضروري. المهم هنا ليس الإبهار بل إبقاء النمو مفهوماً.",
			summary: "قراءة تقنية لكيف يوازن Orgo بين البنية المعيارية وقابلية الصيانة وواجهة هادئة.",
			takeaway: "تنجح البنية عندما تجعل التغيير المقبل واضحاً لمن يبنون المنتج.",
			context: "نُشرت مع انتقال التنفيذ من أعراف النماذج الأولية إلى حدود منتج طويلة العمر.",
			highlights: [
				"كيف تتواصل الوحدات من دون أن يتسرّب التعقيد إلى الواجهة.",
				"كيف تبدو القابلية للصيانة داخل منتج يتطور تدريجياً.",
				"لماذا تدعم وضوح البنية وضوح الكتابة التحريرية أيضاً.",
			],
			readingMinutes: 6,
		},
	},
};

function stripMarkdown(value: string): string {
	return value
		.replaceAll(/```[\s\S]*?```/g, " ")
		.replaceAll(/`[^`]*`/g, " ")
		.replaceAll(/^#+\s+/gm, "")
		.replaceAll(/\*\*([^*]+)\*\*/g, "$1")
		.replaceAll(/\*([^*]+)\*/g, "$1")
		.replaceAll(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replaceAll(/!\[[^\]]*]\([^)]+\)/g, " ")
		.replaceAll(/\s+/g, " ")
		.trim();
}

function countWords(value: string): number {
	return (value.match(/[\p{L}\p{N}]+/gu) ?? []).length;
}

function truncateWords(value: string, maxWords: number): string {
	const words = value.match(/[^\s]+/gu) ?? [];
	if (words.length <= maxWords) {
		return value.trim();
	}

	return `${words.slice(0, maxWords).join(" ").trim()}...`;
}

function firstSentence(value: string): string {
	const [sentence] = value.split(/(?<=[.!?؟])\s+/u);
	return sentence?.trim() || value.trim();
}

function resolveReferenceId(reference: unknown): string {
	if (typeof reference === "string") {
		return reference;
	}

	if (reference && typeof reference === "object" && "id" in reference) {
		const id = reference.id;
		if (typeof id === "string") {
			return id;
		}
	}

	return "";
}

function fallbackStoryCopy(lang: Language, entry: CollectionEntry<"blog">): StoryEditorialCopy {
	const plainBody = stripMarkdown(entry.body ?? "");
	const deck =
		entry.data.metaDescription ?? truncateWords(firstSentence(plainBody), 18) ?? entry.data.title;
	const excerpt = plainBody ? truncateWords(plainBody, 40) : deck;
	const summary = entry.data.metaDescription ?? (truncateWords(plainBody, 24) || deck);
	const takeaway = plainBody ? firstSentence(plainBody) : summary;
	return {
		label: lang === "ar" ? "ملاحظة" : "Note",
		deck,
		excerpt,
		summary,
		takeaway,
		context:
			lang === "ar"
				? "مقال من أرشيف Orgo يشرح قراراً داخل المنتج."
				: "A note from the Orgo archive about a product decision.",
		highlights: [deck, summary, takeaway],
		readingMinutes: Math.max(3, Math.ceil(countWords(`${excerpt} ${plainBody}`) / 180)),
	};
}

function getStoryCopy(lang: Language, entry: CollectionEntry<"blog">): StoryEditorialCopy {
	const localized = storyCopy[lang][entry.data.translationGroup];
	if (localized) {
		return localized;
	}

	const englishFallback = storyCopy.en[entry.data.translationGroup];
	if (englishFallback) {
		return englishFallback;
	}

	return fallbackStoryCopy(lang, entry);
}

export function formatReadingTimeLabel(lang: Language, minutes: number): string {
	const localizedMinutes = new Intl.NumberFormat(getLocaleConfig(lang).numberLocale).format(
		minutes,
	);
	return lang === "ar"
		? `${localizedMinutes} ${editorialUiCopy[lang].readingTimePrefix}`
		: `${localizedMinutes} ${editorialUiCopy[lang].readingTimePrefix}`;
}

export function getEditorialArchiveCopy(lang: Language): EditorialArchiveCopy {
	return editorialUiCopy[lang];
}

export function createEditorialPosts({
	entries,
	lang,
	people,
}: {
	entries: CollectionEntry<"blog">[];
	lang: Language;
	people: CollectionEntry<"people">[];
}): EditorialPost[] {
	const peopleById = new Map<string, CollectionEntry<"people">>();
	for (const person of people) {
		peopleById.set(person.id, person);
		peopleById.set(person.data.id || person.id, person);
	}

	return getPublishedBlogEntries(entries, lang).map((entry, index) => {
		const slug = getBlogEntrySlug(entry);
		const author = peopleById.get(resolveReferenceId(entry.data.author));
		const authorLocalized = author?.data.localized[lang];
		const story = getStoryCopy(lang, entry);
		const categorySlug = getCategorySlug(entry.data.category);

		return {
			entry,
			authorAvailability: author?.data.availability,
			authorEmail: author?.data.email,
			authorLocation: author?.data.location,
			authorName: authorLocalized?.name ?? (lang === "ar" ? "كاتب غير معروف" : "Unknown author"),
			authorRole: authorLocalized?.role,
			authorSummary: authorLocalized?.summary,
			categoryHref: getBlogCategoryPath(lang, categorySlug),
			context: story.context,
			deck: story.deck,
			excerpt: story.excerpt,
			highlights: story.highlights,
			href: getBlogPostPath(lang, slug),
			id: entry.id,
			imageAlt: entry.data.image.alt,
			label: story.label,
			publishDate: entry.data.publishDate,
			publishedLabel: formatLocalizedDate(lang, entry.data.publishDate, { dateStyle: "medium" }),
			readingMinutes: story.readingMinutes,
			readingTimeLabel: formatReadingTimeLabel(lang, story.readingMinutes),
			sequence: String(index + 1).padStart(2, "0"),
			slug,
			summary: story.summary,
			tagLinks: (entry.data.tags ?? []).map((tag) => ({
				label: tag,
				slug: getTagSlug(tag),
				href: getBlogTagPath(lang, getTagSlug(tag)),
			})),
			takeaway: story.takeaway,
			title: entry.data.title,
			translationGroup: entry.data.translationGroup,
			updatedLabel:
				entry.data.updatedDate &&
				entry.data.updatedDate.getTime() !== entry.data.publishDate.getTime()
					? formatLocalizedDate(lang, entry.data.updatedDate, { dateStyle: "medium" })
					: undefined,
		} satisfies EditorialPost;
	});
}
