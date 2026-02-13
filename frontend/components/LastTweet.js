import styles from "../styles/LastTweet.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { switchLikeChange, switchTrashChange } from "../reducers/tweet";

function LastTweet(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);

  const handleHeartClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweet/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        } else {
          console.log(data);
        }
      });
  };

  const handleTrashClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweet/myTweet`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tweetId: props.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(switchTrashChange());
        } else {
          console.log(data);
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

  const trash =
    props.username === username ? (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => handleTrashClick()}
        className={styles.trash}
      />
    ) : (
      <></>
    );

  let time;
  let gapHours = Math.round(
    (Date.now() - new Date(props.createdAt).getTime()) * 2.7778e-7,
  );
  let gapMinutes = Math.round(
    (Date.now() - new Date(props.createdAt).getTime()) * 1.66668e-5,
  );
  let gapSeconds = Math.round(
    (Date.now() - new Date(props.createdAt).getTime()) * 0.001000008,
  );
  let gapDays = Math.round(
    (Date.now() - new Date(props.createdAt).getTime()) * 1.157416667e-8,
  );

  gapDays > 0
    ? (time = gapDays + " day(s)")
    : gapHours > 0
      ? (time = gapHours + " hour(s)")
      : gapMinutes > 0
        ? (time = gapMinutes + " minute(s)")
        : gapSeconds > 0
          ? (time = gapSeconds + " second(s)")
          : (time = "A few seconds ago");

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
          <p>{time}</p>
        </div>
      </div>
      <div className={styles.content}>
        <p>{props.content}</p>
      </div>
      <div className={styles.icons}>
        {heart}
        <div>{props.isLiked.length}</div>
        {trash}
      </div>
    </div>
  );
}

export default LastTweet;
