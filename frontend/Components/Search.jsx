import Link from "next/link";
import { useRef, useState } from "react";
import { api } from "../http";
import styles from "../styles/Search.module.css";

const Search = () => {
  const [results, setResults] = useState([]);
  const inputRef = useRef();

  const searchhandler = async () => {
    const input = inputRef.current.value;
    const { data } = await api.post(`/api/users/searchUser`, { userName: input });
    setResults(data);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <div className={styles.header}>Search</div>
          <div className={styles.input}>
            <input className={styles.searchInput} placeholder="Search People..." onChange={searchhandler} ref={inputRef} />
          </div>
          {results.map((r) => {
            return (
              <Link href={`/${r.userName}`}>
                <div className={styles.profileContainer}>
                  <img className={styles.profilePhoto} src={r.profilePicture} />
                  <div className={styles.profileName}>{r?.userName}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Search;
