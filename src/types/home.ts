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

export type HomeSignal = {
	label: string;
	tone: "mint" | "rose" | "sky" | "sun";
	value: string;
};

export type HomeCaseStudy = {
	body: string;
	cta?: string;
	href?: string;
	icon: HomeIconName;
	label: string;
	outcome: string;
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

export type HomePerspectiveCard = {
	body: string;
	focus: string;
	icon: HomeIconName;
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
	perspectives: {
		cards: HomePerspectiveCard[];
		description: string;
		eyebrow: string;
		focusLabel: string;
		title: string;
	};
	pricing: {
		description: string;
		eyebrow: string;
		plans: HomePlan[];
		title: string;
	};
	processSignals: HomeSignal[];
	proposal: {
		description: string;
		eyebrow: string;
		points: string[];
		primaryCta: string;
		secondaryCta: string;
		title: string;
	};
	stories: {
		cards: HomeCaseStudy[];
		description: string;
		eyebrow: string;
		outcomeLabel: string;
		title: string;
	};
	workflow: {
		description: string;
		eyebrow: string;
		steps: HomeWorkflowStep[];
		title: string;
	};
};
