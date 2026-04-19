export const siteTitle = "랑이슈타인";
export const siteDescription =
  "수학, 물리, 화학, 생명과학, 지구과학, 천문학을 중심으로 과학 이론, 최신 동향, 논문 요약, 개인 학습 기록을 정리하는 개인 과학 웹 아카이브입니다.";

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "math",
    name: "수학",
    description: "수학 이론, 기초 개념 정리, 학습 노트를 다룹니다.",
  },
  {
    slug: "physics",
    name: "물리",
    description: "물리학 개념, 최신 연구 동향, 기초 이론 정리를 다룹니다.",
  },
  {
    slug: "chemistry",
    name: "화학",
    description: "화학 결합, 분자 구조, 기초 이론 및 학습 노트를 다룹니다.",
  },
  {
    slug: "biology",
    name: "생명과학",
    description: "생명과학 개념 정리와 기초 생물학 학습 노트를 다룹니다.",
  },
  {
    slug: "earth-science",
    name: "지구과학",
    description: "지구과학 개념, 지질/기상/우주 관련 학습 기록을 다룹니다.",
  },
  {
    slug: "astronomy",
    name: "천문학",
    description: "천문학 이론, 관측, 최신 연구 동향과 논문 요약을 다룹니다.",
  },
  {
    slug: "study-notes",
    name: "개인 공부 노트",
    description: "개인 학습 과정에서 정리한 노트를 모아 둔 카테고리입니다.",
  },
];

export const categoryMap = new Map(categories.map((category) => [category.slug, category]));

export function getCategoryBySlug(slug: string) {
  return categoryMap.get(slug);
}

export function getCategoryName(slug: string) {
  return getCategoryBySlug(slug)?.name ?? slug;
}