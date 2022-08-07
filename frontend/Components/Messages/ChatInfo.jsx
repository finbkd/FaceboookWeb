import styles from "../../styles/ChatInfo.module.css";

const ChatInfo = ({ otherUser }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.profile}>
        <div>
          <img className={styles.profilePicture} src={otherUser.profilePicture} />
        </div>
        <div className={styles.profileName}>{otherUser.userName}</div>
      </div>
    </div>
  );
};
export default ChatInfo;
