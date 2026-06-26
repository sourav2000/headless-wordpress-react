import { Link, useLocation } from "react-router-dom";

import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/#categories" },
  { label: "About", to: "/about" },
  { label: "Privacy Policy", to: "/privacy-policy" },
] as const;

function WordPressLogo() {
  return (
    <svg
      className={styles.logo}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.5 0 1.74-.523 3.36-1.42 4.71L8.21 4.92A8.456 8.456 0 0 1 12 3.5zM3.5 12c0-1.74.523-3.36 1.42-4.71l10.87 11.79A8.456 8.456 0 0 1 12 20.5 8.5 8.5 0 0 1 3.5 12z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13.5 13.5L17 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M15.5 11.5a6 6 0 0 1-7-7 6 6 0 1 0 7 7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface HeaderProps {
  onSearch?: (query: string) => void;
}

function Header({ onSearch }: HeaderProps) {
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = String(formData.get("search") ?? "").trim();
    onSearch?.(query);
  };

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    if (to.startsWith("/#")) return false;
    return location.pathname === to;
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand} aria-label="Headless WordPress home">
          <WordPressLogo />
          <span className={styles.brandText}>Headless WordPress</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`${styles.navLink} ${isActive(to) ? styles.navLinkActive : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <label htmlFor="header-search" className="sr-only">
              Search posts
            </label>
            <span className={styles.searchIcon} aria-hidden="true">
              <SearchIcon />
            </span>
            <input
              id="header-search"
              name="search"
              type="search"
              className={styles.searchInput}
              placeholder="Search..."
              autoComplete="off"
            />
          </form>

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Toggle dark mode"
          >
            <MoonIcon />
          </button>

          <button type="button" className={styles.loginButton}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
