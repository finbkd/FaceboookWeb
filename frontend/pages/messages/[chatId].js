import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Messages.module.css";

import MessageBar from "../../Components/MessageBar";

import SideBar from "../../Components/SideBar";
import { setAuth } from "../../store/authSlice";
import ChatMessage from "../../Components/Messages/ChatMessage";
import { api } from "../../http";

const Messages = () => {
  const [loading, setLoading] = useState(true);
  const [dataloading, setDataLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const storeData = useSelector((state) => state.auth);
  let { user: userStoreData, isAuth } = storeData;

  useEffect(() => {
    if (router.isReady) {
      const { chatId } = router.query;
      const fetchChats = async () => {
        const { data: messagesData } = await api.get(`/api/chat/fetchMessages?chatId=${chatId}`);
        setMessages(messagesData);
      };
      fetchChats();
      setDataLoading(false);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const userFetch = async () => {
      const data = localStorage.getItem("UserData");
      const userData = JSON.parse(data);
      dispatch(setAuth({ userData }));
      if (userData) {
        isAuth = true;
      }
      if (data) {
        isAuth: true;
      }
      if (!isAuth) {
        router.push("/login");
      }
    };

    userFetch();
    setLoading(false);
  }, []);

  return (
    <>
      {!dataloading && (
        <div className={styles.Container}>
          <title>{`Messenger | Facebook`}</title>
          <SideBar />
          <div className={styles.MessageBar}>
            <MessageBar />
          </div>
          <ChatMessage messages={messages} />
        </div>
      )}
    </>
  );
};
export default Messages;
