import styles from "./Skeleton.module.css";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

function Skeleton({
  className = "",
  width,
  height,
  rounded = false,
}: SkeletonProps) {
  const style = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <div
      className={`${styles.skeleton} ${rounded ? styles.rounded : ""} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
