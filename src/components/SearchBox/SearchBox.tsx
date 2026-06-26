import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
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

function SearchBox({ onSearch, defaultValue = "" }: SearchBoxProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch(String(formData.get("search") ?? "").trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="sidebar-search" className="sr-only">
        Search posts
      </label>
      <input
        id="sidebar-search"
        name="search"
        type="search"
        className={styles.input}
        placeholder="Search..."
        defaultValue={defaultValue}
        autoComplete="off"
      />
      <button type="submit" className={styles.button} aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  );
}

export default SearchBox;
