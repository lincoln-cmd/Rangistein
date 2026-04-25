import { getCollection, type CollectionEntry } from "astro:content";
import { getCategoryBySlug } from "../../data/site";

type PostEntry = CollectionEntry<"posts">;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapTitle(title: string, maxChars = 18) {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = `${current} ${word}`.trim();

    if (next.length > maxChars && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current.trim());
  }

  return lines.slice(0, 3);
}

function getCategoryColor(slug: string) {
  const map: Record<string, string> = {
    math: "#4f8cff",
    physics: "#7b61ff",
    chemistry: "#00b894",
    biology: "#2ecc71",
    "earth-science": "#e67e22",
    astronomy: "#9b59b6",
    "study-notes": "#f39c12",
  };

  return map[slug] ?? "#4f8cff";
}

export async function getStaticPaths() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export async function GET({ props }: { props: { post: PostEntry } }) {
  const { post } = props;

  const category = getCategoryBySlug(post.data.categorySlug);
  const categoryName = category?.name ?? post.data.categorySlug;
  const color = getCategoryColor(post.data.categorySlug);

  const lines = wrapTitle(post.data.title);
  const date = escapeXml(String(post.data.publishedAt));

  const titleSvg = lines
    .map((line, index) => {
      const y = 260 + index * 72;
      return `<text x="80" y="${y}" class="title">${escapeXml(line)}</text>`;
    })
    .join("");

  const featuredBadge = post.data.featured
    ? `<rect x="80" y="140" rx="14" ry="14" width="120" height="40" fill="#ffffff22"/>
       <text x="100" y="168" class="badge">대표 글</text>`
    : "";

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#162d56"/>
      <stop offset="100%" stop-color="#186e80"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="${color}"/>

  <circle cx="1000" cy="120" r="220" fill="#ffffff10"/>
  <circle cx="200" cy="550" r="180" fill="#ffffff08"/>

  <style>
    text {
      font-family: system-ui, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
      fill: white;
    }

    .category {
      font-size: 30px;
      font-weight: 700;
      opacity: 0.85;
    }

    .title {
      font-size: 60px;
      font-weight: 800;
      letter-spacing: -1px;
    }

    .date {
      font-size: 24px;
      opacity: 0.7;
    }

    .brand {
      font-size: 26px;
      font-weight: 800;
      opacity: 0.85;
    }

    .badge {
      font-size: 20px;
      font-weight: 700;
    }
  </style>

  <text x="80" y="100" class="category">랑이슈타인 · ${escapeXml(categoryName)}</text>

  ${featuredBadge}

  ${titleSvg}

  <text x="80" y="560" class="date">${date}</text>
  <text x="920" y="560" class="brand">Rangistein</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000",
    },
  });
}