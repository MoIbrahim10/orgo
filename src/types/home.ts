export type HomeIconName =
	| "calendar"
	| "check-circle"
	| "compass"
	| "focus"
	| "globe"
	| "journal"
	| "layers"
	| "leaf"
	| "spark"
	| "sunrise"
	| "team"
	| "wave";

export type HomeJumpLink = {
	href: string;
	label: string;
};

export type HomeVisualCard = {
	body: string;
	icon: HomeIconName;
	title: string;
	tone: "mint" | "rose" | "sky" | "sun";
};

export type HomeFeatureHighlight = {
	body: string;
	icon: HomeIconName;
	title: string;
};

export type HomeFeatureStory = {
	description: string;
	eyebrow: string;
	highlights: HomeFeatureHighlight[];
	id: string;
	reverse?: boolean;
	scene: "capture" | "journal" | "rhythm";
	title: string;
};

export type HomeWorkflowStep = {
	body: string;
	icon: HomeIconName;
	title: string;
};

export type HomePlan = {
	accent: "dark" | "light";
	cta: string;
	description: string;
	eyebrow: string;
	features: string[];
	href: string;
	title: string;
};

export type HomePersonaCard = {
	body: string;
	icon: HomeIconName;
	quote: string;
	title: string;
};

export type HomePageContent = {
	cta: {
		description: string;
		primaryCta: string;
		secondaryCta: string;
		title: string;
	};
	features: HomeFeatureStory[];
	hero: {
		badges: string[];
		description: string;
		eyebrow: string;
		primaryCta: string;
		secondaryCta: string;
		title: string;
		visualCards: HomeVisualCard[];
	};
	jumpLinks: HomeJumpLink[];
	jumpLinksLabel: string;
	pricing: {
		description: string;
		eyebrow: string;
		plans: HomePlan[];
		title: string;
	};
	proof: {
		cards: HomePersonaCard[];
		description: string;
		eyebrow: string;
		title: string;
	};
	workflow: {
		description: string;
		eyebrow: string;
		steps: HomeWorkflowStep[];
		title: string;
	};
};
