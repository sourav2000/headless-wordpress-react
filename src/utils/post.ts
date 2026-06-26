import type { Post } from "../types/post";

export function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent?.trim() ?? "";
}

export function getExcerpt(post: Post, maxLength = 160): string {
  const excerptText = post.excerpt?.rendered
    ? stripHtml(post.excerpt.rendered)
    : stripHtml(post.content.rendered);

  if (excerptText.length <= maxLength) {
    return excerptText;
  }

  return `${excerptText.slice(0, maxLength).trimEnd()}…`;
}

export function formatPostDate(dateString?: string): string {
  if (!dateString) {
    return "—";
  }

  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getCategoryName(post: Post): string {
  const terms = post._embedded?.["wp:term"];

  if (terms) {
    for (const termGroup of terms) {
      const category = termGroup.find((term) => term.taxonomy === "category");
      if (category) {
        return category.name;
      }
    }
  }

  return "Uncategorized";
}

export function getAuthorName(post: Post): string {
  return post._embedded?.author?.[0]?.name ?? "admin";
}

export function getFeaturedImageUrl(post: Post): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return media?.source_url ?? null;
}

export function getFeaturedImageAlt(post: Post): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return media?.alt_text || stripHtml(post.title.rendered);
}
