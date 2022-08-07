import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api, updateUserProfile } from "../../http";
import styles from "../../styles/EditProfile.module.css";

const EditProfile = ({ editProfileHandler, userStoreData }) => {
  const toast = useToast();
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const [userData, setuserData] = useState(userStoreData);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await api.get(`/api/users?userName=${userStoreData.userName}`);
      setuserData(userData);
    };
    fetchUser();
  }, []);

  const imageChangeProfile = async (e) => {
    try {
      let img = e.target.files[0];
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
      console.log(imageData, userStoreData);
      await updateUserProfile({ profilePicture: imageData.url, userId: userStoreData._id }, userStoreData._id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const imageChangeCover = async (e) => {
    try {
      let img = e.target.files[0];
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
      await updateUserProfile({ coverPicture: imageData.url, userId: userStoreData._id }, userStoreData._id);
      window.location.reload();
      toast({
        title: "Succesfull",
        description: "Logging In!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.editProfileContainer}>
          <div className={styles.Header}>
            <div className={styles.title}>Edit Profile</div>
            <div onClick={editProfileHandler} className={styles.closeBtn}>
              <div className={styles.iconContainer}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.profilePicture}>
            <div className={styles.editHeader}>
              <div className={styles.editTitle}>Profile picture</div>
              <div className={styles.input}>
                <input type="file" className={styles.imageUpload} id="mediauploadProfile" name="avatar" accept="image/png, image/jpeg" onChange={imageChangeProfile}></input>
                <label htmlFor="mediauploadProfile">
                  <span className={styles.editButton}>Edit</span>
                </label>
              </div>
            </div>
            <div className={styles.editContent}>
              <img className={styles.editProfileImg} src={`${userData.profilePicture}`} />
            </div>
          </div>
          <div className={styles.coverPicture}>
            <div className={styles.editHeader}>
              <div className={styles.editTitle}>Cover photo</div>
              <div className={styles.input}>
                <input type="file" className={styles.imageUpload} id="mediauploadCover" name="avatar" accept="image/png, image/jpeg" onChange={imageChangeCover}></input>
                <label htmlFor="mediauploadCover">
                  <span className={styles.editButton}>Edit</span>
                </label>
              </div>
            </div>
            <div className={styles.editContent}>
              <img className={styles.editCoverProfileImg} src={userData.coverPicture ? userData.coverPicture : "https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
