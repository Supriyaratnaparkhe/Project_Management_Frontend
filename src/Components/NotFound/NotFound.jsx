import React from "react";
import styles from "./NotFound.module.css";
import search from "../../assets/search.png";
const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={search} alt="search" />
      </div>
      <div className={styles.text}> Task Not Found</div>
    </div>
  );
};

export default NotFound;
