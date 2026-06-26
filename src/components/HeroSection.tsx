import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <header className={styles.hero}>
      <h1 className={styles.title}>Headless WordPress</h1>
      <p className={styles.subtitle}>
        Headless WordPress uses WordPress as the backend CMS and React as the
        frontend.
      </p>
    </header>
  );
}

export default HeroSection;
