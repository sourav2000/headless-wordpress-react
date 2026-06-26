import styles from "./LoadingState.module.css";

function LoadingState() {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.text}>Loading posts…</p>
    </div>
  );
}

export default LoadingState;
