interface ImportMetaEnv {
	readonly PUBLIC_GOOGLE_ANALYTICS_ID?: string;
	readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
	readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
