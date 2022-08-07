import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../http";
import styles from "../../styles/ChatMessage.module.css";
import ChatInfo from "./ChatInfo";

const ChatMessage = ({ messages }) => {
  const [messagee, setMessagee] = useState(messages);
  const router = useRouter();
  const inputRef = useRef();

  const storeData = useSelector((state) => state.auth);
  const { user: userData, isAuth } = storeData;

  const [otherUser, setOtherUser] = useState([]);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      messages && setMessagee(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (router.isReady) {
      const { chatId } = router.query;
      const fetchChats = async () => {
        const { data: chatsData } = await api.get(`/api/chat/fetchChat?chatId=${chatId}`);
        chatsData.forEach((chat) => {
          const filteredData = chat.users.filter((user) => user._id !== userData._id);
          setOtherUser(...filteredData);
        });
      };
      fetchChats();
    }
  }, [router.isReady, router.query]);

  const sendMessageHandler = async () => {
    const { chatId } = router.query;
    const data = await api.post(`/api/chat/createmessage`, { sender: userData._id, content: inputRef.current.value, chatId });
    setMessagee([...messagee, data.data]);
    inputRef.current.value = "";
  };

  const videoMessageHandler = async () => {
    const { chatId } = router.query;
    `http://localhost:3000/voicecall/${otherUser._id}`;
    const data = await api.post(`/api/chat/createmessage`, { sender: userData._id, content: `Access the call by accessing this link ${`http://localhost:3000/videocall/${otherUser._id}`}`, chatId });
    window.location.reload();
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <div>
              <img src={otherUser.profilePicture} className={styles.profilePicture} />
            </div>
            <div className={styles.name}>{otherUser.userName}</div>
          </div>
          <div className={styles.options}>
            <a href={`http://localhost:3000/voicecall/${otherUser._id}`} target="_blank">
              <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
              </svg>
            </a>
            <a href={`http://localhost:3000/videocall/${otherUser._id}`} onClick={videoMessageHandler} target="_blank">
              <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z" />
              </svg>
            </a>
            <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
            </svg>
          </div>
        </div>
        <div className={styles.chatContainer}>
          {messagee?.map((message) => {
            return (
              <div className={message.sender._id === userData._id ? `${styles.rightSide}` : `${styles.leftSide}`}>
                {message.sender._id !== userData._id && (
                  <div className={styles.profilePicture}>
                    <img src={message.sender.profilePicture} className={styles.leftSidePicture} />
                  </div>
                )}
                <div className={message.sender._id === userData._id ? `${styles.rightSideText}` : `${styles.text}`}>{message.content}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.chatInput}>
          <div className={styles.options}>
            <svg className={styles.optionIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
            </svg>
            <svg className={styles.optionIcon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 17 16">
              <g fill-rule="evenodd">
                <circle fill="currentColor" cx="5.5" cy="5.5" r="1"></circle>
                <circle fill="currentColor" cx="11.5" cy="4.5" r="1"></circle>
                <path d="M5.3 9c-.2.1-.4.4-.3.7.4 1.1 1.2 1.9 2.3 2.3h.2c.2 0 .4-.1.5-.3.1-.3 0-.5-.3-.6-.8-.4-1.4-1-1.7-1.8-.1-.2-.4-.4-.7-.3z"></path>
                <path d="M10.4 13.1c0 .9-.4 1.6-.9 2.2 4.1-1.1 6.8-5.1 6.5-9.3-.4.6-1 1.1-1.8 1.5-2 1-3.7 3.6-3.8 5.6z"></path>
                <path
                  d="M2.5 13.4c.1.8.6 1.6 1.3 2 .5.4 1.2.6 1.8.6h.6l.4-.1c1.6-.4 2.6-1.5 2.7-2.9.1-2.4 2.1-5.4 4.5-6.6 1.3-.7 1.9-1.6 1.9-2.8l-.2-.9c-.1-.8-.6-1.6-1.3-2-.7-.5-1.5-.7-2.4-.5L3.6 1.5C1.9 1.8.7 3.4 1 5.2l1.5 8.2zm9-8.9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-3.57 6.662c.3.1.4.4.3.6-.1.3-.3.4-.5.4h-.2c-1-.4-1.9-1.3-2.3-2.3-.1-.3.1-.6.3-.7.3-.1.5 0 .6.3.4.8 1 1.4 1.8 1.7zM5.5 5.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"
                  fill-rule="nonzero"
                ></path>
              </g>
            </svg>
            <svg className={styles.optionIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M528 32H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48H528c26.51 0 48-21.49 48-48v-256C576 53.49 554.5 32 528 32zM223.1 96c17.68 0 32 14.33 32 32S241.7 160 223.1 160c-17.67 0-32-14.33-32-32S206.3 96 223.1 96zM494.1 311.6C491.3 316.8 485.9 320 480 320H192c-6.023 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.332-16.68l70-96C252.1 194.4 256.9 192 262 192c5.111 0 9.916 2.441 12.93 6.574l22.35 30.66l62.74-94.11C362.1 130.7 367.1 128 373.3 128c5.348 0 10.34 2.672 13.31 7.125l106.7 160C496.6 300 496.9 306.3 494.1 311.6zM456 432H120c-39.7 0-72-32.3-72-72v-240C48 106.8 37.25 96 24 96S0 106.8 0 120v240C0 426.2 53.83 480 120 480h336c13.25 0 24-10.75 24-24S469.3 432 456 432z" />
            </svg>
            <svg className={styles.optionIcon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16">
              <path
                d="M.783 12.705c.4.8 1.017 1.206 1.817 1.606 0 0 1.3.594 2.5.694 1 .1 1.9.1 2.9.1s1.9 0 2.9-.1 1.679-.294 2.479-.694c.8-.4 1.157-.906 1.557-1.706.018 0 .4-1.405.5-2.505.1-1.2.1-3 0-4.3-.1-1.1-.073-1.976-.473-2.676-.4-.8-.863-1.408-1.763-1.808-.6-.3-1.2-.3-2.4-.4-1.8-.1-3.8-.1-5.7 0-1 .1-1.7.1-2.5.5s-1.417 1.1-1.817 1.9c0 0-.4 1.484-.5 2.584-.1 1.2-.1 3 0 4.3.1 1 .2 1.705.5 2.505zm10.498-8.274h2.3c.4 0 .769.196.769.696 0 .5-.247.68-.747.68l-1.793.02.022 1.412 1.252-.02c.4 0 .835.204.835.704s-.442.696-.842.696H11.82l-.045 2.139c0 .4-.194.8-.694.8-.5 0-.7-.3-.7-.8l-.031-5.631c0-.4.43-.696.93-.696zm-3.285.771c0-.5.3-.8.8-.8s.8.3.8.8l-.037 5.579c0 .4-.3.8-.8.8s-.8-.4-.8-.8l.037-5.579zm-3.192-.825c.7 0 1.307.183 1.807.683.3.3.4.7.1 1-.2.4-.7.4-1 .1-.2-.1-.5-.3-.9-.3-1 0-2.011.84-2.011 2.14 0 1.3.795 2.227 1.695 2.227.4 0 .805.073 1.105-.127V8.6c0-.4.3-.8.8-.8s.8.3.8.8v1.8c0 .2.037.071-.063.271-.7.7-1.57.991-2.47.991C2.868 11.662 1.3 10.2 1.3 8s1.704-3.623 3.504-3.623z"
                fill-rule="nonzero"
              ></path>
            </svg>
          </div>
          <input className={styles.input} ref={inputRef}></input>
          <div className={styles.like} onClick={sendMessageHandler}>
            <svg className={styles.optionIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M501.6 4.186c-7.594-5.156-17.41-5.594-25.44-1.063L12.12 267.1C4.184 271.7-.5037 280.3 .0431 289.4c.5469 9.125 6.234 17.16 14.66 20.69l153.3 64.38v113.5c0 8.781 4.797 16.84 12.5 21.06C184.1 511 188 512 191.1 512c4.516 0 9.038-1.281 12.99-3.812l111.2-71.46l98.56 41.4c2.984 1.25 6.141 1.875 9.297 1.875c4.078 0 8.141-1.031 11.78-3.094c6.453-3.625 10.88-10.06 11.95-17.38l64-432C513.1 18.44 509.1 9.373 501.6 4.186zM369.3 119.2l-187.1 208.9L78.23 284.7L369.3 119.2zM215.1 444v-49.36l46.45 19.51L215.1 444zM404.8 421.9l-176.6-74.19l224.6-249.5L404.8 421.9z" />
            </svg>
          </div>
        </div>
      </div>
      <ChatInfo otherUser={otherUser} />
    </>
  );
};

export default ChatMessage;
