import type { Category } from "../types/category";
import type { Post, PostsResponse } from "../types/post";

const API_URL = import.meta.env.VITE_API_URL;

interface GetPostsOptions {
  search?: string;
  categoryId?: number | null;
}

const buildPostsUrl = (
  page: number,
  perPage: number,
  options?: GetPostsOptions,
): string => {
  const params = new URLSearchParams({
    _embed: "",
    per_page: String(perPage),
    page: String(page),
  });

  if (options?.search) {
    params.set("search", options.search);
  }

  if (options?.categoryId) {
    params.set("categories", String(options.categoryId));
  }

  return `${API_URL}/posts?${params}`;
};

const parsePostsResponse = async (
  response: Response,
): Promise<PostsResponse> => {
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const total = Number(response.headers.get("X-WP-Total") ?? 0);
  const totalPages = Number(response.headers.get("X-WP-TotalPages") ?? 1);
  const posts: Post[] = await response.json();

  return { posts, totalPages, total };
};

export const getPosts = async (
  page = 1,
  perPage = 10,
  options?: GetPostsOptions,
): Promise<PostsResponse> => {
  const response = await fetch(buildPostsUrl(page, perPage, options));
  return parsePostsResponse(response);
};

export const getRecentPosts = async (): Promise<Post[]> => {
  const response = await fetch(buildPostsUrl(1, 4));
  const { posts } = await parsePostsResponse(response);
  return posts;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/categories?per_page=100`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const getPageBySlug = async (slug: string) => {
  const response = await fetch(`${API_URL}/pages?slug=${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch page");
  }

  const pages = await response.json();
  return pages[0] ?? null;
};
