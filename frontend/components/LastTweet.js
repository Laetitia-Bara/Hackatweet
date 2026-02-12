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
