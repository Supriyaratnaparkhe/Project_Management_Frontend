import React from "react";
import styles from "./Delete.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Delete = ({ taskId, handleClose, onTaskUpdate }) => {
  const { userId } = useParams();
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://project-management-backend-apzo.onrender.com/task/deleteTask/${userId}/${taskId}`,

        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success("Task deleted successful!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        onTaskUpdate();
        handleClose();
      }, 700);
    } catch (error) {
      toast.error("Error deleting task.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.deletediv}>
        <div id={styles.head}>Are you sure you want to Delete?</div>
        <div id={styles.deletebut}>
          <button onClick={handleDelete}>Yes, Delete</button>
        </div>
        <div id={styles.cancelbut}>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Delete;
