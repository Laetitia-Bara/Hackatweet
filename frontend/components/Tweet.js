import styles from "../styles/Tweet.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Tweet() {
  const dispatch = useDispatch();
  const [tweetInput, setTweetInput] = useState("");
  const [tweetLength, setTweetLength] = useState(0);

  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.firstname);
  const firstname = useSelector((state) => state.user.username);

  const handleTweetChange = (tweet) => {
    setTweetInput(tweet);
    setTweetLength(tweet.length);
  };

  const backendUrl = "http://localhost:3000";

  const handleTweetClick = (tweet) => {
    fetch(`${backendUrl}/tweet/newTweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tweet: tweetInput,
        username: username,
        firstname: firstname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          // dispatch(addTweetToStore()); envoyer objet avec syntaxe ok avec props dans Home pour lastTweet
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
