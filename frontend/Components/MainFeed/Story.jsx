import styles from "../../styles/Story.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../http";

const Story = () => {
  const storeData = useSelector((state) => state.auth);
  const { user, isAuth } = storeData;
  const [userData, setuserData] = useState(user);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await api.get(`/api/users?userName=${user.userName}`);
      setuserData(userData);
    };
    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.storyAdd} ${styles.image}`}>
        <img src={userData?.profilePicture || ""} className={`${styles.storyImage}`} />
        <svg className={styles.bigcircle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z" />
        </svg>
        <svg className={styles.button} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
        </svg>
        <span>Create story</span>
      </div>
      <div className={`${styles.storyBox} ${styles.image}`}>
        <img src={"https://cdn.dribbble.com/userupload/2418042/file/original-a549886dce217c244487bc97c4255455.png?resize=400x0"} className={`${styles.storyImage}`} width={128} height={233} />
        <span className={styles.storyName}>{user?.userName}</span>
      </div>
      <div className={`${styles.storyBox} ${styles.image}`}>
        <img src={"https://cdn1.vectorstock.com/i/thumb-large/60/70/boy-and-girl-characters-playing-with-pets-flat-vector-34526070.jpg"} className={`${styles.storyImage}`} width={128} height={233} />
        <span className={styles.storyName}>{user?.userName}</span>
      </div>
      <div className={`${styles.storyBox} ${styles.image}`}>
        <img src={"https://i.pinimg.com/736x/f0/f7/48/f0f748da52780bf4a8b18551227bb25e.jpg"} className={`${styles.storyImage}`} width={128} height={233} />
        <span className={styles.storyName}>{user?.userName}</span>
      </div>
      <div className={`${styles.storyBox} ${styles.image}`}>
        <img
          src={"https://media.istockphoto.com/vectors/young-pretty-woman-enjoying-her-free-time-at-home-and-hobby-smiling-vector-id1239733859?b=1&k=20&m=1239733859&s=612x612&w=0&h=xxRQv9Gva091pf6NJ5JLDKMr9EuXj7rmMU9baUsA_z4="}
          className={`${styles.storyImage}`}
          width={128}
          height={233}
        />
        <span className={styles.storyName}>{user?.userName}</span>
      </div>
    </div>
  );
};
export default Story;
