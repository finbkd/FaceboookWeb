import styles from "../../styles/voicecall.module.css";

const Voicecall = () => {
  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.profile}></div>
        <div className={styles.controls}></div>
        <div className={styles.otherUserVideo}></div>
        <div className={styles.userVideo}></div>
      </div>
    </div>
  );
};
export default Voicecall;
