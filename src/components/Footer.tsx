import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>&copy; 2026 Headless WordPress</p>

        <nav className={styles.nav} aria-label="Footer navigation">
          <ul className={styles.navList}>
            <li>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className={styles.navLink}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
