import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import headlogo from "../../assets/headlogo.png";
import database from "../../assets/database.png";
import settings from "../../assets/settings.png";
import layout from "../../assets/layout.png";
import logout from "../../assets/Logout.png";
import Logout from "../Logout/Logout";

const Sidebar = (props) => {
  const [selectedButton, setSelectedButton] = useState(props.selectedButton);
  const [logoutDiv, setLogoutDiv] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleAnalytics = (e) => {
    e.preventDefault();
    setSelectedButton("analytics");
    navigate(`/analytics/${userId}`);
  };

  const handleBoard = (e) => {
    e.preventDefault();
    setSelectedButton("board");
    navigate(`/board/${userId}`);
  };
  const handleSetting = (e) => {
    e.preventDefault();
    setSelectedButton("settings");
    navigate(`/settings/${userId}`);
  };
  return (
    <div>
      <div className={styles.sidebar}>
        <div className={styles.head}>
          <div className={styles.logo}>
            <img src={headlogo} alt="logo" />
          </div>
          <div id={styles.headline}>Pro Manager</div>
        </div>
        <div className={styles.but}>
          <div
            className={`${styles.buttonItem}
              ${selectedButton === "board" ? styles.selectedButtonColor : ""}`}
            onClick={handleBoard}
          >
            <div className={styles.logo}>
              <img src={layout} alt="logo" />
            </div>
            <div className={styles.name}>Board</div>
          </div>
          <div
            className={`${styles.buttonItem}
            ${
              selectedButton === "analytics" ? styles.selectedButtonColor : ""
            }`}
            onClick={handleAnalytics}
          >
            <div className={styles.logo}>
              <img src={database} alt="logo" />
            </div>
            <div className={styles.name}>Analytics</div>
          </div>
          <div
            className={`${styles.buttonItem}
            ${selectedButton === "settings" ? styles.selectedButtonColor : ""}`}
            onClick={handleSetting}
          >
            <div className={styles.logo}>
              <img src={settings} alt="logo" />
            </div>
            <div className={styles.name}>Settings</div>
          </div>
        </div>
        <div className={styles.logout} onClick={() => setLogoutDiv(true)}>
          <div className={styles.logo}>
            <img src={logout} alt="logo" />
          </div>
          <div>LogOut</div>
        </div>
      </div>
      {logoutDiv && <Logout onClose={() => setLogoutDiv(false)} />}
    </div>
  );
};

export default Sidebar;
