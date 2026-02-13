import styles from "../styles/LastTweet.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { switchLikeChange } from "../reducers/tweet";

function LastTweet(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);

  const handleHeartClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweet/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tweetId: props.id,
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(switchLikeChange());
        }
      });
  };

  const heart =
    props.likedByUser === false ? (
      <FontAwesomeIcon
        icon={faHeart}
        onClick={() => handleHeartClick()}
        className={styles.like}
      />
    ) : (
      <FontAwesomeIcon
        icon={faHeart}
        onClick={() => handleHeartClick()}
        style={{ color: "red" }}
        className={styles.like}
      />
    );

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
        {heart}
        <div>{props.isLiked.length}</div>
      </div>
    </div>
  );
}

export default LastTweet;
