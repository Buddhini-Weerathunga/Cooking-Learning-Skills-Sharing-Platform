import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/enrollments")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEnrollments(res.data);
        } else {
          console.error("Expected an array but got:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching enrollments:", error);
      });
  }, []);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      color: "#2c3e50",
      fontSize: "24px",
      marginBottom: "15px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#34495e",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    noEnrollments: {
      fontStyle: "italic",
      color: "#7f8c8d",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Enrollments</h3>
      {enrollments.length === 0 ? (
        <p style={styles.noEnrollments}>No enrollments available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Student Name</th>
              <th style={styles.th}>Course Name</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((e, i) => (
              <tr key={i}>
                <td style={styles.td}>{e.student}</td>
                <td style={styles.td}>{e.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
