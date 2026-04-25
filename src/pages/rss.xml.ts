import { getCollection } from "astro:content";
import { getCategoryBySlug, siteDescription, siteTitle } from "../data/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET({ site }: { site: URL }) {
  const siteUrl = site ?? new URL("https://rangistein.pages.dev");

  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const sortedPosts = [...posts].sort((a, b) =>
    String(b.data.publishedAt).localeCompare(String(a.data.publishedAt)),
  );

  const items = sortedPosts
    .map((post) => {
      const postUrl = new URL(`/posts/${post.id}/`, siteUrl).toString();
      const categoryName =
        getCategoryBySlug(post.data.categorySlug)?.name ?? post.data.categorySlug;

      return `
        <item>
          <title>${escapeXml(post.data.title)}</title>
          <link>${escapeXml(postUrl)}</link>
          <guid>${escapeXml(postUrl)}</guid>
          <description>${escapeXml(post.data.description)}</description>
          <category>${escapeXml(categoryName)}</category>
          <pubDate>${new Date(String(post.data.publishedAt)).toUTCString()}</pubDate>
        </item>
      `;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${escapeXml(siteUrl.toString())}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}