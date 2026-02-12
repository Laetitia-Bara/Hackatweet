import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../reducers/user";
import styles from "../styles/UserPanel.module.css";

export default function UserPanel() {
  const dispatch = useDispatch();
  const router = useRouter();

  const firstname = useSelector((state) => state.user.firstname);
  const username = useSelector((state) => state.user.username);

  const initials = (firstname || "U")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  const handleLogout = () => dispatch(logout());

  return (
    <div className={styles.userPanel}>
      <div className={styles.userRow}>
        <div className={styles.avatar}>{initials}</div>

        <div className={styles.userText}>
          <p className={styles.name}>{firstname || "Guest"}</p>
          <p className={styles.handle}>@{username || "unknown"}</p>
        </div>
      </div>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
