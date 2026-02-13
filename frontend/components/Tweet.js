import styles from "../styles/Tweet.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTweetToStore,
  emptyTweetInStore,
  switchLikeChange,
} from "../reducers/tweet";

function Tweet({ onTweetPosted }) {
  const dispatch = useDispatch();
  const [tweetInput, setTweetInput] = useState("");
  const [tweetLength, setTweetLength] = useState(0);

  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);
  const firstname = useSelector((state) => state.user.firstname);

  const handleTweetChange = (tweet) => {
    setTweetInput(tweet);
    setTweetLength(tweet.length);
  };

  const handleTweetClick = (tweet) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweet/newTweet`, {
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
        if (data.result) {
          // const tweetPackage = {
          //   authorFirstname: firstname,
          //   authorUsername: username,
          //   content: tweetInput,
          //   createdAt: Date.now(),
          //   isLiked: [],
          // };
          // dispatch(addTweetToStore([tweetPackage]));
          dispatch(switchLikeChange());
          setTweetInput("");
          setTweetLength(0);
          onTweetPosted?.();
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
