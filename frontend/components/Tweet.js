import styles from "../styles/Tweet.module.css";
import { useState, useEffect } from "react";

function Tweet() {
  const [tweetInput, setTweetInput] = useState("");
  const [tweetLength, setTweetLength] = useState(0);

  const handleTweetChange = (tweet) => {
    setTweetInput(tweet);
    setTweetLength(tweet.length);
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <input
          className={styles.inputTweet}
          type="text"
          id="tweet"
          maxLength="280"
          placeholder="What's up?"
          onChange={(e) => handleTweetChange(e.target.value)}
          value={tweetInput}
        ></input>
      </div>
      <div className={styles.tweetActions}>
        <div className={styles.check}>{tweetLength}/280</div>
        <button className={styles.btnTweet}>Tweet</button>
      </div>
    </div>
  );
}

export default Tweet;
