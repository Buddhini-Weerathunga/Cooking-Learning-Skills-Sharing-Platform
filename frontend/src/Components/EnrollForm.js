import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function EnrollForm() {
  const [student, setStudent] = useState({ name: "", email: "", nic: "" });
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseId) {
      alert("Please select a course.");
      return;
    }

    axios
      .post(`http://localhost:8080/enrollments/${courseId}`, student)
      .then(() => {
        alert("Student enrolled successfully!");
        navigate("/courses");
        setStudent({ name: "", email: "", nic: "" });
        setCourseId("");
      })
      .catch((error) => {
        console.error("Error enrolling student:", error);
        alert("Error enrolling student: " + error.message);
      });
  };

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "400px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    input: {
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    select: {
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      padding: "10px",
      backgroundColor: "rgb(245, 144, 77)",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "170px" }}>
        <h2 style={{ textAlign: "center" }}>Enroll Now</h2>
        <h5 style={{ textAlign: "center", color: "darkblue" }}>
          Enroll now to start your cooking journey
        </h5>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
            placeholder="Name"
            required
            style={styles.input}
          />
          <input
            name="email"
            type="email"
            value={student.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            name="nic"
            value={student.nic}
            onChange={(e) => setStudent({ ...student, nic: e.target.value })}
            placeholder="NIC"
            required
            style={styles.input}
          />
          <select
            onChange={(e) => setCourseId(e.target.value)}
            value={courseId}
            required
            style={styles.select}
          >
            <option value="">Select Course</option>
            {courses.length > 0 ? (
              courses.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.title}
                </option>
              ))
            ) : (
              <option disabled>No courses available</option>
            )}
          </select>
          <button type="submit" style={styles.button}>
            Enroll
          </button>
        </form>
      </div>
    </div>
  );
}
