import type { Category } from "../types/category";
import type { Post, PostsResponse } from "../types/post";

const API_URL = import.meta.env.VITE_API_URL;

const inflightRequests = new Map<string, Promise<unknown>>();

function dedupe<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const existing = inflightRequests.get(key);
  if (existing) {
    return existing as Promise<T>;
  }

  const promise = fetcher().finally(() => {
    inflightRequests.delete(key);
  });

  inflightRequests.set(key, promise);
  return promise;
}

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
  const url = buildPostsUrl(page, perPage, options);

  return dedupe(url, async () => {
    const response = await fetch(url);
    return parsePostsResponse(response);
  });
};

export const getRecentPosts = async (): Promise<Post[]> => {
  const url = buildPostsUrl(1, 4);

  return dedupe(url, async () => {
    const response = await fetch(url);
    const { posts } = await parsePostsResponse(response);
    return posts;
  });
};

export const getCategories = async (): Promise<Category[]> => {
  const url = `${API_URL}/categories?per_page=100`;

  return dedupe(url, async () => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  });
};

export const getPageBySlug = async (slug: string) => {
  const url = `${API_URL}/pages?slug=${slug}`;

  return dedupe(url, async () => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch page");
    }

    const pages = await response.json();
    return pages[0] ?? null;
  });
};
