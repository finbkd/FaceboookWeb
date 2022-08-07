import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api, createPost } from "../http";
import styles from "../scss-styles/Components/Share.module.scss";

const Share = () => {
  const inputRef = useRef();
  const [img, setImg] = useState();
  const [imgPrev, setImgPrev] = useState();

  const storeData = useSelector((state) => state.auth);
  const { user, isAuth } = storeData;
  const [userData, setuserData] = useState(user);
  const [sharePost, setSharePost] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await api.get(`/api/users?userName=${user.userName}`);
      setuserData(userData);
    };
    fetchUser();
  }, []);

  const imageChange = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    let img = e.target.files[0];
    let imgData = URL.createObjectURL(e.target.files[0]);
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "chatScape");
    data.append("cloud_name", "finbkd63");
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };

    const response = await axios.post("https://api.cloudinary.com/v1_1/finbkd63/image/upload", data);
    const { data: imageData } = response;
    setImg(imageData.url);
    setImgPrev(imgData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = inputRef.current.value;
    const post = await createPost({ userId: userData._id, desc: data, img });
    inputRef.current.value = "";
    window.location.reload();
  };

  const showInputHandler = async () => {
    setSharePost(!sharePost);
    setImgPrev("");
  };

  const removeImagePreview = async () => {
    setImgPrev("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sharebox}>
        <div className={styles.shareTop}>
          <img className={styles.shareProfile} src={userData?.profilePicture} />
          <input className={styles.inputText} type="text" id="fname" name="fname" placeholder={`What's on your mind, ${user?.userName}`} onClick={showInputHandler} />
        </div>
        <hr />
        <div className={styles.shareBottom}>
          <div className={styles.input}>
            <svg fill="#F3425F" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="a8c37x1j ms05siws l3qrxjdp b7h9ocf4 fxtw5amg rgmg9uty b73ngqbp">
              <g fillRule="evenodd" transform="translate(-444 -156)">
                <g>
                  <path
                    d="M113.029 2.514c-.363-.088-.746.014-1.048.234l-2.57 1.88a.999.999 0 0 0-.411.807v8.13a1 1 0 0 0 .41.808l2.602 1.901c.219.16.477.242.737.242.253 0 .508-.077.732-.235.34-.239.519-.65.519-1.065V3.735a1.25 1.25 0 0 0-.971-1.22m-20.15 6.563c.1-.146 2.475-3.578 5.87-3.578 3.396 0 5.771 3.432 5.87 3.578a.749.749 0 0 1 0 .844c-.099.146-2.474 3.578-5.87 3.578-3.395 0-5.77-3.432-5.87-3.578a.749.749 0 0 1 0-.844zM103.75 19a3.754 3.754 0 0 0 3.75-3.75V3.75A3.754 3.754 0 0 0 103.75 0h-10A3.754 3.754 0 0 0 90 3.75v11.5A3.754 3.754 0 0 0 93.75 19h10z"
                    transform="translate(354 158.5)"
                  ></path>
                  <path d="M98.75 12c1.379 0 2.5-1.121 2.5-2.5S100.129 7 98.75 7a2.503 2.503 0 0 0-2.5 2.5c0 1.379 1.121 2.5 2.5 2.5" transform="translate(354 158.5)"></path>
                </g>
              </g>
            </svg>
            <span>Live video</span>
          </div>
          <div className={styles.input}>
            <svg fill="#45BD62" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="a8c37x1j ms05siws l3qrxjdp b7h9ocf4 j58f7537 rgmg9uty b73ngqbp">
              <g fillRule="evenodd" transform="translate(-444 -156)">
                <g>
                  <path
                    d="m96.968 22.425-.648.057a2.692 2.692 0 0 1-1.978-.625 2.69 2.69 0 0 1-.96-1.84L92.01 4.32a2.702 2.702 0 0 1 .79-2.156c.47-.472 1.111-.731 1.774-.79l2.58-.225a.498.498 0 0 1 .507.675 4.189 4.189 0 0 0-.251 1.11L96.017 18.85a4.206 4.206 0 0 0 .977 3.091s.459.364-.026.485m8.524-16.327a1.75 1.75 0 1 1-3.485.305 1.75 1.75 0 0 1 3.485-.305m5.85 3.011a.797.797 0 0 0-1.129-.093l-3.733 3.195a.545.545 0 0 0-.062.765l.837.993a.75.75 0 1 1-1.147.966l-2.502-2.981a.797.797 0 0 0-1.096-.12L99 14.5l-.5 4.25c-.06.674.326 2.19 1 2.25l11.916 1.166c.325.026 1-.039 1.25-.25.252-.21.89-.842.917-1.166l.833-8.084-3.073-3.557z"
                    transform="translate(352 156.5)"
                  ></path>
                  <path
                    fillRule="nonzero"
                    d="m111.61 22.963-11.604-1.015a2.77 2.77 0 0 1-2.512-2.995L98.88 3.09A2.77 2.77 0 0 1 101.876.58l11.603 1.015a2.77 2.77 0 0 1 2.513 2.994l-1.388 15.862a2.77 2.77 0 0 1-2.994 2.513zm.13-1.494.082.004a1.27 1.27 0 0 0 1.287-1.154l1.388-15.862a1.27 1.27 0 0 0-1.148-1.37l-11.604-1.014a1.27 1.27 0 0 0-1.37 1.15l-1.387 15.86a1.27 1.27 0 0 0 1.149 1.37l11.603 1.016z"
                    transform="translate(352 156.5)"
                  ></path>
                </g>
              </g>
            </svg>
            <span>Photo/Video</span>
          </div>
          <div className={styles.input}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#F7B928" viewBox="0 0 24 24" class="a8c37x1j ms05siws l3qrxjdp b7h9ocf4 mu8pnim0 rgmg9uty b73ngqbp">
              <g fillRule="evenodd" transform="translate(-444 -156)">
                <g>
                  <path d="M107.285 13c.49 0 .841.476.712.957-.623 2.324-2.837 4.043-5.473 4.043-2.636 0-4.85-1.719-5.473-4.043-.13-.48.222-.957.712-.957h9.522z" transform="translate(353.5 156.5)"></path>
                  <path fillRule="nonzero" d="M114.024 11.5c0 6.351-5.149 11.5-11.5 11.5s-11.5-5.149-11.5-11.5S96.173 0 102.524 0s11.5 5.149 11.5 11.5zm-2 0a9.5 9.5 0 1 0-19 0 9.5 9.5 0 0 0 19 0z" transform="translate(353.5 156.5)"></path>
                  <path
                    d="M99.524 8.5c0 .829-.56 1.5-1.25 1.5s-1.25-.671-1.25-1.5.56-1.5 1.25-1.5 1.25.671 1.25 1.5m8.5 0c0 .829-.56 1.5-1.25 1.5s-1.25-.671-1.25-1.5.56-1.5 1.25-1.5 1.25.671 1.25 1.5m-.739 4.5h-9.522c-.49 0-.841.476-.712.957.623 2.324 2.837 4.043 5.473 4.043 2.636 0 4.85-1.719 5.473-4.043.13-.48-.222-.957-.712-.957m-2.165 2c-.667.624-1.592 1-2.596 1a3.799 3.799 0 0 1-2.596-1h5.192"
                    transform="translate(353.5 156.5)"
                  ></path>
                </g>
              </g>
            </svg>
            <span className={styles.submit}>Feeling/Activity</span>
          </div>
        </div>
      </div>
      {sharePost && (
        <div className={styles.createPostContainer}>
          <div className={styles.postContainer}>
            <div className={styles.createPostHeader}>
              <div className={styles.createPostTitle}>Create post</div>
              <div onClick={showInputHandler} className={styles.iconContainer}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              </div>
            </div>
            <div className={styles.createPostContent}>
              <div className={styles.profileContainer}>
                <img className={styles.profilePhoto} src={userData.profilePicture} />
                <div className={styles.profileName}>{userData?.userName}</div>
              </div>
              <div className={styles.postInput}>
                <input className={styles.postinputText} type="text" id="fname" name="fname" placeholder={`What's on your mind, ${user?.userName}`} ref={inputRef} />
                <input type="file" className={styles.imageUpload} id="mediaupload" name="avatar" accept="image/png, image/jpeg" onChange={imageChange}></input>
                <label htmlFor="mediaupload" className={styles.inputUpload}>
                  <div className={styles.addImageContainer}>
                    <div className={styles.addImageInput}>
                      <div className={styles.addImageContent}>
                        {imgPrev && (
                          <>
                            <img className={styles.imagePreviewContainer} src={imgPrev} />
                            <div onClick={removeImagePreview} className={styles.iconContainerrr}>
                              <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                              </svg>
                            </div>
                          </>
                        )}
                        {!imgPrev && (
                          <>
                            {" "}
                            <div className={styles.iconContainerr}>
                              <svg className={styles.iconnn} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="a8c37x1j ms05siws l3qrxjdp b7h9ocf4 j58f7537 rgmg9uty b73ngqbp">
                                <g fill-rule="evenodd" transform="translate(-444 -156)">
                                  <g>
                                    <path
                                      d="m96.968 22.425-.648.057a2.692 2.692 0 0 1-1.978-.625 2.69 2.69 0 0 1-.96-1.84L92.01 4.32a2.702 2.702 0 0 1 .79-2.156c.47-.472 1.111-.731 1.774-.79l2.58-.225a.498.498 0 0 1 .507.675 4.189 4.189 0 0 0-.251 1.11L96.017 18.85a4.206 4.206 0 0 0 .977 3.091s.459.364-.026.485m8.524-16.327a1.75 1.75 0 1 1-3.485.305 1.75 1.75 0 0 1 3.485-.305m5.85 3.011a.797.797 0 0 0-1.129-.093l-3.733 3.195a.545.545 0 0 0-.062.765l.837.993a.75.75 0 1 1-1.147.966l-2.502-2.981a.797.797 0 0 0-1.096-.12L99 14.5l-.5 4.25c-.06.674.326 2.19 1 2.25l11.916 1.166c.325.026 1-.039 1.25-.25.252-.21.89-.842.917-1.166l.833-8.084-3.073-3.557z"
                                      transform="translate(352 156.5)"
                                    ></path>
                                    <path
                                      fill-rule="nonzero"
                                      d="m111.61 22.963-11.604-1.015a2.77 2.77 0 0 1-2.512-2.995L98.88 3.09A2.77 2.77 0 0 1 101.876.58l11.603 1.015a2.77 2.77 0 0 1 2.513 2.994l-1.388 15.862a2.77 2.77 0 0 1-2.994 2.513zm.13-1.494.082.004a1.27 1.27 0 0 0 1.287-1.154l1.388-15.862a1.27 1.27 0 0 0-1.148-1.37l-11.604-1.014a1.27 1.27 0 0 0-1.37 1.15l-1.387 15.86a1.27 1.27 0 0 0 1.149 1.37l11.603 1.016z"
                                      transform="translate(352 156.5)"
                                    ></path>
                                  </g>
                                </g>
                              </svg>
                            </div>
                            <div className={styles.textContent}>Add photos/videos</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </label>
                <div onClick={submitHandler} className={styles.postSubmit}>
                  Post
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Share;
