import { useEffect, useState } from "react";
import styles from "../../styles/Photos.module.css";

const Photos = ({ post }) => {
  const [photo, setPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPhoto(post);
    if (post) {
      setIsLoading(false);
    }
  }, [post]);

  return (
    <div className={styles.Container}>
      <div className={styles.title}>Photos</div>
      {!isLoading && <div className={styles.photos}>{photo.map((p) => (p.img ? <img src={`${p.img}`} /> : ""))}</div>}
    </div>
  );
};
export default Photos;
