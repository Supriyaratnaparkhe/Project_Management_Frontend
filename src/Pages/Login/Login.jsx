import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Login.module.css";
import group from "../../assets/group.png";
import view from "../../assets/view.png";
import hide from "../../assets/hide.png";

const Login = () => {
  const navigate = useNavigate();
  const [UserState, setUserState] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [viewIcon, setViewIcon] = useState(view);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState("Login");
  const validateValues = (UserState) => {
    const errors = {};
    if (!UserState.email) {
      errors.email = "*Email field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(UserState.email)) {
      errors.email = "Invalid email format";
    }

    if (!UserState.password) {
      errors.password = "*Password is required";
    }
    setErrors(errors);
    if (Object.keys(errors).length !== 0) {
      setLoading("Login");
    }
    return Object.keys(errors).length === 0;
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading("Loading...");
      const isValid = validateValues(UserState);

      if (isValid) {
        const response = await axios.post(
          "https://project-management-backend-apzo.onrender.com/auth/login",
          {
            email: UserState.email,
            password: UserState.password,
          }
        );
        const userId = response.data.userId;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("createrName", response.data.createrName);

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate(`/board/${userId}`);
        }, 700);
        return response.data;
      }
    } catch (error) {
      console.error(error);
      setLoading("Login");
      if (error.response) {
        const { data } = error.response;
        toast.error(data.message, {
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
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const updateForm = (e) => {
    setUserState({
      ...UserState,
      [e.target.name]: e.target.value,
    });
  };
  const togglePasswordVisibility = () => {
    setUserState({ ...UserState, showPassword: !UserState.showPassword });
    setViewIcon((prevState) => (prevState === view ? hide : view));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.images}>
          <img src={group} alt="group" />
        </div>
        <div className={styles.welcome}>Welcome aboard my friend</div>
        <div className={styles.line2}>just a couple of clicks and we start</div>
      </div>
      <div className={styles.right}>
        <div className={styles.headline}>Login</div>
        <div className={styles.form}>
          <form onSubmit={handleLogin} className={styles.centeredForm}>
            <div className={styles.input}>
              <input
                type="email"
                name="email"
                value={UserState.email}
                onChange={updateForm}
                id={styles.email}
                className={
                  errors.email ? styles.inputErrorbox : styles.inputbox
                }
                placeholder={errors.email ? errors.email : "Email"}
              />
            </div>
            <div className={styles.input}>
              <div style={{ position: "relative" }}>
                <input
                  type={UserState.showPassword ? "text" : "password"}
                  name="password"
                  value={UserState.password}
                  onChange={updateForm}
                  id={styles.pass}
                  className={
                    errors.password ? styles.inputErrorbox : styles.inputbox
                  }
                  placeholder={errors.password ? errors.password : "Password"}
                />
                <span onClick={togglePasswordVisibility}>
                  <img
                    src={viewIcon}
                    alt="View"
                    style={{ position: "absolute", right: "1%", top: "10%" }}
                  />
                </span>
              </div>
            </div>
            <div className={styles.loginbtn}>
              <button type="submit">
                <div>{loading}</div>
              </button>
            </div>
          </form>
        </div>
        <div className={styles.line}>Have no account yet?</div>
        <div className={styles.button}>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
