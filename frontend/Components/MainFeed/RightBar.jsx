import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/RightBar.module.css";

import { api } from "../../http";

const RightBar = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const storeData = useSelector((state) => state.auth);
  const { user: userData, isAuth } = storeData;

  useEffect(() => {
    const fetchFriends = async () => {
      // const userData = await api
      const response = await api.get(`/api/users/friends/${userData._id}`);
      const { data } = response;
      setFriends(data);
    };
    fetchFriends();
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && (
        <div className={styles.Container}>
          <div className={styles.Title}>Contacts</div>
          {friends.map((friend) => {
            return (
              <Link href={`/${friend.userName}`}>
                <div className={styles.friend}>
                  <img className={styles.photo} src={friend.profilePicture} />
                  <div className={styles.name}>{friend.userName}</div>
                  {friend.onlineStatus && <div className={styles.onlineStatus}></div>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};
export default RightBar;
