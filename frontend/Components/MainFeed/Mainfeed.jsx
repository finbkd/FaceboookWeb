import axios from "axios";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../http";
import styles from "../../styles/MainFeed.module.css";
import Posts from "../Posts";
import Share from "../Share";
import Story from "./Story";
import { api } from "../../http";

const Mainfeed = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await api.get(`/api/posts/timeline/${user._id}`);
      const { data } = response;
      const length = data.length;
      setPost(data);
      setLoading(false);
    };
    fetchAllPosts();
  }, []);

  return (
    <div className={styles.Container}>
      <Story user={user} />
      <Share user={user} />
      {!loading && post.map((p) => <Posts data={p} />)}
    </div>
  );
};
export default Mainfeed;
