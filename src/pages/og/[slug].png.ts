import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

export async function getStaticPaths() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return posts.map((post) => ({
    params: {
      slug: post.id,
    },
    props: {
      post,
    },
  }));
}

export async function GET({ props }) {
  const { post } = props;

  const title = post.data.title;
  const category = post.data.categorySlug;
  const date = String(post.data.publishedAt);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #162d56 0%, #186e80 100%)",
          color: "white",
          fontFamily: "sans-serif",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                fontSize: "28px",
                opacity: 0.8,
              },
              children: `랑이슈타인 · ${category}`,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: "54px",
                fontWeight: 700,
                lineHeight: 1.3,
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: "22px",
                opacity: 0.7,
              },
              children: date,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
    },
  );

  const png = new Resvg(svg).render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000",
    },
  });
}