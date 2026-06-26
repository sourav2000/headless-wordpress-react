import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/#categories" },
  { label: "About", to: "/about" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Contact", to: "/contact" },
] as const;

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; 2026 Headless WordPress. All rights reserved.
        </p>

        <nav aria-label="Footer navigation">
          <ul className={styles.navList}>
            {FOOTER_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={styles.navLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
