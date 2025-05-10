import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses")
      .then((res) => setCourses(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Instructor Dashboard</h2>
      <Link to="/create" style={{ marginBottom: 20, display: "inline-block" }}>
        Create Course
      </Link>
      {courses.map((course) => (
        <div
          key={course.id}
          style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
        >
          <h3>{course.name}</h3>
          <Link to={`/edit/${course.id}`}>Edit</Link> |{" "}
          <Link to={`/courses/${course.id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}
