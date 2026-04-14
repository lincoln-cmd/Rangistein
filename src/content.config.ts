import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
    publishedAt: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
};