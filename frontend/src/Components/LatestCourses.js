import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LatestCourses() {
  const [latestCourses, setLatestCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const sorted = response.data.sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
          );
          const latest = sorted.slice(0, 3);
          setLatestCourses(latest);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching latest courses:", error);
      });
  }, []);

  const tagColors = {
    Cooking: "#f44336",
    Baking: "#4caf50",
    Thai: "#ff9800",
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {latestCourses.length === 0 ? (
        <p>No recent courses found.</p>
      ) : (
        latestCourses.map((course) => (
          <div
            key={course.id}
            style={{
              width: "300px",
              margin: "10px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              fontFamily: "sans-serif",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Image */}
            <img
              src="/images/course.jpg"
              alt="Course"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px", flexGrow: 1 }}>
              {/* Tag and Rating */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    backgroundColor: tagColors[course.category] || "#ccc",
                    color: "#fff",
                    fontSize: "12px",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    marginRight: "10px",
                  }}
                >
                  {course.category || "Cooking"}
                </span>
                <span
                  style={{
                    color: "#f44336",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  ★★★★★
                </span>
                <span style={{ marginLeft: "5px", fontSize: "12px" }}>
                  03 reviews
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "20px",
                  color: "#333",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {course.title}
              </h3>

              {/* Lessons and Class Type */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  marginBottom: "10px",
                }}
              >
                <span>📚 {course.lessonCount || "18x"} Lesson</span>
                <span>🌐 Online Class</span>
              </div>

              {/* Author */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px",
                  marginBottom: "15px",
                }}
              >
                <div style={{ color: "#555", lineHeight: "1.6" }}>
                  <div>Start: {course.startDate}</div>
                  <div>End: {course.endDate}</div>
                </div>
                <a
                  href="#"
                  style={{
                    textDecoration: "underline",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Read More
                </a>
              </div>

              {/* Enroll Now Button */}
              <button
                style={{
                  width: "100%",
                  backgroundColor: "rgb(245, 144, 77)",
                  color: "#fff",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={() => alert(`You have enrolled in ${course.title}`)}
              >
                <Link className="nav-link" to="/enroll">
                  Enroll Now
                </Link>
              </button>
            </div>

            {/* Price Badge */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#ff9800",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "50%",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              ${course.price}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
