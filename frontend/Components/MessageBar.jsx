import { useEffect, useState } from "react";
import styles from "../styles/MessageBar.module.css";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { api } from "../http";

const MessageBar = () => {
  const storeData = useSelector((state) => state.auth);
  const { user: userData, isAuth } = storeData;
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      let otherUsersData = [];
      if (userData) {
        // console.log("loggedIn user", userData._id);
        const response = await api.get(`/api/chat/fetchOtherUser?userId=${userData._id}`);
        const { data: chatsData } = response;
        chatsData.forEach((chat) => {
          const filteredData = chat.users.filter((user) => user._id !== userData._id);
          filteredData.forEach((data) => (data.chatId = chat._id));
          // filter.push
          otherUsersData.push(...filteredData);
        });
      }

      setOtherUsers(otherUsersData);
    };
    fetchUsers();
  }, [userData]);

  return (
    <div className={styles.Container}>
      <div className={styles.messageContainer}>
        <div className={styles.top}>
          <div className={styles.header}>
            <div className={styles.title}>Chats</div>
            <div className={styles.options}>
              <div className={styles.option}>
                <div className={styles.iconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z" />
                  </svg>
                </div>
              </div>
              <div className={styles.option}>
                <div className={styles.iconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="a8c37x1j ms05siws l3qrxjdp b7h9ocf4 py1f6qlh gl3lb2sf hhz5lgdu">
                    <g fill-rule="evenodd" transform="translate(-448 -544)">
                      <path d="M457.25 552.5H455v2.25a.75.75 0 0 1-1.5 0v-2.25h-2.25a.75.75 0 0 1 0-1.5h2.25v-2.25a.75.75 0 0 1 1.5 0V551h2.25a.75.75 0 0 1 0 1.5m6.38-4.435a.62.62 0 0 0-.64.047l-2.49 1.634v-1.394a1.854 1.854 0 0 0-1.852-1.852l-8.796.002a1.854 1.854 0 0 0-1.851 1.852v6.793c0 1.021.83 1.852 1.852 1.852l1.147-.002h7.648a1.854 1.854 0 0 0 1.852-1.851v-1.392l2.457 1.61a.641.641 0 0 0 .673.071.663.663 0 0 0 .37-.601v-6.167c0-.26-.142-.49-.37-.602"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className={styles.option}>
                <div className={styles.iconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <input className={styles.searchInput} placeholder="Search Messenger..." />
        </div>
        <div className={styles.bottom}>
          <div className={styles.messages}>
            {otherUsers.map((otherUser) => {
              return (
                <Link href={`/messages/${otherUser.chatId}`}>
                  <div className={styles.message}>
                    <img src={otherUser.profilePicture} className={styles.profilePicture} />
                    <div className={styles.messageInfo}>
                      <div className={styles.name}>{otherUser.userName}</div>
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
export default MessageBar;
