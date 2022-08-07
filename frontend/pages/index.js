import { useDispatch, useSelector } from "react-redux";
import { useRouter, useState } from "next/router";
import { useEffect, useRef } from "react";

import styles from "../styles/Home.module.css";

import SideBar from "../Components/SideBar";
import SuggestedBar from "../Components/MainFeed/SuggestedBar";
import Mainfeed from "../Components/MainFeed/Mainfeed";
import RightBar from "../Components/MainFeed/RightBar";
import { setAuth } from "../store/authSlice";
import { socketInit } from "../context/socket";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const socket = useRef();
  const initialRender1 = useRef(true);

  const storeData = useSelector((state) => state.auth);
  let { user: userStoreData, isAuth } = storeData;

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  useEffect(() => {
    if (initialRender1.current) {
      initialRender1.current = false;
    } else {
      console.log(userStoreData._id);
      // console.log(userStoreData._id);
      // socket.current.emit("user online", userStoreData._id);
    }
  }, []);

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
  }, []);

  return (
    <>
      {isAuth && (
        <div className={styles.container}>
          <title>Facebook</title>
          <SideBar user={userStoreData} />
          <SuggestedBar />
          <Mainfeed user={userStoreData} />
          <RightBar user={userStoreData} />
        </div>
      )}
    </>
  );
}
