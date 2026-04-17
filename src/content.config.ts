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

const visualizationSchema = z.object({
  id: z.string(),
  type: z.enum(["table", "bar", "line"]),
  title: z.string().optional(),
  caption: z.string().optional(),

  headersText: z.string().optional(),
  rowsText: z
    .array(
      z.object({
        row: z.string(),
      }),
    )
    .default([]),

  labelsText: z.string().optional(),
  datasetsText: z
    .array(
      z.object({
        label: z.string(),
        dataText: z.string(),
        borderColor: z.string().optional(),
        backgroundColor: z.string().optional(),
      }),
    )
    .default([]),

  xLabel: z.string().optional(),
  yLabel: z.string().optional(),
  stacked: z.boolean().optional(),
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
    visualizations: z.array(visualizationSchema).default([]),
  }),
});

export const collections = {
  posts: postsCollection,
};