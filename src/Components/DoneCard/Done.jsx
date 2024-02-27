import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../Pages/Board/Board.module.css";
import upArrow from "../../assets/upArrow.png";
import downArrow from "../../assets/downArrow.png";
import collapsAll from "../../assets/collapsAll.png";
import PopUp from "../PopUp/PopUp";

const Done = ({ tasks, handleTaskUpdate }) => {
  const [collapsedTasks, setCollapsedTasks] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { userId } = useParams();

  const toggleCollaps = (taskId) => {
    setCollapsedTasks((prevCollapsedTasks) => {
      if (prevCollapsedTasks.includes(taskId)) {
        return prevCollapsedTasks.filter((id) => id !== taskId);
      } else {
        return [...prevCollapsedTasks, taskId];
      }
    });
  };

  const isTaskCollapsed = (taskId) => {
    return collapsedTasks.includes(taskId);
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#FF2473";
      case "moderate":
        return "#18B0FF";
      case "low":
        return "#63C05B";
      default:
        return "#FFF";
    }
  };
  const togglePopUp = (taskId) => {
    setShowPopUp(!showPopUp);
    setSelectedTaskId(taskId);
  };
  const handlePhaseChange = async (taskId, newPhase) => {
    try {
      const response = await axios.put(
        `https://project-management-backend-apzo.onrender.com/task/updatePhase/${userId}/${taskId}`,
        { phase: newPhase },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      handleTaskUpdate();
      console.log(response.data);
    } catch (error) {
      console.error("Error updating phase:", error);
    }
  };
  const onClose = () => {
    setShowPopUp(false);
  };
  return (
    <div className={`${styles.phase}`}>
      <div className={styles.headbar}>
        <div>
          <h3>Done</h3>
        </div>

        <div>
          <img
            src={collapsAll}
            alt="collapse"
            style={{ cursor: "pointer" }}
            onClick={() =>
              setCollapsedTasks((prevCollapsedTasks) => {
                if (!prevCollapsedTasks) {
                  return tasks.done.map((task) => task.taskId);
                } else {
                  return [];
                }
              })
            }
          />
        </div>
      </div>
      <div className={styles.container2}>
        {tasks.done.map((task) => (
          <div
            key={task.taskId}
            className={styles.card}
            style={{ position: "relative" }}
          >
            <div className={styles.row1}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: getPriorityColor(task.priority),
                    width: "10px",
                    height: "10px",
                    borderRadius: "100%",
                    marginLeft: "5px",
                  }}
                ></div>
                <div id={styles.priority}>
                  {task.priority.toUpperCase()} PRIORITY
                </div>
              </div>
              <div
                className={styles.dotbut}
                onClick={() => togglePopUp(task.taskId)}
              >
                ...
              </div>
            </div>
            <div
              id={styles.title}
              title={task.title.length > 24 ? task.title : ""}
            >
              {task.title.length > 24
                ? `${task.title.substring(0, 21)}...`
                : task.title}
            </div>

            <div>
              <div
                className={styles.row2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div id={styles.checklist}>
                  {" "}
                  Checklist ( {task.markedChecklists}/{task.totalChecklists} )
                </div>
                <div style={{ cursor: "pointer" }}>
                  <img
                    src={isTaskCollapsed(task.taskId) ? downArrow : upArrow}
                    alt="toggle"
                    onClick={() => toggleCollaps(task.taskId)}
                  />
                </div>
              </div>
              {isTaskCollapsed(task.taskId) && (
                <div>
                  {task.checklists.map((item, index) => (
                    <div key={index} className={styles.checklist}>
                      <div>
                        <input
                          type="checkbox"
                          checked={item.isMarked}
                          className={styles.checkbox}
                          readOnly
                        />
                      </div>
                      <div>{item.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.row3}>
              {task.dueDate ? (
                <div className={styles.doneButton}>
                  <button>
                    {new Date(task.dueDate).toLocaleDateString("en-us", {
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                </div>
              ) : (
                <div className={styles.dateButton}></div>
              )}
              <div
                className={styles.chageButton}
                style={{ marginLeft: "10px" }}
              >
                <button
                  onClick={() => handlePhaseChange(task.taskId, "backlog")}
                >
                  BACKLOG
                </button>
              </div>
              <div className={styles.chageButton}>
                <button onClick={() => handlePhaseChange(task.taskId, "todo")}>
                  TODO
                </button>
              </div>
              <div className={styles.chageButton}>
                <button
                  onClick={() => handlePhaseChange(task.taskId, "inProgress")}
                >
                  PROGRESS
                </button>
              </div>
            </div>
            <div className={styles.PopUp}>
              {showPopUp && selectedTaskId === task.taskId && (
                <PopUp
                  taskId={selectedTaskId}
                  onClose={onClose}
                  onTaskUpdate={handleTaskUpdate}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Done;
