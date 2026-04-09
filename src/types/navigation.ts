export type NavLink = {
	key: string;
	href: string;
};

export type FooterNavigationConfig = {
	primary: NavLink[];
	resources: NavLink[];
};

export type NavigationConfig = {
	header: NavLink[];
	footer: FooterNavigationConfig;
};
