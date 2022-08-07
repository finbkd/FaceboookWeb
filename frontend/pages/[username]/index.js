import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { setAuth } from "../../store/authSlice";
import { api } from "../../http";
import ProfileFeed from "../../Components/ProfileFeed/ProfileFeed";
import SideBar from "../../Components/SideBar";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();
  const [isFriend, setIsFriend] = useState(false);
  const [isMyself, setIsMyself] = useState(false);

  const storeData = useSelector((state) => state.auth);
  let { user: userStoreData, isAuth } = storeData;
  const userStoreDataa = userStoreData;

  useEffect(() => {
    if (router.isReady) {
      const { username } = router.query;
      fetchUserData(username);
    }
  }, [router.isReady, router.query]);

  const fetchUserData = async (name) => {
    if (userStoreData?.userName !== name) {
      const { data: loggedInUserData } = await api.get(`/api/users?userName=${userStoreData?.userName}`);
      const { data } = await api.get(`/api/users?userName=${name}`);
      setUser(data);
      if (loggedInUserData.friends.includes(data._id)) {
        setIsFriend(true);
      }
      setIsMyself(false);
      setLoading(false);
      return;
    } else {
      setIsFriend(false);
      setIsMyself(true);
    }
    const { data: loggedInUserData } = await api.get(`/api/users?userName=${userStoreData?.userName}`);
    setUser(loggedInUserData);
    setLoading(false);
  };

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
      {isAuth && !loading && (
        <>
          <title>{`${router.query.username} | Facebook`}</title>
          <SideBar user={user} />
          <ProfileFeed user={user} isFriend={isFriend} isMyself={isMyself} />
        </>
      )}
    </>
  );
};
export default index;
