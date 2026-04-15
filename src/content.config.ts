import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const dateField = z
  .union([z.string(), z.date()])
  .transform((value) => {
    if (typeof value === "string") {
      return value;
    }

    return value.toISOString().slice(0, 10);
  });

const postsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    categorySlug: z.string(),
    tags: z.array(z.string()),
    type: z.enum(["latest", "study"]),
    publishedAt: dateField,
    updatedAt: dateField.optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    references: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

export const collections = {
  posts: postsCollection,
};