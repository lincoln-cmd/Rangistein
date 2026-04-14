export type Category = {
  slug: string;
  name: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  tags: string[];
  type: "latest" | "study";
  publishedAt: string;
  body: string[];
};

export const siteTitle = "랑이슈타인";
export const siteDescription =
  "과학 이론, 최신 동향, 논문 요약, 개인 학습 기록을 정리하는 개인 과학 웹 아카이브";

export const categories: Category[] = [
  { slug: "math", name: "수학" },
  { slug: "physics", name: "물리" },
  { slug: "chemistry", name: "화학" },
  { slug: "biology", name: "생명과학" },
  { slug: "earth-science", name: "지구과학" },
  { slug: "astronomy", name: "천문학" },
  { slug: "study-notes", name: "개인 공부 노트" },
];

export const posts: Post[] = [
  {
    slug: "exoplanet-observation-overview",
    title: "외계행성 관측 연구 정리",
    description: "천문학 최신 연구 흐름과 관측 방법을 간단히 정리한 게시물",
    category: "천문학",
    categorySlug: "astronomy",
    tags: ["논문 요약", "최신 동향", "천문학"],
    type: "latest",
    publishedAt: "2026-04-14",
    body: [
      "외계행성 연구는 관측 기술의 발전과 함께 빠르게 확장되고 있습니다.",
      "대표적인 방법으로는 시선속도법, 식현법, 직접 관측 등이 있으며, 각 방법은 장단점이 분명합니다.",
      "랑이슈타인에서는 앞으로 이러한 연구 동향을 논문 요약 중심으로 차근차근 정리할 예정입니다.",
    ],
  },
  {
    slug: "intro-to-quantum-mechanics-note",
    title: "양자역학 입문 개념 노트",
    description: "파동함수, 중첩, 관측 문제를 초보자 관점에서 정리한 글",
    category: "물리",
    categorySlug: "physics",
    tags: ["기초 개념", "물리학", "공부 노트"],
    type: "latest",
    publishedAt: "2026-04-13",
    body: [
      "양자역학은 미시 세계를 설명하는 핵심 이론입니다.",
      "입문 단계에서는 파동함수, 확률 해석, 중첩 개념을 먼저 이해하는 것이 중요합니다.",
      "이 글은 복잡한 수식 전개보다 개념적 흐름을 잡는 데 초점을 둡니다.",
    ],
  },
  {
    slug: "chemical-bonding-and-electron-config",
    title: "분자 결합과 전자 배치 기초",
    description: "화학 결합 이해를 위한 핵심 개념을 단계별로 정리",
    category: "화학",
    categorySlug: "chemistry",
    tags: ["기초 개념", "화학", "공부 노트"],
    type: "latest",
    publishedAt: "2026-04-12",
    body: [
      "화학 결합은 원자의 전자 배치와 밀접하게 연결됩니다.",
      "이온 결합, 공유 결합, 금속 결합을 구분해서 이해하면 전체 흐름이 잡히기 쉽습니다.",
      "추후에는 분자 구조와 분자 오비탈까지 연결해서 정리할 계획입니다.",
    ],
  },
  {
    slug: "calculus-review-note",
    title: "미적분 복습 노트",
    description: "극한, 연속, 미분의 핵심 개념을 다시 정리한 개인 학습 기록",
    category: "수학",
    categorySlug: "math",
    tags: ["공부 노트", "수학", "기초 개념"],
    type: "study",
    publishedAt: "2026-04-11",
    body: [
      "미적분의 기초는 극한과 연속 개념에서 시작합니다.",
      "함수의 변화율을 이해하는 과정이 미분 개념으로 이어집니다.",
      "이 노트는 계산 훈련보다는 개념의 연결을 복습하는 데 목적이 있습니다.",
    ],
  },
  {
    slug: "cellular-respiration-note",
    title: "세포 호흡 정리",
    description: "생명과학 기초 단원 중 세포 호흡 흐름을 요약한 노트",
    category: "생명과학",
    categorySlug: "biology",
    tags: ["공부 노트", "생명과학"],
    type: "study",
    publishedAt: "2026-04-10",
    body: [
      "세포 호흡은 생명체가 에너지를 얻는 핵심 과정입니다.",
      "해당과정, TCA 회로, 전자전달계를 단계별로 이해하는 것이 중요합니다.",
      "이 글은 전체 흐름을 한 번에 복습할 수 있도록 요약한 노트입니다.",
    ],
  },
  {
    slug: "plate-tectonics-note",
    title: "판 구조론 핵심 포인트",
    description: "지구과학 개념 복습을 위한 핵심 정리",
    category: "지구과학",
    categorySlug: "earth-science",
    tags: ["공부 노트", "지구과학"],
    type: "study",
    publishedAt: "2026-04-09",
    body: [
      "판 구조론은 현대 지구과학의 핵심 틀입니다.",
      "대륙 이동, 해령 확장, 섭입대 형성 등 주요 현상을 함께 설명할 수 있습니다.",
      "이 노트에서는 구조적 흐름과 핵심 용어를 중심으로 복습합니다.",
    ],
  },
];

export const featuredTags = [
  "논문 요약",
  "최신 동향",
  "기초 개념",
  "공부 노트",
  "천문학",
  "물리학",
];

export const recentPosts = posts.filter((post) => post.type === "latest");
export const studyNotes = posts.filter((post) => post.type === "study");