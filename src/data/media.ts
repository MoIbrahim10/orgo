import type { ImageMetadata } from "astro";
import authorAhmed from "../assets/generated/author-ahmed.png";
import authorJane from "../assets/generated/author-jane.png";
import authorJohn from "../assets/generated/author-john.png";
import blogArchitecture from "../assets/generated/blog-architecture.png";
import blogFocus from "../assets/generated/blog-focus.png";
import blogIntroduction from "../assets/generated/blog-introduction.png";
import homeSpotlight from "../assets/generated/home-spotlight.png";

const blogCoverImages = {
	architecture: blogArchitecture,
	focus: blogFocus,
	introduction: blogIntroduction,
} as const satisfies Record<string, ImageMetadata>;

const authorAvatarImages = {
	"ahmed-ali": authorAhmed,
	"jane-doe": authorJane,
	"john-doe": authorJohn,
} as const satisfies Record<string, ImageMetadata>;

export function getBlogCoverImage(translationGroup: string): ImageMetadata {
	return blogCoverImages[translationGroup as keyof typeof blogCoverImages] ?? blogIntroduction;
}

export function getAuthorAvatarImage(authorId?: string): ImageMetadata | undefined {
	if (!authorId) {
		return undefined;
	}

	return authorAvatarImages[authorId as keyof typeof authorAvatarImages];
}

export const homeSpotlightImage = homeSpotlight;
