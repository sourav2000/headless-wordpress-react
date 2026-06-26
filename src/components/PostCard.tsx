import type { Post } from "../types/post";
import {
  formatPostDate,
  getCategoryName,
  getExcerpt,
  getFeaturedImageAlt,
  getFeaturedImageUrl,
} from "../utils/post";
import PostImage from "./PostImage";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
}

function CalendarIcon() {
  return (
    <svg
      className={styles.metaIcon}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="3"
        width="12"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M5 2v2M11 2v2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      className={styles.metaIcon}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 4.5A1.5 1.5 0 0 1 3.5 3H6l1.5 2h5A1.5 1.5 0 0 1 14 6.5v6A1.5 1.5 0 0 1 12.5 14h-9A1.5 1.5 0 0 1 2 12.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PostCard({ post }: PostCardProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const excerpt = getExcerpt(post);
  const category = getCategoryName(post);
  const formattedDate = formatPostDate(post.date);
  const readMoreHref = post.link ?? "#";

  return (
    <article className={styles.card}>
      <PostImage src={imageUrl} alt={getFeaturedImageAlt(post)} />

      <div className={styles.content}>
        <h2
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <CalendarIcon />
            <time dateTime={post.date}>{formattedDate}</time>
          </span>
          <span className={styles.metaItem}>
            <FolderIcon />
            <span>{category}</span>
          </span>
        </div>
      </div>

      <div className={styles.action}>
        <a
          className={styles.readMore}
          // href={readMoreHref}
          // target={post.link ? "_blank" : undefined}
          // rel={post.link ? "noopener noreferrer" : undefined}
        >
          Read More
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export default PostCard;
