export type NavLink = {
  key: string;
  href: string;
};

export type NavigationConfig = {
  header: NavLink[];
  footer: NavLink[];
};
