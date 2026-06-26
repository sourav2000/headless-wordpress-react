import { useEffect, useState } from "react";

import { getPosts } from "../api/wordpress";
import HeroSection from "../components/HeroSection";
import LoadingState from "../components/LoadingState";
import PostCard from "../components/PostCard";
import type { Post } from "../types/post";
import styles from "./Posts.module.css";

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <LoadingState />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <HeroSection />

        <section className={styles.list} aria-label="Blog posts">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Posts;
