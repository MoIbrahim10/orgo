import type { Language } from "../../types/translations";
import type { HomePageContent } from "../../types/home";
import { t } from "../../utils/i18n";
import { getLocalizedPath } from "../../utils/routing";

export function getHomePageContent(lang: Language): HomePageContent {
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
			visualCards: [
				{
					icon: "calendar",
					tone: "sun",
					title: t(lang, "home.hero.cards.focus_title"),
					body: t(lang, "home.hero.cards.focus_body"),
				},
				{
					icon: "journal",
					tone: "rose",
					title: t(lang, "home.hero.cards.journal_title"),
					body: t(lang, "home.hero.cards.journal_body"),
				},
				{
					icon: "team",
					tone: "sky",
					title: t(lang, "home.hero.cards.sync_title"),
					body: t(lang, "home.hero.cards.sync_body"),
				},
			],
		},
		jumpLinksLabel: t(lang, "home.jump_links_label"),
		jumpLinks: [
			{ href: "#features", label: t(lang, "home.jump_links.features") },
			{ href: "#rhythm", label: t(lang, "home.jump_links.rhythm") },
			{ href: "#pricing", label: t(lang, "home.jump_links.pricing") },
			{ href: "#stories", label: t(lang, "home.jump_links.stories") },
		],
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
		pricing: {
			eyebrow: t(lang, "home.pricing.eyebrow"),
			title: t(lang, "home.pricing.title"),
			description: t(lang, "home.pricing.description"),
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
					],
					cta: t(lang, "home.pricing.primary_cta"),
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
					],
					cta: t(lang, "home.pricing.secondary_cta"),
					href: getLocalizedPath(lang, "/blog"),
				},
			],
		},
		proof: {
			eyebrow: t(lang, "home.proof.eyebrow"),
			title: t(lang, "home.proof.title"),
			description: t(lang, "home.proof.description"),
			cards: [
				{
					icon: "team",
					title: t(lang, "home.proof.founders_title"),
					body: t(lang, "home.proof.founders_body"),
					quote: t(lang, "home.proof.founders_quote"),
				},
				{
					icon: "compass",
					title: t(lang, "home.proof.consultants_title"),
					body: t(lang, "home.proof.consultants_body"),
					quote: t(lang, "home.proof.consultants_quote"),
				},
				{
					icon: "leaf",
					title: t(lang, "home.proof.personal_title"),
					body: t(lang, "home.proof.personal_body"),
					quote: t(lang, "home.proof.personal_quote"),
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
