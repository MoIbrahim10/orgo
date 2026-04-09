import type { Language } from "./translations";

export interface BlogPost {
	isDraft: boolean;
	title: string;
	category: string;
	translationGroup: string;
	author: Author;
	date: Date;
	image: Image;
	content: string;
	slug: string;
	language: Language;
	publishDate: Date;
	updatedDate: Date;
	tags?: string[];
	metaTitle?: string;
	metaDescription?: string;
	ogImage?: string;
	relatedPosts?: BlogPost[];
}

export interface Author {
	id: string;
	name: string;
	email?: string;
	portfolio?: string;
	bio?: string;
	image?: Image;
}

export interface Image {
	src: string;
	alt: string;
}
