import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";
const Logout = ({ onClose }) => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoutdiv}>
        <div id={styles.head}>Are you sure you want to Logout?</div>
        <div id={styles.logbut}>
          <button onClick={handleLogout}>Yes, Logout</button>
        </div>
        <div id={styles.cancelbut}>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
