import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from "./Analytics.module.css";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";

const Analytics = () => {
  const [analyticData, setAnalyticData] = useState(null);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  const formatNumber = (num) => {
    return num.toString().padStart(2, "0");
  };
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(
          `https://project-management-backend-apzo.onrender.com/task/analytics/${userId}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setAnalyticData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [userId]);

  return (
    <>
      {!loading ? (
        <div className={styles.container}>
          <Sidebar selectedButton={"analytics"} />
          <div>
            <div className={styles.heading}>Analytics</div>
            {analyticData && (
              <div className={styles.analyticsData}>
                <div>
                  <table className={styles.taskTable}>
                    <tbody>
                      <tr>
                        <td>
                          <div className={styles.bullet}></div>
                        </td>
                        <td className={styles.data}>Backlog Tasks</td>
                        <td className={styles.value}>
                          {formatNumber(analyticData.phaseCounts.backlog || 0)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.bullet}></div>
                        </td>
                        <td className={styles.data}>To-do Tasks</td>
                        <td className={styles.value}>
                          {formatNumber(analyticData.phaseCounts.todo || 0)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.bullet}></div>
                        </td>
                        <td className={styles.data}>In-Progress Tasks</td>
                        <td className={styles.value}>
                          {formatNumber(
                            analyticData.phaseCounts.inProgress || 0
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.bullet}></div>
                        </td>
                        <td className={styles.data}>Completed Tasks</td>
                        <td className={styles.value}>
                          {formatNumber(analyticData.phaseCounts.done || 0)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table className={styles.taskTable}>
                    <tbody>
                      <tr>
                        <td>
                          <div className={styles.bullet}></div>
                        </td>
                        <td className={styles.data}>Low priority</td>
                        <td className={styles.value}>
                          {formatNumber(analyticData.priorityCounts.low || 0)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.bullet}></div>
                        </td>
                        <td className={styles.data}>Moderate Priority</td>
                        <td className={styles.value}>
                          {formatNumber(
                            analyticData.priorityCounts.moderate || 0
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.bullet}></div>
                        </td>
                        <td className={styles.data}>High Priority</td>
                        <td className={styles.value}>
                          {formatNumber(analyticData.priorityCounts.high || 0)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className={styles.bullet}></div>
                        </td>
                        <td className={styles.data}>Due Date Tasks</td>
                        <td className={styles.value}>
                          {formatNumber(
                            analyticData.dueDateNotPassedCount || 0
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        loading && <Spinner />
      )}
    </>
  );
};

export default Analytics;
