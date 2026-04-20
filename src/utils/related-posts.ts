import type { CollectionEntry } from "astro:content";

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

const GENERIC_TAGS = new Set([
  "공부 노트",
  "기초 개념",
  "최신 동향",
  "논문 요약",
  "test",
  "테스트",
]);

function toTimestamp(dateValue: string) {
  const parsed = Date.parse(dateValue);
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

function getTagWeight(tag: string, frequency: number) {
  const rarityWeight = Math.max(2, 8 - (frequency - 1) * 2);
  const genericPenalty = GENERIC_TAGS.has(tag) ? 2 : 0;

  return Math.max(1, rarityWeight - genericPenalty);
}

export function getRelatedPosts(
  currentPost: PostEntry,
  allPosts: PostEntry[],
  limit = 3,
): RelatedPostItem[] {
  const currentTags = new Set(currentPost.data.tags);

  const tagFrequency = new Map<string, number>();

  for (const post of allPosts) {
    for (const tag of post.data.tags) {
      tagFrequency.set(tag, (tagFrequency.get(tag) ?? 0) + 1);
    }
  }

  return allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      const sharedTags = post.data.tags.filter((tag) => currentTags.has(tag));
      const tagScore = sharedTags.reduce((sum, tag) => {
        return sum + getTagWeight(tag, tagFrequency.get(tag) ?? 1);
      }, 0);

      const sharedTagCountBonus = sharedTags.length * 3;
      const sameCategory = post.data.categorySlug === currentPost.data.categorySlug;
      const sameType = post.data.type === currentPost.data.type;
      const categoryBonus = sameCategory ? 5 : 0;
      const typeBonus = sameType ? 2 : 0;
      const featuredBonus = post.data.featured ? 1 : 0;
      const recencyBonus = getRecencyBonus(
        String(currentPost.data.publishedAt),
        String(post.data.publishedAt),
      );

      const score =
        tagScore +
        sharedTagCountBonus +
        categoryBonus +
        typeBonus +
        featuredBonus +
        recencyBonus;

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
      return String(b.post.data.publishedAt).localeCompare(String(a.post.data.publishedAt));
    })
    .slice(0, limit);
}