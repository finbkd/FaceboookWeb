import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../http";
import styles from "../../styles/Notification.module.css";
// import moment from "moment";
import moment from "moment-timezone";
import Link from "next/link";

const Notification = ({ handler }) => {
  const [notification, setNotification] = useState([]);

  // Asia/Kolkata
  // moment.tz(moment.tz.guess()).zoneAbbr();
  useEffect(() => {
    handler();
  }, []);

  const storeData = useSelector((state) => state.auth);
  const { user, isAuth } = storeData;
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await api.post("/api/notification/readNotifications", { receiver: user.userName });
      const { data } = await api.post(`/api/notification/receiveRequest`, { receiver: user.userName });

      setNotification(data);
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.notificationContainer}>
          <div className={styles.header}>Notifications</div>
          <div className={styles.notifications}>
            {notification.slice(0, 10).map((n) => {
              return (
                <Link href={`/${n.sender}`}>
                  <div className={styles.notification}>
                    <img src={n.senderProfilePic} className={styles.profilePicture} />
                    <div className={styles.notificationContent}>
                      <div className={styles.content}>{n.content}</div>
                      <div className={styles.notificationDate}>{moment(`${n.createdAt}`).fromNow()}</div>
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
export default Notification;
