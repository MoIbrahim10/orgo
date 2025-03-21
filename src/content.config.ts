import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import { supportedLanguages } from "./types/translations";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	schema: z.object({
		isDraft: z.boolean(),
		title: z.string(),
		author: reference("authors"),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		slug: z.string().optional(),
		language: z.enum([...supportedLanguages] as [string, ...string[]]),
		tags: z.array(z.string()).optional(),
		publishDate: z.date(),
		updatedDate: z.string().transform((str) => new Date(str)),
		canonicalURL: z.string().url(),
		metaTitle: z.string().optional(),
		metaDescription: z.string().optional(),
		ogImage: z.string().optional(),
		relatedPosts: z.array(reference("blog")),
	}),
});

const authors = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/authors" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		email: z.string().email().optional(),
		portfolio: z.string().url().optional(),
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
