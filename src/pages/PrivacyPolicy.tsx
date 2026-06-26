import { useEffect, useState } from "react";

import { getPageBySlug } from "../api/wordpress";
import LoadingState from "../components/LoadingState";
import type { Page } from "../types/page";
import styles from "./PrivacyPolicy.module.css";

function PrivacyPolicy() {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageBySlug("privacy-policy");
        if (!data) {
          setError("Privacy Policy page not found.");
          return;
        }
        setPage(data);
      } catch (err) {
        console.error("Error fetching privacy policy:", err);
        setError("Failed to load Privacy Policy.");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <LoadingState />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.error}>{error ?? "Privacy Policy page not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <article className={styles.container}>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        />
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </article>
    </div>
  );
}

export default PrivacyPolicy;
