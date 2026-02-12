import styles from "../styles/Home.module.css";
import Image from "next/image";
import Head from "next/head";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { addTweetToStore, emptyTweetInStore } from "../reducers/tweet";

import LastTweet from "./LastTweet";
import Tweet from "./Tweet";
import Trends from "./Trends";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../reducers/user";

function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const firstname = useSelector((state) => state.user.firstname);
  const username = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);
  const tweets = useSelector((state) => state.tweet.value);

  // guard
  useEffect(() => {
    if (!token) router.replace("/");
  }, [token, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

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
          dispatch(emptyTweetInStore());
          dispatch(addTweetToStore(data.latestTweets));
        }
      });
  }, []);

  const latestTweets = tweets.map((data, i) => (
    <LastTweet
      key={i}
      firstname={data.authorFirstname}
      username={data.authorUsername}
      content={data.content}
      createdAt={data.createdAt}
      isLiked={data.isLiked}
    />
  ));

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
              <button className={styles.btnLogout} onClick={handleLogout}>
                Logout
              </button>
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
          <div className={styles.lastTweet}>{latestTweets}</div>
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
