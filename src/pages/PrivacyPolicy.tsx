import { useEffect, useState } from "react";

import { getPageBySlug } from "../api/wordpress";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Skeleton from "../components/Skeleton";
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

  return (
    <div className={styles.page}>
      <Header />

      {loading ? (
        <div className={styles.container}>
          <Skeleton width="40%" height="36px" />
          <div className={styles.skeletonContent}>
            <Skeleton width="100%" height="16px" />
            <Skeleton width="95%" height="16px" />
            <Skeleton width="90%" height="16px" />
            <Skeleton width="100%" height="16px" />
          </div>
        </div>
      ) : error || !page ? (
        <div className={styles.container}>
          <p className={styles.error} role="alert">
            {error ?? "Privacy Policy page not found."}
          </p>
        </div>
      ) : (
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
      )}

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
