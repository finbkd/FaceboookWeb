import styles from "../../styles/Photos.module.css";

const Photos = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.title}>Photos</div>
      <div className={styles.photos}>
        <img src="/images/lorde.jpg" />
        <img src="/images/lorde.jpg" />
        <img src="/images/lorde.jpg" />
        <img src="/images/lorde.jpg" />
        <img src="/images/lorde.jpg" />
        <img src="/images/lorde.jpg" />
        <img src="/images/lorde.jpg" />
        <img src="/images/lorde.jpg" />
        <img src="/images/lorde.jpg" />
      </div>
    </div>
  );
};
export default Photos;
