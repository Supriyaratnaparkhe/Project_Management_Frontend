import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Register.module.css";
import group from "../../assets/group.png";
import view from "../../assets/view.png";
import hide from "../../assets/hide.png";
import email from "../../assets/email_icon.png";

const Register = () => {
  const navigate = useNavigate();
  const [UserState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [viewPassIcon, setViewPassIcon] = useState(view);
  const [viewCPassIcon, setViewCPassIcon] = useState(view);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState("Register");
  const validateValues = (UserState) => {
    const errors = {};
    if (!UserState.name) {
      errors.name = "*Name field is required";
    }
    if (!UserState.email) {
      errors.email = "*Email field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(UserState.email)) {
      errors.email = "Invalid email format";
    }

    if (!UserState.password) {
      errors.password = "*Password is required";
    } else if (UserState.password.length <= 5) {
      errors.password = "*Weak Password";
    }
    if (!UserState.confirmpassword) {
      errors.confirmpassword = "*Confirm password is required";
    } else if (UserState.password !== UserState.confirmpassword) {
      errors.confirmpassword = "*Password does not match";
    }
    setErrors(errors);

    if (Object.keys(errors).length !== 0) {
      setLoading("Register");
    }
    return Object.keys(errors).length === 0;
  };
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setLoading("Loading...");
      const isValid = validateValues(UserState);

      if (isValid) {
        const response = await axios.post(
          "https://project-management-backend-apzo.onrender.com/auth/register",
          {
            name: UserState.name,
            email: UserState.email,
            password: UserState.password,
            confirmpassword: UserState.confirmpassword,
          }
        );
        const userId = response.data.userId;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("createrName", response.data.createrName);

        toast.success("Register successful!", {
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
      setLoading("Register");
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
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const updateForm = (e) => {
    setUserState({
      ...UserState,
      [e.target.name]: e.target.value,
    });
  };
  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === "pass") {
      setShowPassword(!showPassword);
      setViewPassIcon(showPassword ? view : hide);
    } else if (passwordType === "cpass") {
      setShowCPassword(!showCPassword);
      setViewCPassIcon(showCPassword ? view : hide);
    }
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
        <div className={styles.headline}>Register</div>
        <div className={styles.form}>
          <form onSubmit={handleRegister} className={styles.centeredForm}>
            <div className={styles.input}>
              <input
                type="text"
                name="name"
                value={UserState.name}
                onChange={updateForm}
                id={styles.name}
                className={errors.name ? styles.inputErrorbox : styles.inputbox}
                placeholder={errors.name ? errors.name : "Name"}
              />
            </div>
            <div className={styles.input}>
              <div style={{ position: "relative" }}>
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
                <img
                  src={email}
                  alt="email"
                  style={{ position: "absolute", left: "1%", top: "10%" }}
                />
              </div>
            </div>
            <div className={styles.input}>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={UserState.password}
                  onChange={updateForm}
                  id={styles.pass}
                  className={
                    errors.password ? styles.inputErrorbox : styles.inputbox
                  }
                  placeholder={errors.password ? errors.password : "Password"}
                />
                <span onClick={() => togglePasswordVisibility("pass")}>
                  <img
                    src={viewPassIcon}
                    alt="View"
                    style={{ position: "absolute", right: "1%", top: "10%" }}
                  />
                </span>
              </div>
            </div>
            <div className={styles.input}>
              <div style={{ position: "relative" }}>
                <input
                  type={showCPassword ? "text" : "password"}
                  name="confirmpassword"
                  value={UserState.confirmpassword}
                  onChange={updateForm}
                  id={styles.cpass}
                  className={
                    errors.confirmpassword
                      ? styles.inputErrorbox
                      : styles.inputbox
                  }
                  placeholder={
                    errors.confirmpassword
                      ? errors.confirmpassword
                      : "Confirm Password"
                  }
                />
                <span onClick={() => togglePasswordVisibility("cpass")}>
                  <img
                    src={viewCPassIcon}
                    alt="View"
                    style={{ position: "absolute", right: "1%", top: "10%" }}
                  />
                </span>
              </div>
            </div>
            <div className={styles.signupbtn}>
              <button type="submit">
                <div>{loading}</div>
              </button>
            </div>
          </form>
        </div>
        <div className={styles.line}>Have an account ?</div>
        <div className={styles.button}>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
