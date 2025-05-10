import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function List() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const cleanedCourses = response.data.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            content: course.content,
            price: course.price,
            startDate: course.startDate,
            endDate: course.endDate,
          }));
          setCourses(cleanedCourses);
        } else {
          console.error("Unexpected response format:", response.data);
          setCourses([]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching courses:", error);
        setCourses([]);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/courses/${id}`)
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id));
        alert("Course deleted successfully");
      })
      .catch((error) =>
        console.error("There was an error deleting the course:", error)
      );
  };

  // Button style
  const buttonStyle = {
    padding: "6px 12px",
    marginRight: "10px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
  };

  return (
    <div>
      <h3
        style={{
          color: "#2c3e50",
          fontSize: "24px",
          marginBottom: "15px",
        }}
      >
        Create List
      </h3>

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ccc",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Title
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Start Date
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {course.title}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {course.startDate}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <Link to={`/course/view/${course.id}`}>
                    <button
                      style={{ ...buttonStyle, backgroundColor: "#2196F3" }}
                    >
                      View
                    </button>
                  </Link>
                  <Link to={`/course/update/${course.id}`}>
                    <button
                      style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id)}
                    style={{ ...buttonStyle, backgroundColor: "#f44336" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
