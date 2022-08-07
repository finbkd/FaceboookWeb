import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../../http";
import styles from "../../styles/ProfileFeed.module.css";
import Posts from "../Posts";
import Share from "../Share";
import Friends from "./Friends";
import Intro from "./Intro";
import Photos from "./Photos";
import EditProfile from "./EditProfile";
import { useRouter } from "next/router";

const ProfileFeed = ({ user, isFriend, isMyself }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [friendRequestSent, setIsFriendRequestSent] = useState(false);
  const [friendRequestReceived, setIsFriendRequestReceived] = useState(false);
  const [isFriendd, setIsFriendd] = useState(isFriend);
  const [isEditingProfile, setEditingProfile] = useState(false);
  const [friendsOption, setFriendsOption] = useState(false);

  useEffect(() => {
    setIsFriendd(isFriend);
  }, [isFriend]);

  const storeData = useSelector((state) => state.auth);
  let { user: userStoreData, isAuth } = storeData;

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      // const userData = await api
      const response = await api.get(`/api/users/friends/${user._id}`);
      const { data } = response;
      setFriends(data);
    };
    fetchFriends();
    setLoading(false);
  }, [user]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await api.get(`/api/posts/profile/${user._id}`);
      const { data } = response;
      setPost(data);
      setLoading(false);
    };
    fetchAllPosts();
    isRequestSentHandler();
    isRequestReceivedHandler();
  }, [user]);

  const isRequestSentHandler = async () => {
    const requestFrom = userStoreData._id;
    const requestTo = user._id;

    const response = await api.post("/api/frndreq/isrequestsent", { requestFrom, requestTo });
    const { data } = response;
    if (data) {
      setIsFriendRequestSent(true);
    }
  };

  const isRequestReceivedHandler = async () => {
    const requestFrom = user._id;
    const requestTo = userStoreData._id;

    const response = await api.post("/api/frndreq/isrequestreceived", { requestFrom, requestTo });
    const { data } = response;
    if (data) {
      setIsFriendRequestReceived(true);
    }
  };

  const requestHandler = async (e) => {
    e.preventDefault();
    const requestFrom = userStoreData._id;
    const requestTo = user._id;

    const { data: sender } = await api.get(`/api/users?userId=${requestFrom}`);
    const { data: receiver } = await api.get(`/api/users?userId=${requestTo}`);

    const response = await api.post("/api/frndreq/send", { requestFrom, requestTo });
    setIsFriendRequestSent(true);
    const data = { sender: sender.userName, receiver: receiver.userName, type: "Received friend Request" };
    const notificationResponse = await api.post(`/api/notification/sendRequest`, data);
  };

  const respondHandler = async (res) => {
    const requestFrom = user._id;
    const requestTo = userStoreData._id;

    const response = await api.post(`/api/frndreq/respond/${res}`, { requestFrom, requestTo });
    const { data: sender } = await api.get(`/api/users?userId=${requestFrom}`);
    const { data: receiver } = await api.get(`/api/users?userId=${requestTo}`);
    if (res === "accept") {
      setIsFriendd(true);
      // const response = await api.post("/api/frndreq/send", { requestFrom, requestTo });
      const data = { sender: receiver.userName, receiver: sender.userName, type: "Accepted friend Request" };
      const notificationResponse = await api.post(`/api/notification/sendRequest`, data);
    } else if (res === "reject") {
      const data = { sender: receiver.userName, receiver: sender.userName, type: "Rejected friend Request" };
      const notificationResponse = await api.post(`/api/notification/sendRequest`, data);
    }
    location.reload();
  };

  const cancelRequest = async (e) => {
    e.preventDefault();
    const requestFrom = userStoreData._id;
    const requestTo = user._id;

    const response = await api.post("/api/frndreq/cancelrequest", { requestFrom, requestTo });
    setIsFriendRequestSent(false);
  };

  const editProfileHandler = async () => {
    setEditingProfile(!isEditingProfile);
  };

  const friendsOptionHandler = () => {
    setFriendsOption(!friendsOption);
  };

  const unfriendHandler = async (e) => {
    setFriendsOption(!friendsOption);
    e.preventDefault();
    const requestFrom = userStoreData._id;
    const requestTo = user._id;

    const { data: sender } = await api.get(`/api/users?userId=${requestFrom}`);
    const { data: receiver } = await api.get(`/api/users?userId=${requestTo}`);
    const response = await api.post("/api/frndreq/unfriend", { requestFrom, requestTo });
    window.location.reload();
  };

  const messageHandler = async () => {
    const users = [user._id, userStoreData._id];
    const { data } = await api.post(`/api/chat/createChat`, { users });
    if (data.content === "Chat already exists") {
      router.push(`/messages/${data._id}`);
      return;
    }
    const message = await api.post(`/api/chat/createmessage`, { sender: userStoreData, content: "Hey!", chatId: data._id });
    router.push(`/messages/${data._id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <img className={styles.Cover} src={user.coverPicture ? user.coverPicture : "https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"}></img>
        <div className={styles.userInfo}>
          <div className={styles.userInfoTop}>
            <img className={styles.profileImg} src={user.profilePicture} />
            <div className={styles.profileLeft}>
              <div className={styles.name}>{user.userName}</div>
              <div className={styles.friendsCount}>
                {user.friends.length} {user.friends.length === 1 ? "Friend" : "Friends"}
              </div>
              <div className={styles.friendsIcon}>
                {friends.map((friend) => (
                  <img className={styles.firsticon} src={friend.profilePicture} />
                ))}
              </div>
            </div>
            <div className={styles.profileRight}>
              {isMyself && (
                <button className={styles.story}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
                  </svg>
                  Add to Story
                </button>
              )}

              {isFriendd && (
                <button onClick={friendsOptionHandler} className={styles.story}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
                  </svg>
                  Friends
                  {friendsOption && (
                    <div className={styles.friendsOption}>
                      <div onClick={unfriendHandler} className={styles.editFriends}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                          <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                        </svg>
                        <div className={styles.text}>UnFriend</div>
                      </div>
                    </div>
                  )}
                </button>
              )}

              {!isFriendd && !isMyself && !friendRequestSent && !friendRequestReceived && (
                <button onClick={requestHandler} className={styles.story}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" />
                  </svg>
                  Add a friend
                </button>
              )}

              {!isFriendd && !isMyself && friendRequestSent && (
                <button onClick={cancelRequest} className={`${styles.story} ${styles.cancelReq}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" />
                  </svg>
                  Cancel Request
                </button>
              )}

              {!isFriendd && !isMyself && friendRequestReceived && (
                <>
                  <button onClick={() => respondHandler("accept")} className={`${styles.story} ${styles.cancelReq}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                      <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" />
                    </svg>
                    Accept
                  </button>
                  <button onClick={() => respondHandler("reject")} className={`${styles.story} ${styles.cancelReq}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                      <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" />
                    </svg>
                    reject
                  </button>
                </>
              )}

              {isMyself && (
                <button onClick={editProfileHandler} className={styles.edit}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z" />
                  </svg>{" "}
                  <span>Edit Profile</span>
                </button>
              )}

              {!isMyself && (
                <button onClick={messageHandler} className={styles.edit}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z" />
                  </svg>
                  <span>Message</span>
                </button>
              )}
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
          <Photos post={post} />
          <Friends user={user} />
        </div>
        <div className={styles.right}>
          {isMyself && <Share user={user} />}
          {!loading && post.map((p) => <Posts data={p} />)}
        </div>
      </div>
      {isEditingProfile && <EditProfile editProfileHandler={editProfileHandler} userStoreData={userStoreData} />}
    </div>
  );
};
export default ProfileFeed;
