import React, { useState, useEffect } from "react";
import styles from "./EditTask.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Delete from "../../assets/Delete.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTask = ({ taskId, handleClose, onTaskUpdate }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [checklists, setChecklists] = useState([]);
  const [errors, setErrors] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(
          `https://project-management-backend-apzo.onrender.com/task/${taskId}`
        );
        setTitle(response.data.title);
        setPriority(response.data.priority);
        setDueDate(response.data.dueDate);
        setChecklists(response.data.checklists);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleAddChecklist = () => {
    setChecklists([...checklists, { title: "", isMarked: false }]);
  };
  const handleChecklistChange = (index, value) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[index].title = value;
    setChecklists(updatedChecklists);
  };
  const handleCheckBoxChange = (index) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[index].isMarked = !updatedChecklists[index].isMarked;
    setChecklists(updatedChecklists);
  };
  const handleDeleteChecklist = (index) => {
    const updatedChecklists = [...checklists];
    updatedChecklists.splice(index, 1);
    setChecklists(updatedChecklists);
  };

  const validate = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = "*Title is required";
    }

    if (!priority.trim()) {
      errors.priority = "*Priority is required";
      toast.error(errors.priority, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    const checklistErrors = checklists.map((item, index) => {
      if (!item.title.trim()) {
        return `*Checklist ${index + 1} title is required`;
      }
      return null;
    });

    if (checklistErrors.some((error) => error !== null)) {
      errors.checklists = checklistErrors.filter((error) => error !== null);
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isValid = validate();
      if (isValid) {
        const response = await axios.put(
          `http://localhost:3001/task/editTask/${userId}/${taskId}`,
          {
            title,
            checklists,
            priority,
            dueDate,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success("Task Updated successful!", {
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
        console.log(response.data);
      }
    } catch (error) {
      toast.error("Error updating task. Please try again later.", {
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
      <form onSubmit={handleSubmit}>
        <div className={styles.editModel}>
          <div className={styles.title}>
            <div className={styles.labels}>
              Title <span style={{ color: "#FF0000" }}>*</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={errors.title ? errors.title : "Enter Task Title"}
              className={errors.title ? styles.inputError : styles.place}
            />
          </div>
          <div className={styles.priorityDiv}>
            <div className={styles.labels}>
              Select Priority <span style={{ color: "#FF0000" }}>*</span>
            </div>
            <div>
              <button
                type="button"
                className={
                  priority === "high"
                    ? styles.selectedPriority
                    : styles.priorityButton
                }
                onClick={() => setPriority("high")}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "100%",
                      backgroundColor: "#FF2473",
                    }}
                  ></div>
                  <div>HIGH PRIORITY</div>
                </div>
              </button>
              <button
                type="button"
                className={
                  priority === "moderate"
                    ? styles.selectedPriority
                    : styles.priorityButton
                }
                onClick={() => setPriority("moderate")}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "100%",
                      backgroundColor: "#18B0FF",
                    }}
                  ></div>
                  <div>MODERATE PRIORITY</div>
                </div>
              </button>
              <button
                type="button"
                className={
                  priority === "low"
                    ? styles.selectedPriority
                    : styles.priorityButton
                }
                onClick={() => setPriority("low")}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "100%",
                      backgroundColor: "#63C05B",
                    }}
                  ></div>
                  <div>LOW PRIORITY</div>
                </div>
              </button>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <div className={styles.labels}>
              Checklist ({checklists.filter((item) => item.isMarked).length}/
              {checklists.length}) <span style={{ color: "#FF0000" }}> *</span>
            </div>
            <div className={styles.checklistContainer}>
              {checklists.map((item, index) => (
                <div key={index}>
                  <div className={styles.checklist}>
                    <div>
                      <input
                        type="checkbox"
                        checked={item.isMarked}
                        onChange={() => handleCheckBoxChange(index)}
                        className={styles.checkboxinput}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleChecklistChange(index, e.target.value)
                        }
                        placeholder={"Add a task"}
                        className={styles.inputchecklist}
                      />
                    </div>
                    <div style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <img
                        src={Delete}
                        onClick={() => handleDeleteChecklist(index)}
                        alt="delete"
                      />
                    </div>
                  </div>

                  {errors.checklists && errors.checklists[index] && (
                    <div className={styles.error}>
                      {errors.checklists[index]}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              className={styles.addbutton}
              type="button"
              onClick={handleAddChecklist}
            >
              + Add New
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <div>
              <DatePicker
                toggleCalendarOnIconClick
                selected={dueDate}
                onChange={(dueDate) => setDueDate(dueDate)}
                placeholderText="Select DueDate"
                dateFormat="MM/dd/yyyy"
                className={styles.datePicker}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleClose}
                className={styles.cancel}
              >
                Cancel
              </button>
            </div>
            <div>
              <button type="submit" className={styles.submit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditTask;
