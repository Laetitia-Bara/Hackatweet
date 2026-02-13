import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Trends.module.css";

export default function Trends({ refreshKey = 0 }) {
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchTrends = async () => {
    try {
      setError("");
      const res = await fetch(`${backendUrl}/trends`);
      const data = await res.json();

      if (!data.result) {
        setError(data.error || "Could not load trends");
        return;
      }

      setTrends(data.trends || []);
    } catch (e) {
      setError("Network/server error");
    }
  };

  useEffect(() => {
    fetchTrends();
  }, [refreshKey]);

  return (
    <div className={styles.card}>
      {error && <p className={styles.error}>{error}</p>}

      {trends.length === 0 && !error ? (
        <p className={styles.empty}>No trends yet</p>
      ) : (
        trends.map((t) => {
          <button
            key={t.hashtag}
            className={styles.row}
            onClick={() => router.push(`/hashtag/${t.hashtag}`)}
            type="button"
          >
            <div className={styles.tag}>#{t.hashtag}</div>
            <div className={styles.count}>
              {t.count} {t.count > 1 ? "Tweets" : "Tweet"}
            </div>
          </button>;
        })
      )}
    </div>
  );
}
