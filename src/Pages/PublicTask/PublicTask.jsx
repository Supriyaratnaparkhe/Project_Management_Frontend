import React, { useState, useEffect } from "react";
import styles from "./PublicTask.module.css";
import headlogo from "../../assets/headlogo.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import NotFound from "../../Components/NotFound/NotFound";

const PublicTask = () => {
  const { taskId } = useParams();
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    dueDate: null,
    checklists: [],
    totalChecklists: 0,
    markedChecklists: 0,
  });
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(
          `https://project-management-backend-apzo.onrender.com/task/${taskId}`
        );
        setTaskData(response.data);
      } catch (error) {
        setNotFound(true);
        console.error("Error fetching task data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, [taskId]);

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
  const isDueDatePassed = (dueDate) => {
    const currentDate = new Date();
    return currentDate > new Date(dueDate);
  };

  return (
    <>
      {!loading ? (
        <>
          {notFound ? (
            <NotFound />
          ) : (
            <div className={styles.publicTask}>
              <div className={styles.sidebar}>
                <div className={styles.head}>
                  <div className={styles.logo}>
                    <img src={headlogo} alt="logo" />
                  </div>
                  <div id={styles.headline}>Pro Manager</div>
                </div>
              </div>
              <div className={styles.frame}>
                <div className={styles.container}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <div
                      style={{
                        backgroundColor: getPriorityColor(taskData.priority),
                        width: "10px",
                        height: "10px",
                        borderRadius: "100%",
                      }}
                    ></div>
                    <div className={styles.priority}>
                      {taskData.priority.toUpperCase()} PRIORITY
                    </div>
                  </div>
                  <div className={styles.title}>{taskData.title}</div>

                  <div className={styles.labels}>
                    Checklists ({taskData.markedChecklists}/
                    {taskData.totalChecklists})
                  </div>
                  <div className={styles.checklistContainer}>
                    {taskData.checklists.map((checklist, index) => (
                      <div key={index}>
                        <div className={styles.checklist}>
                          <div>
                            <input
                              type="checkbox"
                              checked={checklist.isMarked}
                              className={styles.checkbox}
                              readOnly
                            />
                          </div>
                          <div className={styles.checkTitle}>
                            {checklist.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {taskData.dueDate ? (
                    <div
                      id={styles.dueDate}
                      className={
                        isDueDatePassed(taskData.dueDate)
                          ? styles.dueDatePassed
                          : styles.dateButton
                      }
                    >
                      Due Date
                      <button>
                        {new Date(taskData.dueDate).toLocaleDateString(
                          "en-us",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PublicTask;
