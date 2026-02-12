import { useRouter } from "next/router";
import UserPanel from "./UserPanel";
import styles from "./LeftColumn.module.css";

export default function LeftColumn() {
  const router = useRouter();

  return (
    <aside className={styles.leftColumn}>
      <button
        className={styles.logoButton}
        onClick={() => router.push("/home")}
      >
        <img src="/images/bird.svg" alt="logo" className={styles.logoImg} />
      </button>

      <div className={styles.spacer} />

      <UserPanel />
    </aside>
  );
}
