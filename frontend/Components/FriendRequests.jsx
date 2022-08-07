import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Notification.module.css";
import moment from "moment";
import { api } from "../http";
import Link from "next/link";

const FriendRequests = ({ friendsHandler }) => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    friendsHandler();
  }, []);

  const storeData = useSelector((state) => state.auth);
  const { user, isAuth } = storeData;
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await api.post(`/api/notification/receivefrndRequest`, { receiver: user.userName });
      const response = await api.post("/api/notification/readfriendrequests", { receiver: user.userName });
      setNotification(data);
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.notificationContainer}>
          <div className={styles.header}>Friend Requests</div>
          <div className={styles.notifications}>
            {notification.slice(0, 10).map((n) => {
              return (
                <Link href={`/${n.sender}`}>
                  <div className={styles.notification}>
                    <img src={n.senderProfilePic} className={styles.profilePicture} />
                    <div className={styles.notificationContent}>
                      <div className={styles.content}>{n.content}</div>
                      <div className={styles.notificationDate}>{moment(moment(n.createdAt).format("YYYY-MM-DD"), "YYYYMMDD").fromNow()}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FriendRequests;
