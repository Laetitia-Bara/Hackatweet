import styles from "../styles/Home.module.css";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTweetToStore } from "../reducers/tweet";

import LastTweet from "./LastTweet";
import Tweet from "./Tweet";
import Trends from "./Trends";

function Home() {
  const dispatch = useDispatch();
  const firstname = "John";
  const username = "JohnCena";

  // const token = useSelector((state) => state.user.token);
  // const username = useSelector((state) => state.user.firstname);
  // const firstname = useSelector((state) => state.user.username);

  const backendUrl = "http://localhost:3000";

  useEffect(() => {
    fetch(`${backendUrl}/tweet/tweetList`, {
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.latestTweets);
          dispatch(addTweetToStore(data.latestTweets));
        }
      });
  }, []);

  //creer le composant LastTweet et le maper autant de fois qu'il y a de tweet dans mon reucer twwet

  return (
    <>
      <Head>
        <title>Hackatweet - Home</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Image src={"/logo.png"} alt="logo" width={60} height={60} />
          </div>
          <div className={styles.informations}>
            <div className={styles.userInfos}>
              <div className={styles.profilePicture}>
                <Image
                  src={"/userImage.png"}
                  alt="userImage"
                  width={80}
                  height={80}
                />
              </div>
              <div className={styles.userDetails}>
                <div className={styles.firstname}>
                  <p>{firstname}</p>
                </div>
                <div className={styles.username}>
                  <p>@{username}</p>
                </div>
              </div>
            </div>
            <div className={styles.logout}>
              <button className={styles.btnLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.home}>
            <p>Home</p>
          </div>
          <div className={styles.postTweet}>
            <Tweet />
          </div>
          <div className={styles.lastTweet}></div>
        </div>
        <div className={styles.right}>
          <div className={styles.trendsTitle}>
            <p>Trends</p>
          </div>
          <div className={styles.trendsContent}></div>
        </div>
      </main>
    </>
  );
}

export default Home;
