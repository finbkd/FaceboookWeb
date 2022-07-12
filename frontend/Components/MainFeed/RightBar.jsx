import styles from "../../styles/RightBar.module.css";

const RightBar = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Title}>Contacts</div>
      <div className={styles.friend}>
        <img className={styles.photo} src="/images/lorde.jpg" />
        <div className={styles.name}>Vikas Kumawat</div>
      </div>
      <div className={styles.friend}>
        <img className={styles.photo} src="/images/lorde.jpg" />
        <div className={styles.name}>Vikas Kumawat</div>
      </div>
      <div className={styles.friend}>
        <img className={styles.photo} src="/images/lorde.jpg" />
        <div className={styles.name}>Vikas Kumawat</div>
      </div>
      <div className={styles.friend}>
        <img className={styles.photo} src="/images/lorde.jpg" />
        <div className={styles.name}>Vikas Kumawat</div>
      </div>
      <div className={styles.friend}>
        <img className={styles.photo} src="/images/lorde.jpg" />
        <div className={styles.name}>Vikas Kumawat</div>
      </div>
    </div>
  );
};
export default RightBar;
