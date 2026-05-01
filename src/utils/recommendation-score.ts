import type { CollectionEntry } from "astro:content";

type PostEntry = CollectionEntry<"posts">;

function toTimestamp(value: string) {
  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getRecencyScore(post: PostEntry, newestTimestamp: number) {
  const postTimestamp = toTimestamp(post.data.publishedAt);

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

export function getUnifiedRecommendationScore(
  post: PostEntry,
  newestTimestamp: number,
  context?: {
    currentPost?: PostEntry;
  },
) {
  let score = 0;

  if (post.data.featured) score += 30;

  if (post.data.type === "study") score += 4;
  if (post.data.type === "latest") score += 4;

  score += Math.min(post.data.tags.length, 5) * 2;
  score += getRecencyScore(post, newestTimestamp);

  if (context?.currentPost) {
    const currentPost = context.currentPost;

    const sharedTags = post.data.tags.filter((tag) =>
      currentPost.data.tags.includes(tag),
    );

    score += sharedTags.length * 4;

    if (post.data.categorySlug === currentPost.data.categorySlug) {
      score += 5;
    }

    if (post.data.type === currentPost.data.type) {
      score += 2;
    }
  }

  return score;
}

export function getNewestTimestamp(posts: PostEntry[]) {
  return Math.max(
    ...posts.map((post) => toTimestamp(post.data.publishedAt)),
    0,
  );
}