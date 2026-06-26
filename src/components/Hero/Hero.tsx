import styles from "./Hero.module.css";

interface HeroProps {
  onExplore?: () => void;
}

function Hero({ onExplore }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          Headless WordPress
        </h1>
        <p className={styles.subtitle}>
          Modern React + TypeScript + WordPress REST API Demo
        </p>
        <button type="button" className={styles.cta} onClick={onExplore}>
          Explore Posts
          <span className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </section>
  );
}

export default Hero;
