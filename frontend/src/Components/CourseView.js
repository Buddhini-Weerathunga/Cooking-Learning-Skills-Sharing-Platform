import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function CourseView() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample tag colors for categories
  const tagColors = {
    Cooking: "#ff5722",
    Programming: "#3f51b5",
    Business: "#009688",
    Design: "#9c27b0",
    Marketing: "#ffc107",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
    justifyContent: "space-between",
    gap: "20px",
    margin: "0 auto",
    padding: "0 10px",
  };

  const searchInputStyle = {
    display: "block",
    width: "60%",
    margin: "30px auto 20px auto",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "10px",
  };

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
            category: course.category,
            lessonCount: course.lessonCount,
            instructor: course.instructor,
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

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          height: "120px",
          backgroundImage: "url('')",

          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ff6804",
          fontSize: "28px",
          fontWeight: "bold",

          marginTop: "90px",
        }}
      >
        <span>Home &rarr; Courses</span>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by course title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInputStyle}
      />

      {/* Course Cards */}
      {filteredCourses.length === 0 ? (
        <p style={{ textAlign: "center" }}>No courses found.</p>
      ) : (
        <div style={containerStyle}>
          {filteredCourses.map((course) => (
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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    marginBottom: "10px",
                  }}
                >
                  <span>📚 {course.content}</span>
                  <span>🌐 Online Class</span>
                </div>

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
          ))}
        </div>
      )}
    </div>
  );
}
