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
    if (!router.isReady) return;
    if (!token) router.replace("/");
  }, [token, router.isReady]);

  const fetchTweetsByHashtag = async (t) => {
    if (!t) return;

    try {
      setError("");
      const clean = (t || "").trim().replace(/^#/, "").toLowerCase();
      if (!clean) return;
      const res = await fetch(`${backendUrl}/tweet/byHashtag/${clean}`);
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
    const clean = String(tag).replace(/^#/, "").toLowerCase();
    setSearch(clean);
    fetchTweetsByHashtag(clean);
  }, [tag]);

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

        {/* Search bar zone (comme maquette) */}
        <div className={styles.postTweet}>
          <form onSubmit={handleSearch} style={{ width: "100%" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="#hashtag"
              className={styles.inputHashtag}
            />
          </form>
        </div>

        {/* List zone */}
        <div className={styles.lastTweet}>
          {error ? (
            <p style={{ opacity: 0.8 }}>{error}</p>
          ) : tweets.length === 0 ? (
            <p style={{ opacity: 0.8 }}>No tweets found with #{tag}</p>
          ) : (
            tweets.map((tw) => (
              <div key={tw._id} className={styles.tweetCard}>
                <div className={styles.tweetHeader}>
                  <div className={styles.tweetAuthor}>
                    {tw.authorFirstname} <span>@{tw.authorUsername}</span>
                  </div>
                  <div className={styles.tweetDate}>
                    {new Date(tw.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className={styles.tweetContent}>{tw.content}</div>
              </div>
            ))
          )}
        </div>
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
