import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import styles from "./Board.module.css";
import Backlog from "../../Components/BacklogCard/Backlog";
import ToDo from "../../Components/ToDoCard/ToDo";
import InProgress from "../../Components/InProgessCard/InProgress";
import Done from "../../Components/DoneCard/Done";
import Spinner from "../../Components/Spinner/Spinner";

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedOption, setSelectedOption] = useState("this_week");
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const createrName = localStorage.getItem("createrName");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://project-management-backend-apzo.onrender.com/task/getAllTasks/${userId}?filter=${selectedOption}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setTasks(response.data.groupedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId, selectedOption]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleTaskCreated = async () => {
    try {
      const response = await axios.get(
        `https://project-management-backend-apzo.onrender.com/task/getAllTasks/${userId}?filter=${selectedOption}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setTasks(response.data.groupedTasks);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  return (
    <>
      {!loading ? (
        <div className={styles.board}>
          <div>
            <Sidebar selectedButton={"board"} />
          </div>

          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.welcome}>Welcome! {createrName}</div>
              <div id={styles.currDate}>
                {new Date().toLocaleDateString("en-us", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className={styles.row}>
              <div id={styles.pageName}>Board</div>
              <div className={styles.customSelect}>
                <select value={selectedOption} onChange={handleSelectChange}>
                  <option value="this_week">This Week</option>
                  <option value="today">Today</option>
                  <option value="this_month">This Month</option>
                </select>
              </div>
            </div>

            <div className={styles.taskContainer}>
              <div>
                <Backlog tasks={tasks} handleTaskUpdate={handleTaskCreated} />
              </div>
              <div>
                <ToDo tasks={tasks} handleTaskCreated={handleTaskCreated} />
              </div>
              <div>
                <InProgress
                  tasks={tasks}
                  handleTaskUpdate={handleTaskCreated}
                />
              </div>
              <div>
                <Done tasks={tasks} handleTaskUpdate={handleTaskCreated} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        loading && <Spinner />
      )}
    </>
  );
};

export default Board;
