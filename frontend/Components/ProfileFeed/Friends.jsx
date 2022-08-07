import axios from "axios";
import { api } from "../../http";
import { useEffect, useState } from "react";
import styles from "../../styles/Friends.module.css";
import Link from "next/link";

const Friends = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      {!loading && (
        <div className={styles.Container}>
          <div className={styles.title}>Friends</div>
          <div className={styles.friendsCount}>
            {user.friends.length} {user.friends.length === 1 ? "Friend" : "Friends"}
          </div>
          <div className={styles.friends}>
            {friends.map((friend) => {
              return (
                <Link href={`/${friend.userName}`}>
                  <div className={styles.friend}>
                    <img src={friend.profilePicture} />
                    <span>{friend.userName}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Friends;
