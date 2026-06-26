import Skeleton from "../Skeleton";
import styles from "./PostCard.module.css";

export function PostCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <Skeleton className={styles.skeletonImage} width="280px" height="170px" rounded />
      <div className={styles.body}>
        <Skeleton width="100px" height="24px" />
        <Skeleton width="70%" height="28px" />
        <Skeleton width="100%" height="16px" />
        <Skeleton width="90%" height="16px" />
        <Skeleton width="60%" height="16px" />
        <div className={styles.footer}>
          <Skeleton width="180px" height="16px" />
          <Skeleton width="90px" height="16px" />
        </div>
      </div>
    </div>
  );
}
