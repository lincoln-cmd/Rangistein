import type { CollectionEntry } from "astro:content";
import {
  getNewestTimestamp,
  getUnifiedRecommendationScore,
} from "./recommendation-score";

type PostEntry = CollectionEntry<"posts">;

export type HomeRecommendationItem = {
  post: PostEntry;
  score: number;
};

export function getHomeRecommendations(
  posts: PostEntry[],
  limit = 3,
): HomeRecommendationItem[] {
  const newestTimestamp = getNewestTimestamp(posts);

  const scored = posts
    .map((post) => ({
      post,
      score: getUnifiedRecommendationScore(post, newestTimestamp),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return String(b.post.data.publishedAt).localeCompare(
        String(a.post.data.publishedAt),
      );
    });

  const selected: HomeRecommendationItem[] = [];
  const usedCategories = new Set<string>();

  for (const item of scored) {
    if (selected.length >= limit) break;

    if (!usedCategories.has(item.post.data.categorySlug)) {
      selected.push(item);
      usedCategories.add(item.post.data.categorySlug);
    }
  }

  if (selected.length < limit) {
    for (const item of scored) {
      if (selected.length >= limit) break;
      if (selected.some((selectedItem) => selectedItem.post.id === item.post.id)) {
        continue;
      }
      selected.push(item);
    }
  }

  return selected;
}