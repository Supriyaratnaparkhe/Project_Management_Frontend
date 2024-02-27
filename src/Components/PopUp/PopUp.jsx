import React, { useState, useEffect } from "react";
import styles from "./PopUp.module.css";
import EditTask from "../EditTask/EditTask";
import Delete from "../Delete/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PopUp = ({ taskId, onClose, onTaskUpdate }) => {
  const [showEditModel, setShowEditModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const editShow = (taskId) => {
    setShowEditModel(true);
    setSelectedTaskId(taskId);
  };
  const deleteShow = (taskId) => {
    setShowDeleteModel(true);
    setSelectedTaskId(taskId);
  };
  const handleClose = () => {
    setShowDeleteModel(false);
    setShowEditModel(false);
    onClose();
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".modal")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleShareClick = (taskId) => {
    const taskLink = `https://project-management-app-supriya.netlify.app/publicTask/${taskId}`;

    navigator.clipboard.writeText(taskLink).then(
      () => {
        toast.success("Link copied!", {
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          onClose();
        }, 700);
      },
      (err) => {
        console.error("Unable to copy link to clipboard", err);
        toast.error("Error copying link to clipboard");
      }
    );
  };
  return (
    <div className="modal">
      <div className={styles.container}>
        <div className={styles.text} onClick={() => editShow(taskId)}>
          Edit
        </div>
        <div
          className={styles.text}
          onClick={() => {
            handleShareClick(taskId);
          }}
        >
          Share
        </div>
        <div className={styles.delete} onClick={() => deleteShow(taskId)}>
          Delete
        </div>
        <ToastContainer />
      </div>
      {showEditModel ? (
        <EditTask
          taskId={selectedTaskId}
          handleClose={handleClose}
          onTaskUpdate={onTaskUpdate}
        />
      ) : (
        " "
      )}

      {showDeleteModel && (
        <Delete
          taskId={selectedTaskId}
          handleClose={handleClose}
          onTaskUpdate={onTaskUpdate}
        />
      )}
    </div>
  );
};

export default PopUp;
