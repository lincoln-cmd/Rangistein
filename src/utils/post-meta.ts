export function getReadingTimeMinutes(content: string) {
  const plainText = content
    .replace(/\{\{viz:[\w-]+\}\}/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$]*\$/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#[\]*_>~()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const koreanChars = (plainText.match(/[가-힣]/g) ?? []).length;
  const latinWords = plainText
    .replace(/[가-힣]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  const estimatedUnits = koreanChars / 2.5 + latinWords;
  return Math.max(1, Math.ceil(estimatedUnits / 250));
}

export function getContentLengthLabel(content: string) {
  const plainText = content
    .replace(/\{\{viz:[\w-]+\}\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const length = Array.from(plainText).length;

  if (length >= 5000) return "긴 글";
  if (length >= 2000) return "중간 길이";
  return "짧은 글";
}

export function isUpdatedPost(publishedAt: string, updatedAt?: string) {
  if (!updatedAt) return false;
  return publishedAt !== updatedAt;
}