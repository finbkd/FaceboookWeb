import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

import styles from "../../styles/FindFriends.module.css";

import SideBar from "../../Components/SideBar";
import SuggestedBar from "../../Components/MainFeed/SuggestedBar";
import Mainfeed from "../../Components/MainFeed/Mainfeed";
import RightBar from "../../Components/MainFeed/RightBar";
import { setAuth } from "../../store/authSlice";
import { api } from "../../http";
import Link from "next/link";

const findFriends = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const storeData = useSelector((state) => state.auth);
  let { user: userStoreData, isAuth } = storeData;

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (!userStoreData) return;
      const { data: usersData } = await api.post("/api/users/allUsers", { userId: userStoreData?._id });
      setUsers(usersData);
      setLoading(false);
    };
    fetchAllUsers();
  }, [userStoreData]);

  useEffect(() => {
    const userFetch = async () => {
      const data = localStorage.getItem("UserData");
      const userData = JSON.parse(data);
      dispatch(setAuth({ userData }));
      if (userData) {
        isAuth = true;
      }
      // const { data } = await axios.get(`http://localhost:5000/api/auth/refresh`, {
      //   withCredentials: true,
      // });
      // console.log(data);
      // dispatch(setAuth(data));
      if (data) {
        isAuth: true;
      }
      if (!isAuth) {
        router.push("/login");
      }
    };

    userFetch();
  }, []);

  return (
    <>
      {!loading && (
        <div className={styles.mainContainer}>
          <SideBar user={userStoreData} />
          <div className={styles.Container}>
            <div className={styles.title}>All Users</div>
            <div className={styles.friends}>
              {users.map((user) => {
                return (
                  <Link href={`/${user.userName}`}>
                    <div className={styles.friend}>
                      <img src={user.profilePicture} />
                      <span>{user.userName}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default findFriends;
