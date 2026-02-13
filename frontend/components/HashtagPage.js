import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "../styles/Home.module.css"; // layout 3 colonnes

import Trends from "./Trends";
import LastTweet from "./LastTweet"; // ou ta liste tweet
import Tweet from "./Tweet"; // si tu veux garder le tweet box

export default function HashtagPage() {
  const router = useRouter();
  const { tag } = router.query;

  const token = useSelector((state) => state.user.token);

  const [search, setSearch] = useState("");
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // guard
  useEffect(() => {
    if (token === null) return; // redux persist peut mettre un tick
    if (!token) router.replace("/");
  }, [token, router]);

  const fetchTweetsByHashtag = async (t) => {
    if (!t) return;

    try {
      setError("");
      const res = await fetch(`${backendUrl}/tweet/byHashtag/${t}`);
      const data = await res.json();

      if (!data.result) {
        setTweets([]);
        setError(data.error || "Could not load tweets");
        return;
      }
      setTweets(data.tweets || []);
    } catch (e) {
      setError("Network/server error");
      setTweets([]);
    }
  };

  useEffect(() => {
    if (!tag) return;
    setSearch(tag);
    fetchTweetsByHashtag(tag);
  }, [tag, refreshKey]);

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = (search || "").trim().replace(/^#/, "").toLowerCase();
    if (!clean) return;
    router.push(`/hashtag/${clean}`);
  };

  return (
    <main className={styles.main}>
      {/* LEFT */}
      <div className={styles.left}>
        {/* logo clickable */}
        <div
          className={styles.logo}
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        >
          <img src="/logo.png" alt="logo" width={60} height={60} />
        </div>
        {/* ici user panel / logout etc */}
      </div>

      {/* CENTER */}
      <div className={styles.center}>
        <div className={styles.home}>
          <p>#{tag}</p>
        </div>

        {/* search bar */}
        <form onSubmit={handleSearch} style={{ padding: "10px 0" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hashtag"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 20,
              border: "1px solid #2f3336",
              background: "transparent",
              color: "white",
              outline: "none",
            }}
          />
        </form>

        {/* list */}
        {error ? (
          <p style={{ opacity: 0.8 }}>{error}</p>
        ) : tweets.length === 0 ? (
          <p style={{ opacity: 0.8 }}>No tweets found with #{tag}</p>
        ) : (
          <div>
            {tweets.map((tw) => (
              <div
                key={tw._id}
                style={{ borderTop: "1px solid #2f3336", padding: "12px 0" }}
              >
                <div style={{ fontWeight: 700 }}>
                  {tw.authorFirstname}{" "}
                  <span style={{ opacity: 0.7 }}>@{tw.authorUsername}</span>
                </div>
                <div style={{ marginTop: 6 }}>{tw.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div className={styles.trendsTitle}>
          <p>Trends</p>
        </div>
        <div className={styles.trendsContent}>
          <Trends refreshKey={refreshKey} />
        </div>
      </div>
    </main>
  );
}
