import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles/SideBar.module.css";
import { setAuth } from "../store/authSlice";
import MessageBar from "./MessageBar";
import { api } from "../http";
import Notification from "./ProfileFeed/Notification";
import FriendRequests from "./FriendRequests";
import Search from "./Search";

const SideBar = ({}) => {
  const storeData = useSelector((state) => state.auth);
  const { user, isAuth } = storeData;

  const router = useRouter();
  const dispatch = useDispatch();

  const [userData, setuserData] = useState(user);
  const [select, setSelection] = useState("home");
  const [drawer, setDrawer] = useState(false);
  const [unReadNotifications, setunReadNotification] = useState(0);
  const [unReadFriendRequests, setUnreadFriendRequests] = useState(0);
  const [readNotifications, setReadNotifications] = useState(false);
  const [readFriendRequests, setReadFriendRequests] = useState(false);

  const readNotificationsHandler = () => {
    setReadNotifications(true);
  };

  const readFriendRequestsHandler = () => {
    setReadFriendRequests(true);
  };

  useEffect(() => {
    const fetchunReadNotifications = async () => {
      const userName = user.userName;
      const { data } = await api.post("/api/notification/unReadNotifications", { receiver: userName });
      setunReadNotification(data.length);
    };
    fetchunReadNotifications();
  }, []);

  useEffect(() => {
    const fetchunReadFriendRequests = async () => {
      const userName = user.userName;
      const { data } = await api.post("/api/notification/unReadFriendRequests", { receiver: userName });
      setUnreadFriendRequests(data.length);
    };
    fetchunReadFriendRequests();
  }, []);

  const logoutHandler = async (e) => {
    e.preventDefault();
    dispatch(setAuth({ isAuth: false, userData: null }));
    localStorage.setItem("UserData", null);
    await api.post(`/api/users/online`, { userId: userData._id, onlineStatus: false });
    router.push("/login");
  };

  const onOpen = (currSelectedOption) => {
    const prevSelectedOptn = select;
    setSelection(currSelectedOption);

    if (currSelectedOption === "home") {
      setDrawer(false);
      return;
    }

    //s/ if we are clicking the  selection which is already selected, set drawer off
    if (currSelectedOption === prevSelectedOptn) {
      setDrawer(!drawer);
      setSelection("home");
    }

    //s/ if we are clicking the  selection which is not selected, keep drawer on but changer content
    if (currSelectedOption !== prevSelectedOptn) {
      setDrawer(true);
      setSelection(currSelectedOption);
    }
    //s/ if we are on homepage, set home active, but dont open the drawer
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await api.get(`/api/users?userName=${user.userName}`);
      setuserData(userData);
    };
    fetchUser();
  }, []);

  return (
    <div className={styles.MainContainer}>
      <nav className={styles.sidebar_container}>
        <ul className={styles.sidebar_lists}>
          <button onClick={() => onOpen("profile")} className={`${styles.sidebar_list} `}>
            <img className={styles.profilePicture} src={userData?.profilePicture} />
          </button>

          <Link href="/">
            <button onClick={() => onOpen("home")} className={`${styles.sidebar_list} ${select === "home" ? styles.active : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z" />
              </svg>
            </button>
          </Link>

          {/*//M/ SEARCH */}
          <button className={`${styles.sidebar_list} ${select === "search" ? styles.active : ""}`} onClick={() => onOpen("search")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
            </svg>
          </button>

          <button className={`${styles.sidebar_list} ${styles.notificationContainer} ${select === "notification" ? styles.active : ""}`} onClick={() => onOpen("notification")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
            </svg>
            {unReadNotifications !== 0 && !readNotifications && <div className={styles.notificationNumber}>{unReadNotifications}</div>}
          </button>

          <button className={`${styles.sidebar_list}  ${select === "messenger" ? styles.active : ""}`} onClick={() => onOpen("messenger")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z" />
            </svg>
          </button>

          <button className={`${styles.sidebar_list} ${styles.notificationContainer}  ${select === "friends" ? styles.active : ""}`} onClick={() => onOpen("friends")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z" />
            </svg>
            {unReadFriendRequests !== 0 && !readFriendRequests && <div className={styles.notificationNumber}>{unReadFriendRequests}</div>}
          </button>
        </ul>
      </nav>
      {drawer && (
        <div className={styles.sideBarDrawer}>
          {select === "profile" && (
            <div className={styles.Container}>
              <div className={styles.header}>Your profile</div>
              <Link href={`${user?.userName}`}>
                <div className={styles.profileContainer}>
                  <img className={styles.profilePhoto} src={userData.profilePicture} />
                  <div className={styles.profileName}>{userData?.userName}</div>
                </div>
              </Link>
              <button onClick={logoutHandler}>
                <div className={styles.option}>
                  <div className={styles.iconContainer}>
                    <svg className={styles.settingIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                    </svg>
                  </div>
                  <span className={styles.settingText}>Logout</span>
                </div>
              </button>
            </div>
          )}
          {select === "search" && <Search />}
          {select === "notification" && <Notification handler={readNotificationsHandler} />}
          {select === "messenger" && <MessageBar />}
          {select === "friends" && <FriendRequests friendsHandler={readFriendRequestsHandler} />}
        </div>
      )}
    </div>
  );
};
export default SideBar;
