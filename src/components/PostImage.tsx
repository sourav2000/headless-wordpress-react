import styles from "./PostImage.module.css";

interface PostImageProps {
  src: string | null;
  alt: string;
}

function PostImage({ src, alt }: PostImageProps) {
  if (src) {
    return (
      <div className={styles.wrapper}>
        <img className={styles.image} src={src} alt={alt} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.placeholder} aria-hidden="true">
        <svg
          className={styles.placeholderIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
    </div>
  );
}

export default PostImage;
