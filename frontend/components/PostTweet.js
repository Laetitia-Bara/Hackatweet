import styles from "../styles/Tweet.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Tweet({ onTweetPosted }) {
  const [tweetInput, setTweetInput] = useState("");
  const token = useSelector((state) => state.user.token);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleTweetChange = (value) => {
    const v = value.slice(0, 280);
    setTweetInput(v);
  };

  const handleTweetClick = async () => {
    if (!tweetInput.trim()) return;

    const res = await fetch(`${backendUrl}/tweets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, content: tweetInput }),
    });

    const data = await res.json();

    if (data.result) {
      setTweetInput("");
      onTweetPosted?.(); // refresh feed/trends
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <input
          className={styles.inputTweet}
          type="text"
          maxLength={280}
          placeholder="What's up?"
          onChange={(e) => handleTweetChange(e.target.value)}
          value={tweetInput}
        />
      </div>

      <div className={styles.tweetActions}>
        <div className={styles.check}>{tweetInput.length}/280</div>

        <button
          className={styles.btnTweet}
          onClick={handleTweetClick}
          disabled={!tweetInput.trim()}
          style={{ opacity: tweetInput.trim() ? 1 : 0.5 }}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}
