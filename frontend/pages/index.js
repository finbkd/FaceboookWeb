import styles from "../styles/Home.module.css";

import SideBar from "../Components/SideBar";
import SuggestedBar from "../Components/MainFeed/SuggestedBar";
import Mainfeed from "../Components/MainFeed/Mainfeed";
import RightBar from "../Components/MainFeed/RightBar";

export default function Home() {
  return (
    <div className={styles.container}>
      <SideBar />
      <SuggestedBar />
      <Mainfeed />
      <RightBar />
    </div>
  );
}
