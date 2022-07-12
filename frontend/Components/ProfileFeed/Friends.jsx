import styles from "../../styles/Friends.module.css";

const Friends = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.title}>Friends</div>
      <div className={styles.friendsCount}>15 Friends</div>
      <div className={styles.friends}>
        <div className={styles.friend}>
          <img src="/images/lorde.jpg" />
          <span>Vikas kumawat</span>
        </div>
        <div className={styles.friend}>
          <img src="/images/lorde.jpg" />
          <span>Vikas kumawat</span>
        </div>{" "}
        <div className={styles.friend}>
          <img src="/images/lorde.jpg" />
          <span>Vikas kumawat</span>
        </div>{" "}
        <div className={styles.friend}>
          <img src="/images/lorde.jpg" />
          <span>Vikas kumawat</span>
        </div>{" "}
        <div className={styles.friend}>
          <img src="/images/lorde.jpg" />
          <span>Vikas kumawat</span>
        </div>{" "}
        <div className={styles.friend}>
          <img src="/images/lorde.jpg" />
          <span>Vikas kumawat</span>
        </div>{" "}
        <div className={styles.friend}>
          <img src="/images/lorde.jpg" />
          <span>Vikas kumawat</span>
        </div>{" "}
        <div className={styles.friend}>
          <img src="/images/lorde.jpg" />
          <span>Vikas kumawat</span>
        </div>{" "}
        <div className={styles.friend}>
          <img src="/images/lorde.jpg" />
          <span>Vikas kumawat</span>
        </div>
      </div>
    </div>
  );
};
export default Friends;
