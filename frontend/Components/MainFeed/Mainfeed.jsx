import styles from "../../styles/MainFeed.module.css";
import Posts from "../Posts";
import Share from "../Share";
import Story from "./Story";

const Mainfeed = () => {
  return (
    <div className={styles.Container}>
      <Story />
      <Share />
      <Posts />
    </div>
  );
};
export default Mainfeed;
