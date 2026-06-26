import type { Page } from "../types/page";
import type { Post } from "../types/post";

const API_URL = import.meta.env.VITE_API_URL;

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts?per_page=10&_embed`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  const response = await fetch(`${API_URL}/pages?slug=${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch page");
  }

  const pages: Page[] = await response.json();
  return pages[0] ?? null;
};