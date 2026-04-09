import type { CollectionEntry } from "astro:content";
import type { Language } from "../types/translations";

export type PersonEntry = CollectionEntry<"people">;

export type LocalizedPerson = {
	id: string;
	name: string;
	role: string;
	summary: string;
	bio: string;
	focusAreas: string[];
	location?: string;
	email?: string;
	portfolio?: string;
	availability?: string;
	image?: PersonEntry["data"]["image"];
};

export function getLocalizedPerson(person: PersonEntry, lang: Language): LocalizedPerson {
	const localizedPerson = person.data.localized[lang];

	return {
		id: person.data.id,
		name: localizedPerson.name,
		role: localizedPerson.role,
		summary: localizedPerson.summary,
		bio: localizedPerson.bio,
		focusAreas: localizedPerson.focusAreas,
		location: person.data.location,
		email: person.data.email,
		portfolio: person.data.portfolio,
		availability: person.data.availability,
		image: person.data.image,
	};
}

export function getLocalizedPersonName(person: PersonEntry, lang: Language): string {
	return getLocalizedPerson(person, lang).name;
}

export function sortPeople<T extends PersonEntry>(people: T[]): T[] {
	return [...people].sort(
		(left, right) =>
			left.data.order - right.data.order || left.data.id.localeCompare(right.data.id),
	);
}
