import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { supportedLanguages } from "./types/translations";

const languageEnum = z.enum([...supportedLanguages] as [string, ...string[]]);
const imageSchema = z.object({
	src: z.string(),
	alt: z.string(),
});
const localizedPersonSchema = z.object({
	name: z.string(),
	role: z.string(),
	summary: z.string(),
	bio: z.string(),
	focusAreas: z.array(z.string()).default([]),
});

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		isDraft: z.boolean(),
		title: z.string(),
		category: z.string(),
		translationGroup: z.string(),
		author: reference("people"),
		image: imageSchema,
		slug: z.string().optional(),
		language: languageEnum,
		tags: z.array(z.string()).optional(),
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date(),
		metaTitle: z.string().optional(),
		metaDescription: z.string().optional(),
		ogImage: z.string().optional(),
		relatedPosts: z.array(reference("blog")).default([]),
	}),
});

const people = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/people" }),
	schema: z.object({
		id: z.string(),
		order: z.number().default(0),
		location: z.string().optional(),
		email: z.email().optional(),
		portfolio: z.url().optional(),
		availability: z.string().optional(),
		image: imageSchema.optional(),
		localized: z.object({
			en: localizedPersonSchema,
			ar: localizedPersonSchema,
		}),
	}),
});

const faq = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
	schema: z.object({
		question: z.string(),
		answer: z.string(),
		category: z.string(),
		order: z.number().default(0),
		isFeatured: z.boolean().default(false),
		translationGroup: z.string(),
		language: languageEnum,
	}),
});

const changelog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/changelog" }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		version: z.string(),
		releaseDate: z.coerce.date(),
		type: z.enum(["launch", "improvement", "note"]).default("improvement"),
		highlights: z.array(z.string()).default([]),
		translationGroup: z.string(),
		language: languageEnum,
	}),
});

const features = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/features" }),
	schema: z.object({
		title: z.string(),
		eyebrow: z.string(),
		summary: z.string(),
		order: z.number().default(0),
		translationGroup: z.string(),
		language: languageEnum,
		benefits: z
			.array(
				z.object({
					title: z.string(),
					body: z.string(),
				}),
			)
			.default([]),
		relatedPath: z.string().optional(),
		relatedLabel: z.string().optional(),
	}),
});

export const collections = { blog, people, faq, changelog, features };
