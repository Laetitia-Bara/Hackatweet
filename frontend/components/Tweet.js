import styles from "../styles/Tweet.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Tweet() {
  const [tweetInput, setTweetInput] = useState("");
  const [tweetLength, setTweetLength] = useState(0);

  const token = useSelector((state) => state.user.token);

  const handleTweetChange = (tweet) => {
    setTweetInput(tweet);
    setTweetLength(tweet.length);
  };

  const backendUrl = "http://localhost:3000";

  const handleTweetClick = (tweet) => {
    fetch(`${backendUrl}/tweet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        tweet: tweetInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // fetch route qui affiche tous les tweets
          setTweetInput("");
          setTweetLength(0);
        }
      });
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
        <button
          className={styles.btnTweet}
          id="tweet"
          onClick={() => handleTweetClick(tweetInput)}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}

export default Tweet;
