import type { Post } from "../types/post";

const API_URL = import.meta.env.VITE_API_URL;

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts?per_page=10&_embed`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};