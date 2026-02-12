<<<<<<< HEAD
import styles from "../styles/LastTweet.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

function LastTweet(props) {
  return (
    <div className={styles.main}>
      <div className={styles.tweetInfos}>
        <Image src={"/userImage.png"} alt="userImage" width={20} height={20} />
        <div className={styles.firstName}>
          <p>{props.firstname}</p>
        </div>
        <div className={styles.username}>
          <p>@{props.username}</p>
        </div>
        <div className={styles.time}>
          <p>{props.createdAt}</p>
        </div>
      </div>
      <div className={styles.content}>
        <p>{props.content}</p>
      </div>
      <div className={styles.icons}>
        <p>Coeur</p>
        <div>Nb coeurs</div>
      </div>
    </div>
  );
}

export default LastTweet;
=======
import { useEffect, useState } from "react";

export default function LastTweet({ refreshKey }) {
  const [tweets, setTweets] = useState([]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchTweets = async () => {
    const res = await fetch(`${backendUrl}/tweets`);
    const data = await res.json();
    if (data.result) setTweets(data.tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, [refreshKey]);

  return (
    <div>
      {tweets.map((t) => (
        <div key={t._id}>{t.content}</div>
      ))}
    </div>
  );
}
>>>>>>> 3cf80f2ad8de23c3a456c36951426b371d6e9aa6
