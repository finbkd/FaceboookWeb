import { useEffect, useRef, useState } from "react";
import { api } from "../http";
import styles from "../styles/Post.module.css";
import { useDispatch, useSelector } from "react-redux";

const Posts = ({ data }) => {
  const dataa = data;
  const inputRef = useRef();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [comment, setComment] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [postData, setpostData] = useState(dataa);

  const [userDataa, setuserData] = useState(user);

  const storeData = useSelector((state) => state.auth);
  const { user: userData, isAuth } = storeData;

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await api.get(`/api/users?userId=${dataa?.userId}`);
      const { data: userData } = response;
      setUser(userData);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userDataa } = await api.get(`/api/users?userName=${userData.userName}`);
      setuserData(userDataa);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchLikedData = async () => {
      const response = await api.get(`/api/users?userId=${dataa?.userId}`);
      const postDataResponse = await api.get(`/api/posts/${dataa._id}`);
      let { data: postDataa } = postDataResponse;
      setpostData(postDataa);

      if (postData.likes.includes(userData._id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };
    fetchLikedData();
  }, [liked]);

  const CommentHandler = async () => {
    const response = await api.get(`/api/comments/${dataa?._id}`);
    const { data } = response;

    setComment(data);
    setShowComment(!showComment);
  };

  const likeHandler = async (receiverName) => {
    const response = await api.put(`/api/posts/${dataa?._id}/like`, { userId: userData._id });
    setLiked(!liked);
    const data = { sender: userData.userName, receiver: receiverName, type: "liked" };
    console.log(data);
    if (!liked) {
      const notificationResponse = await api.post(`/api/notification/sendRequest`, data);
    }
  };

  const commentSubmit = async (event, name) => {
    if (event.key === "Enter") {
      if (inputRef.current.value === "") return;
      const data = { userId: userData._id, postId: dataa?._id, comment: inputRef.current.value };
      const { data: commentResponseData } = await api.post(`/api/comments/`, data);
      console.log(commentResponseData);
      inputRef.current.value = "";
      const commentData = { sender: userData.userName, receiver: name, type: "commented" };
      const notificationResponse = await api.post(`/api/notification/sendRequest`, commentData);
      setComment([...comment, commentResponseData]);
    } else {
      return;
    }
  };

  return (
    <>
      {!loading && (
        <div className={styles.container}>
          <div className={styles.postContainer}>
            <div className={styles.postHeader}>
              <div>
                <img className={styles.photo} src={user?.profilePicture} />
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>{user?.userName}</div>
                <div className={styles.postDate}>5th june</div>
              </div>
            </div>
            <div className={styles.postContent}>
              <p className={styles.postDesc}>{data?.desc}</p>
              {data?.img && <img className={styles.postImg} src={data.img}></img>}
            </div>
            <div className={styles.postResponseTop}>
              <div className={styles.postLeftTop}>
                <div className={styles.thumbssup}>
                  <img className={styles.thumbsup} src="icons/thumbs-up.png" />
                </div>
                <img src="icons/heart.png" className={styles.heart} />
                <div className={styles.likeNames}>{liked ? `You ${postData?.likes.length === 1 ? "like this" : `and ${postData?.likes.length - 1} others`} ` : `${postData.likes.length}  ${postData.likes.length === 1 ? "like" : "likes"} this`}</div>
              </div>
              <div className={styles.postRighTop}>{data?.Comments?.length} comments</div>
            </div>
            <hr />
            <div className={styles.postResponseBottom}>
              <button className={liked ? `${styles.likedButton}` : `${styles.dislikedButton}`} onClick={() => likeHandler(user?.userName)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z" />
                </svg>
                <span>Like</span>
              </button>
              <button onClick={CommentHandler}>
                {" "}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.98c0 9.836 11.02 15.55 19.12 9.7l124.9-93.68h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM464 352c0 8.75-7.25 16-16 16h-160l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16V352z" />
                </svg>
                Comment
              </button>
              <button>
                {" "}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M503.7 226.2l-176 151.1c-15.38 13.3-39.69 2.545-39.69-18.16V272.1C132.9 274.3 66.06 312.8 111.4 457.8c5.031 16.09-14.41 28.56-28.06 18.62C39.59 444.6 0 383.8 0 322.3c0-152.2 127.4-184.4 288-186.3V56.02c0-20.67 24.28-31.46 39.69-18.16l176 151.1C514.8 199.4 514.8 216.6 503.7 226.2z" />
                </svg>
                Share
              </button>
            </div>
            {showComment && (
              <div className={styles.comment}>
                <div className={styles.postComment}>
                  <img className={styles.currentUserPhoto} src={userDataa?.profilePicture} />
                  <input
                    className={styles.currentUserInput}
                    onKeyDown={(e) => {
                      commentSubmit(e, user.userName);
                    }}
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Write a comment..."
                    ref={inputRef}
                  />
                </div>
                <div className={styles.previousComments}>
                  {comment.map((comment) => {
                    return (
                      <div className={styles.wholeCommentContainer}>
                        <img className={styles.commentPhoto} src={comment?.profilePicture} />
                        <div className={styles.commentContainer}>
                          <div className={styles.commentName}>{comment?.userName}</div>
                          <div className={styles.commentDescription}>{comment?.comment}</div>
                          <div className={styles.commentLike}>
                            <img className={styles.thumbsupp} src="icons/thumbs-up.png" />
                            <img src="icons/heart.png" className={styles.heartt} />
                            <span>{comment?.likes.length}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Posts;
