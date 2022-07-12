import { StylesProvider } from "@chakra-ui/react";
import styles from "../../styles/ProfileFeed.module.css";
import Posts from "../Posts";
import Share from "../Share";
import Friends from "./Friends";
import Intro from "./Intro";
import Photos from "./Photos";

const ProfileFeed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <img className={styles.Cover} src="/images/cover.jpg"></img>
        <div className={styles.userInfo}>
          <div className={styles.userInfoTop}>
            <img className={styles.profileImg} src="/images/lorde.jpg" />
            <div className={styles.profileLeft}>
              <div className={styles.name}>Vikas kumawat</div>
              <div className={styles.friendsCount}>15 friends</div>
              <div className={styles.friendsIcon}>
                <img className={styles.firsticon} src="images/lorde-2.jpg" />
                <img className={styles.icon} src="images/lorde-3.jpg" />
                <img className={styles.icon} src="images/lorde-4.png" />
                <img className={styles.icon} src="images/lorde-5.jpg" />
                <img className={styles.icon} src="images/lorde-2.jpg" />
                <img className={styles.icon} src="images/lorde-3.jpg" />
                <img className={styles.icon} src="images/lorde-4.png" />
                <img className={styles.icon} src="images/lorde-5.jpg" />
              </div>
            </div>
            <div className={styles.profileRight}>
              <button className={styles.story}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
                </svg>
                Add to Story
              </button>
              <button className={styles.edit}>
                {" "}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z" />
                </svg>{" "}
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <div className={styles.userInfoBottom}>
            <div className={styles.userinfolink}>Posts</div>
            <div className={styles.userinfolink}>About</div>
            <div className={styles.userinfolink}>Friends</div>
            <div className={styles.userinfolink}>Photos</div>
          </div>
        </div>
      </div>
      <div className={styles.miscContainer}>
        <div className={styles.left}>
          <Intro />
          <Photos />
          <Friends />
        </div>
        <div className={styles.right}>
          <Share />
          <Posts />
        </div>
      </div>
    </div>
  );
};
export default ProfileFeed;
