import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./Settings.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import view from "../../assets/view.png";
import hide from "../../assets/hide.png";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [viewOldPassIcon, setViewOldPassIcon] = useState(view);
  const [viewNewPassIcon, setViewNewPassIcon] = useState(view);
  const { userId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://project-management-backend-apzo.onrender.com/auth/settings/${userId}`,
        { oldPassword, newPassword, name },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("createrName", name);
      if (name || oldPassword || newPassword) {
        toast.success("Updated Successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      setOldPassword("");
      setNewPassword("");
      setName("");
    } catch (error) {
      console.error(error);

      if (error.response) {
        const { data } = error.response;
        toast.error(data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === "old") {
      setShowOldPassword(!showOldPassword);
      setViewOldPassIcon(showOldPassword ? view : hide);
    } else if (passwordType === "new") {
      setShowNewPassword(!showNewPassword);
      setViewNewPassIcon(showNewPassword ? view : hide);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Sidebar selectedButton={"settings"} />
        <div>
          <div className={styles.heading}>Settings</div>

          <form onSubmit={handleSubmit}>
            <div className={styles.settings}>
              <div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className={`${styles.inputbox} ${styles.name}`}
                />
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`${styles.inputbox} ${styles.password}`}
                  placeholder="Old Password"
                />
                <span onClick={() => togglePasswordVisibility("old")}>
                  <img
                    src={viewOldPassIcon}
                    alt="View"
                    style={{ position: "absolute", right: "1%", top: "10%" }}
                  />
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className={`${styles.inputbox} ${styles.password}`}
                />
                <span onClick={() => togglePasswordVisibility("new")}>
                  <img
                    src={viewNewPassIcon}
                    alt="View"
                    style={{ position: "absolute", right: "1%", top: "10%" }}
                  />
                </span>
              </div>

              <div className={styles.update}>
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Settings;
