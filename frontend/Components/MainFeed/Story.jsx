import styles from "../../styles/Story.module.css";
import Image from "next/image";

const Story = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.storyAdd} ${styles.image}`}>
        <Image src={"/images/lorde.jpg"} className={styles.storyImage} width={128} height={182} />
        <svg className={styles.bigcircle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z" />
        </svg>
        <svg className={styles.button} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
        </svg>
        <span>Create story</span>
      </div>
      <div className={`${styles.storyBox} ${styles.image}`}>
        <Image src={"/images/taylor.jpg"} className={`${styles.storyImage}`} width={128} height={233} />
        <span className={styles.storyName}>Vikas kumawat</span>
      </div>
      <div className={`${styles.storyBox} ${styles.image}`}>
        <Image src={"/images/lorde-4.png"} className={styles.storyImage} width={128} height={233} />
        <span className={styles.storyName}>Vikas kumawat</span>
      </div>
      <div className={`${styles.storyBox} ${styles.image}`}>
        <Image src={"/images/lorde-3.jpg"} className={styles.storyImage} width={128} height={233} />
        <span className={styles.storyName}>Vikas kumawat</span>
      </div>
    </div>
  );
};
export default Story;
