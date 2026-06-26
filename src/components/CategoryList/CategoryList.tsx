import type { Category } from "../../types/category";
import Skeleton from "../Skeleton";
import styles from "./CategoryList.module.css";

interface CategoryListProps {
  categories: Category[];
  totalPosts: number;
  activeCategoryId?: number | null;
  onSelect?: (categoryId: number | null) => void;
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CategoryList({
  categories,
  totalPosts,
  activeCategoryId = null,
  onSelect,
}: CategoryListProps) {
  return (
    <ul className={styles.list}>
      <li>
        <button
          type="button"
          className={`${styles.item} ${activeCategoryId === null ? styles.itemActive : ""}`}
          onClick={() => onSelect?.(null)}
        >
          <span className={styles.label}>
            All Posts
            <span className={styles.count}>({totalPosts})</span>
          </span>
          <ChevronIcon />
        </button>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <button
            type="button"
            className={`${styles.item} ${activeCategoryId === category.id ? styles.itemActive : ""}`}
            onClick={() => onSelect?.(category.id)}
          >
            <span className={styles.label}>
              {category.name}
              <span className={styles.count}>({category.count})</span>
            </span>
            <ChevronIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function CategoryListSkeleton() {
  return (
    <div className={styles.skeletonList} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} height="40px" />
      ))}
    </div>
  );
}

export default CategoryList;
