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
		headline: string;
		primaryCta: string;
		secondaryCta: string;
		sectionName: string;
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
	benefits: {
		cards: Array<{
			body: string;
			imageAlt: string;
			title: string;
		}>;
		description: string;
		headline: string;
		sectionName: string;
	};
	connectedTools: {
		description: string;
		headline: string;
		sectionName: string;
	};
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
		focusLabel: string;
		headline: string;
		sectionName: string;
	};
	pricing: {
		description: string;
		eyebrow: string;
		featuresHeading: string;
		perMonth: string;
		plans: HomePlan[];
		title: string;
	};
	socialProof: {
		description: string;
		headline: string;
		sectionName: string;
		testimonials: Array<{
			author: string;
			company: string;
			content: string;
		}>;
	};
	proposal: {
		description: string;
		headline: string;
		points: string[];
		primaryCta: string;
		secondaryCta: string;
		sectionName: string;
	};
	workflow: {
		description: string;
		headline: string;
		sectionName: string;
		steps: HomeWorkflowStep[];
	};
};
