import type { CollectionEntry } from "astro:content";

type PostEntry = CollectionEntry<"posts">;

export type HomeRecommendationItem = {
  post: PostEntry;
  score: number;
};

function toTimestamp(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getRecencyScore(post: PostEntry, newestTimestamp: number) {
  const postTimestamp = toTimestamp(String(post.data.publishedAt));
  if (!postTimestamp || !newestTimestamp) return 0;

  const diffDays = Math.max(
    0,
    (newestTimestamp - postTimestamp) / (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 7) return 12;
  if (diffDays <= 30) return 9;
  if (diffDays <= 90) return 6;
  if (diffDays <= 180) return 3;

  return 1;
}

function getPostScore(post: PostEntry, newestTimestamp: number) {
  let score = 0;

  if (post.data.featured) score += 30;
  if (post.data.type === "study") score += 4;
  if (post.data.type === "latest") score += 4;

  score += Math.min(post.data.tags.length, 5) * 2;
  score += getRecencyScore(post, newestTimestamp);

  return score;
}

export function getHomeRecommendations(posts: PostEntry[], limit = 3): HomeRecommendationItem[] {
  const newestTimestamp = Math.max(
    ...posts.map((post) => toTimestamp(String(post.data.publishedAt))),
    0,
  );

  const scored = posts
    .map((post) => ({
      post,
      score: getPostScore(post, newestTimestamp),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return String(b.post.data.publishedAt).localeCompare(String(a.post.data.publishedAt));
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
      if (selected.some((selectedItem) => selectedItem.post.id === item.post.id)) continue;
      selected.push(item);
    }
  }

  return selected;
}