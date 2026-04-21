import type { CollectionEntry } from "astro:content";

type PostEntry = CollectionEntry<"posts">;

export type TagSummary = {
  tag: string;
  count: number;
  featuredCount: number;
  latestPublishedAt: string;
};

export type RelatedTagItem = {
  tag: string;
  count: number;
};

export function buildTagSummaries(posts: PostEntry[]): TagSummary[] {
  const tagMap = new Map<
    string,
    {
      count: number;
      featuredCount: number;
      latestPublishedAt: string;
    }
  >();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const current = tagMap.get(tag) ?? {
        count: 0,
        featuredCount: 0,
        latestPublishedAt: "",
      };

      current.count += 1;

      if (post.data.featured) {
        current.featuredCount += 1;
      }

      if (
        !current.latestPublishedAt ||
        String(post.data.publishedAt) > current.latestPublishedAt
      ) {
        current.latestPublishedAt = String(post.data.publishedAt);
      }

      tagMap.set(tag, current);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, value]) => ({
      tag,
      count: value.count,
      featuredCount: value.featuredCount,
      latestPublishedAt: value.latestPublishedAt,
    }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      if (b.featuredCount !== a.featuredCount) return b.featuredCount - a.featuredCount;
      if (b.latestPublishedAt !== a.latestPublishedAt) {
        return b.latestPublishedAt.localeCompare(a.latestPublishedAt);
      }
      return a.tag.localeCompare(b.tag, "ko");
    });
}

export function getRelatedTags(
  currentTag: string,
  taggedPosts: PostEntry[],
  limit = 8,
): RelatedTagItem[] {
  const relatedTagMap = new Map<string, number>();

  for (const post of taggedPosts) {
    for (const tag of post.data.tags) {
      if (tag === currentTag) continue;
      relatedTagMap.set(tag, (relatedTagMap.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(relatedTagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.tag.localeCompare(b.tag, "ko");
    })
    .slice(0, limit);
}