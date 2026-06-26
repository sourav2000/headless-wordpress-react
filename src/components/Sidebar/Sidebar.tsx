import type { Category } from "../../types/category";
import type { Post } from "../../types/post";
import CategoryList, { CategoryListSkeleton } from "../CategoryList";
import RecentPosts, { RecentPostsSkeleton } from "../RecentPosts";
import SearchBox from "../SearchBox";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  categories: Category[];
  recentPosts: Post[];
  totalPosts: number;
  loading?: boolean;
  searchQuery?: string;
  activeCategoryId?: number | null;
  onSearch: (query: string) => void;
  onCategorySelect?: (categoryId: number | null) => void;
}

function Sidebar({
  categories,
  recentPosts,
  totalPosts,
  loading = false,
  searchQuery = "",
  activeCategoryId = null,
  onSearch,
  onCategorySelect,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Sidebar">
      <div className={styles.widget}>
        <h2 className={styles.heading}>Search</h2>
        <SearchBox onSearch={onSearch} defaultValue={searchQuery} />
      </div>

      <div className={styles.widget} id="categories">
        <h2 className={styles.heading}>Categories</h2>
        {loading ? (
          <CategoryListSkeleton />
        ) : (
          <CategoryList
            categories={categories}
            totalPosts={totalPosts}
            activeCategoryId={activeCategoryId}
            onSelect={onCategorySelect}
          />
        )}
      </div>

      <div className={styles.widget}>
        <h2 className={styles.heading}>Recent Posts</h2>
        {loading ? (
          <RecentPostsSkeleton />
        ) : (
          <RecentPosts posts={recentPosts} />
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
