import styles from "../styles/Home.module.css";
import Image from "next/image";
import Head from "next/head";

import LastTweet from "./LastTweet";
import Tweet from "./Tweet";
import Trends from "./Trends";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../reducers/user";

function Home() {
  //const firstname = "John";
  //const username = "JohnCena";

  const dispatch = useDispatch();
  const router = useRouter();

  const firstname = useSelector((state) => state.user.firstname);
  const username = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.user.token);

  // guard
  useEffect(() => {
    if (!token) router.replace("/");
  }, [token, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

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
