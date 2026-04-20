export type HomeIconName =
	| "calendar"
	| "check-circle"
	| "compass"
	| "focus"
	| "gear"
	| "globe"
	| "journal"
	| "laurel"
	| "layers"
	| "leaf"
	| "quadrants"
	| "spark"
	| "sunrise"
	| "team"
	| "wave";

export type HomeFeatureSpotlightIcon =
	| "calendar"
	| "gear"
	| "journal"
	| "laurel"
	| "quadrants"
	| "team";

export type HomeFeatureSpotlightItem = {
	body: string;
	icon: HomeFeatureSpotlightIcon;
	title: string;
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
	/** Monthly amount without currency symbol, e.g. "9.95" */
	price: string;
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
	featureSpotlight: {
		cards: HomeFeatureSpotlightItem[];
		description: string;
		headline: string;
		sectionName: string;
	};
	workspaceGlance: {
		description: string;
		headline: string;
		imageAlt: string;
		sectionName: string;
	};
	connectedTools: {
		description: string;
		headline: string;
		sectionName: string;
	};
	features: HomeFeatureStory[];
	hero: {
		badges: string[];
		description: string;
		eyebrow: string;
		primaryCta: string;
		secondaryCta: string;
		title: string;
	};
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
		featuresHeading: string;
		perMonth: string;
		plans: HomePlan[];
		title: string;
	};
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
