import styles from "../styles/Modal.module.css";

export default function Modal({ title, children, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ×
        </button>

        <img className={styles.logo} src="/images/bird.svg" alt="logo" />

        <h2 className={styles.title}>{title}</h2>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
