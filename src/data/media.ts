import type { ImageMetadata } from "astro";
import authorAhmed from "../assets/generated/author-ahmed.png";
import authorJane from "../assets/generated/author-jane.png";
import authorJohn from "../assets/generated/author-john.png";
import homeSpotlight from "../assets/generated/home-spotlight.png";

const authorAvatarImages = {
	"ahmed-ali": authorAhmed,
	"jane-doe": authorJane,
	"john-doe": authorJohn,
} as const satisfies Record<string, ImageMetadata>;

export function getAuthorAvatarImage(authorId?: string): ImageMetadata | undefined {
	if (!authorId) {
		return undefined;
	}

	return authorAvatarImages[authorId as keyof typeof authorAvatarImages];
}

export const homeSpotlightImage = homeSpotlight;
