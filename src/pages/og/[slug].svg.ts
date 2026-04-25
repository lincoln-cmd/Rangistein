import { getCollection } from "astro:content";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitTitle(title: string, maxLength = 18) {
  const chars = Array.from(title);
  const lines: string[] = [];

  for (let i = 0; i < chars.length; i += maxLength) {
    lines.push(chars.slice(i, i + maxLength).join(""));
  }

  return lines.slice(0, 3);
}

export async function getStaticPaths() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export async function GET({ props }) {
  const { post } = props;

  const titleLines = splitTitle(post.data.title);
  const category = escapeXml(post.data.categorySlug);
  const date = escapeXml(String(post.data.publishedAt));

  const titleSvg = titleLines
    .map((line, index) => {
      const y = 270 + index * 76;
      return `<text x="72" y="${y}" class="title">${escapeXml(line)}</text>`;
    })
    .join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#162d56"/>
      <stop offset="100%" stop-color="#186e80"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="90" r="210" fill="rgba(255,255,255,0.10)"/>
  <circle cx="150" cy="560" r="180" fill="rgba(255,255,255,0.07)"/>

  <style>
    text {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
      fill: #ffffff;
    }
    .eyebrow {
      font-size: 30px;
      font-weight: 700;
      opacity: 0.82;
    }
    .title {
      font-size: 62px;
      font-weight: 800;
      letter-spacing: -1px;
    }
    .date {
      font-size: 24px;
      font-weight: 600;
      opacity: 0.75;
    }
    .brand {
      font-size: 28px;
      font-weight: 800;
      opacity: 0.9;
    }
  </style>

  <text x="72" y="100" class="eyebrow">랑이슈타인 · ${category}</text>
  ${titleSvg}
  <text x="72" y="540" class="date">${date}</text>
  <text x="930" y="540" class="brand">Rangistein</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000",
    },
  });
}