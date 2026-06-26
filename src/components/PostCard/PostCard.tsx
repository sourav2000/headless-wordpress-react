import type { Post } from "../../types/post";
import {
  formatPostDate,
  getAuthorName,
  getCategoryName,
  getExcerpt,
  getFeaturedImageAlt,
  getFeaturedImageUrl,
} from "../../utils/post";
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

function UserIcon() {
  return (
    <svg
      className={styles.metaIcon}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M3.5 13.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PostCard({ post }: PostCardProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const excerpt = getExcerpt(post);
  const category = getCategoryName(post);
  const author = getAuthorName(post);
  const formattedDate = formatPostDate(post.date);
  const readMoreHref = post.link ?? "#";

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img
            className={styles.image}
            src={imageUrl}
            alt={getFeaturedImageAlt(post)}
            loading="lazy"
            width={280}
            height={170}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
              <path
                d="M3 16l4.5-4.5 3 3L14 11l7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.badge}>{category}</span>

        <h2
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.footer}>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <CalendarIcon />
              <time dateTime={post.date}>{formattedDate}</time>
            </span>
            <span className={styles.metaItem}>
              <UserIcon />
              <span>{author}</span>
            </span>
          </div>

          <a
            className={styles.readMore}
            href={readMoreHref}
            target={post.link ? "_blank" : undefined}
            rel={post.link ? "noopener noreferrer" : undefined}
          >
            Read More
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
