export type NavLink = {
	key: string;
	href: string;
	/** Use `href` as a site root path (no `/{lang}` prefix). For `/404`, `/500`, etc. */
	localeAbsolute?: boolean;
};

export type FooterNavigationConfig = {
	primary: NavLink[];
	resources: NavLink[];
};

export type NavigationConfig = {
	header: NavLink[];
	footer: FooterNavigationConfig;
};
