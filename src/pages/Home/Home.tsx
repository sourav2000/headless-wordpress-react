import { useEffect, useRef, useState } from "react";

import { getCategories, getPosts, getRecentPosts } from "../../api/wordpress";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Pagination from "../../components/Pagination";
import PostCard, { PostCardSkeleton } from "../../components/PostCard";
import Sidebar from "../../components/Sidebar";
import type { Category } from "../../types/category";
import type { Post } from "../../types/post";
import styles from "./Home.module.css";

const POSTS_PER_PAGE = 10;

function Home() {
  const postsRef = useRef<HTMLElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allPostsTotal, setAllPostsTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [postsLoading, setPostsLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loading = postsLoading || sidebarLoading;

  useEffect(() => {
    let ignore = false;

    async function fetchSidebar() {
      try {
        const [categoriesData, recentData] = await Promise.all([
          getCategories(),
          getRecentPosts(),
        ]);

        if (ignore) return;

        setCategories(categoriesData);
        setRecentPosts(recentData);
      } catch (err) {
        if (ignore) return;

        console.error("Error fetching sidebar data:", err);
        setError("Unable to load posts. Please try again later.");
      } finally {
        if (!ignore) {
          setSidebarLoading(false);
        }
      }
    }

    void fetchSidebar();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function fetchPosts() {
      setError(null);

      try {
        const postsResponse = await getPosts(currentPage, POSTS_PER_PAGE, {
          search: searchQuery || undefined,
          categoryId: activeCategoryId,
        });

        if (ignore) return;

        setPosts(postsResponse.posts);
        setTotalPages(postsResponse.totalPages);

        if (!searchQuery && activeCategoryId === null) {
          setAllPostsTotal(postsResponse.total);
        }
      } catch (err) {
        if (ignore) return;

        console.error("Error fetching posts:", err);
        setError("Unable to load posts. Please try again later.");
      } finally {
        if (!ignore) {
          setPostsLoading(false);
        }
      }
    }

    void fetchPosts();

    return () => {
      ignore = true;
    };
  }, [currentPage, searchQuery, activeCategoryId]);

  const scrollToPosts = () => {
    postsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setPostsLoading(true);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setPostsLoading(true);
    setActiveCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setPostsLoading(true);
    setCurrentPage(page);
    postsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <Header onSearch={handleSearch} />
      <Hero onExplore={scrollToPosts} />

      <div className={styles.container}>
        <div className={styles.layout}>
          <section
            ref={postsRef}
            className={styles.main}
            aria-label="Blog posts"
          >
            {error ? (
              <div className={styles.error} role="alert">
                {error}
              </div>
            ) : loading ? (
              <div className={styles.postList}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className={styles.empty}>
                <p>No posts found. Try a different search or category.</p>
              </div>
            ) : (
              <>
                <div className={styles.postList}>
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </section>

          <Sidebar
            categories={categories}
            recentPosts={recentPosts}
            totalPosts={allPostsTotal}
            loading={loading}
            searchQuery={searchQuery}
            activeCategoryId={activeCategoryId}
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
