import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { supportedLanguages } from "./types/translations";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		isDraft: z.boolean(),
		title: z.string(),
		translationGroup: z.string(),
		author: reference("authors"),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		slug: z.string().optional(),
		language: z.enum([...supportedLanguages] as [string, ...string[]]),
		tags: z.array(z.string()).optional(),
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date(),
		metaTitle: z.string().optional(),
		metaDescription: z.string().optional(),
		ogImage: z.string().optional(),
		relatedPosts: z.array(reference("blog")).default([]),
	}),
});

const authors = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/authors" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		email: z.email().optional(),
		portfolio: z.url().optional(),
		bio: z.string().optional(),
		image: z
			.object({
				src: z.string(),
				alt: z.string(),
			})
			.optional(),
	}),
});

export const collections = { blog, authors };
