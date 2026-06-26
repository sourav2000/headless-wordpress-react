import type { Post } from "../../types/post";
import {
  formatPostDate,
  getFeaturedImageAlt,
  getFeaturedImageUrl,
  stripHtml,
} from "../../utils/post";
import Skeleton from "../Skeleton";
import styles from "./RecentPosts.module.css";

interface RecentPostsProps {
  posts: Post[];
}

function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <ul className={styles.list}>
      {posts.map((post) => {
        const imageUrl = getFeaturedImageUrl(post);
        const title = stripHtml(post.title.rendered);
        const href = post.link ?? "#";

        return (
          <li key={post.id}>
            <a
              className={styles.item}
              href={href}
              target={post.link ? "_blank" : undefined}
              rel={post.link ? "noopener noreferrer" : undefined}
            >
              <div className={styles.thumbnail}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={getFeaturedImageAlt(post)}
                    loading="lazy"
                    width={56}
                    height={56}
                  />
                ) : (
                  <div className={styles.thumbnailPlaceholder} aria-hidden="true" />
                )}
              </div>
              <div className={styles.info}>
                <span className={styles.title}>{title}</span>
                <time className={styles.date} dateTime={post.date}>
                  {formatPostDate(post.date)}
                </time>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function RecentPostsSkeleton() {
  return (
    <div className={styles.skeletonList} aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={styles.skeletonItem}>
          <Skeleton width="56px" height="56px" />
          <div className={styles.skeletonInfo}>
            <Skeleton width="100%" height="14px" />
            <Skeleton width="60%" height="12px" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentPosts;
