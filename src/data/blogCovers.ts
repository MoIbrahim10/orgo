/** Curated Unsplash stills per translation group — stable URLs for OG + srcset. */

/** Abstract / minimal stills — less literal “stock laptop” than hero marketing shots. */
const unsplashPhotoByGroup: Record<string, string> = {
	architecture: "photo-1555949963-ff855fe07aee",
	focus: "photo-1579546929518-9cb3962693f5",
	introduction: "photo-1618005182384-a83a8bd57f1b",
};

const defaultGroup = "introduction";
const curatedPhotoPool = [
	"photo-1499750310107-5fef28a66643",
	"photo-1500530855697-b586d89ba3ee",
	"photo-1516321497487-e288fb19713f",
	"photo-1497366754035-f200968a6e72",
	"photo-1497215842964-222b430dc094",
	"photo-1518770660439-4636190af475",
	"photo-1516321318423-f06f85e504b3",
	"photo-1497366412874-3415097a27e7",
	"photo-1504384308090-c894fdcc538d",
	"photo-1498050108023-c5249f4df085",
	"photo-1489515217757-5fd1be406fef",
	"photo-1461749280684-dccba630e2f6",
] as const;

function hashTranslationGroup(translationGroup: string): number {
	return Array.from(translationGroup).reduce(
		(total, character) => total + character.charCodeAt(0),
		0,
	);
}

function photoPath(translationGroup: string): string {
	if (translationGroup in unsplashPhotoByGroup) {
		return unsplashPhotoByGroup[translationGroup];
	}

	const fallbackIndex = hashTranslationGroup(translationGroup) % curatedPhotoPool.length;
	return curatedPhotoPool[fallbackIndex] ?? unsplashPhotoByGroup[defaultGroup];
}

export function buildBlogCoverUrl(translationGroup: string, width: number): string {
	const photo = photoPath(translationGroup);
	return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=82`;
}

export function buildBlogCoverSrcset(translationGroup: string, widths: readonly number[]): string {
	return widths.map((w) => `${buildBlogCoverUrl(translationGroup, w)} ${w}w`).join(", ");
}

export function getBlogCoverOgUrl(translationGroup: string): string {
	return buildBlogCoverUrl(translationGroup, 1200);
}
