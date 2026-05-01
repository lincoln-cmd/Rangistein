import type { CollectionEntry } from "astro:content";
import {
  getNewestTimestamp,
  getUnifiedRecommendationScore,
} from "./recommendation-score";

type PostEntry = CollectionEntry<"posts">;

export type RelatedPostItem = {
  post: PostEntry;
  score: number;
  sharedTags: string[];
  sameCategory: boolean;
  sameType: boolean;
  recencyBonus: number;
  featuredBonus: number;
};

function toTimestamp(value: string) {
  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getRecencyBonus(currentPublishedAt: string, candidatePublishedAt: string) {
  const currentTs = toTimestamp(currentPublishedAt);
  const candidateTs = toTimestamp(candidatePublishedAt);

  if (!currentTs || !candidateTs) return 0;

  const diffDays = Math.abs(currentTs - candidateTs) / (1000 * 60 * 60 * 24);

  if (diffDays <= 7) return 3;
  if (diffDays <= 30) return 2;
  if (diffDays <= 90) return 1;

  return 0;
}

export function getRelatedPosts(
  currentPost: PostEntry,
  allPosts: PostEntry[],
  limit = 3,
): RelatedPostItem[] {
  const newestTimestamp = getNewestTimestamp(allPosts);

  return allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      const sharedTags = post.data.tags.filter((tag) =>
        currentPost.data.tags.includes(tag),
      );

      const sameCategory = post.data.categorySlug === currentPost.data.categorySlug;
      const sameType = post.data.type === currentPost.data.type;
      const recencyBonus = getRecencyBonus(
        String(currentPost.data.publishedAt),
        String(post.data.publishedAt),
      );
      const featuredBonus = post.data.featured ? 1 : 0;

      const score = getUnifiedRecommendationScore(post, newestTimestamp, {
        currentPost,
      });

      return {
        post,
        score,
        sharedTags,
        sameCategory,
        sameType,
        recencyBonus,
        featuredBonus,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.sharedTags.length !== a.sharedTags.length) {
        return b.sharedTags.length - a.sharedTags.length;
      }
      if (Number(b.sameCategory) !== Number(a.sameCategory)) {
        return Number(b.sameCategory) - Number(a.sameCategory);
      }
      return String(b.post.data.publishedAt).localeCompare(
        String(a.post.data.publishedAt),
      );
    })
    .slice(0, limit);
}