import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CourseList from "./Courses/CourseList";

function InstructorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    content: "",
    price: "",
    startDate: "",
    closingDate: "",
  });

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const fetchCourses = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/courses/instructor?username=${user.username}`,
        axiosConfig
      );
      console.log("Courses data:", res.data);
      if (Array.isArray(res.data)) {
        setCourses(res.data);
      } else {
        console.warn("Expected array, got:", res.data);
        setCourses([]);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  }, [user.username, axiosConfig]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCreateCourse = async () => {
    try {
      const courseData = {
        ...newCourse,
        price: parseFloat(newCourse.price),
      };
      await axios.post(
        `http://localhost:8080/api/courses/create?username=${user.username}`,
        courseData,
        axiosConfig
      );
      setNewCourse({
        title: "",
        description: "",
        content: "",
        price: "",
        startDate: "",
        closingDate: "",
      });
      fetchCourses();
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome {user.username} (Instructor)</h1>

      <h2>Create Course</h2>
      <input
        type="text"
        placeholder="Title"
        value={newCourse.title}
        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        value={newCourse.description}
        onChange={(e) =>
          setNewCourse({ ...newCourse, description: e.target.value })
        }
      />
      <br />
      <input
        type="text"
        placeholder="Content"
        value={newCourse.content}
        onChange={(e) =>
          setNewCourse({ ...newCourse, content: e.target.value })
        }
      />
      <br />
      <input
        type="number"
        placeholder="Price"
        value={newCourse.price}
        onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
      />
      <br />
      <input
        type="date"
        placeholder="Start Date"
        value={newCourse.startDate}
        onChange={(e) =>
          setNewCourse({ ...newCourse, startDate: e.target.value })
        }
      />
      <br />
      <input
        type="date"
        placeholder="Closing Date"
        value={newCourse.closingDate}
        onChange={(e) =>
          setNewCourse({ ...newCourse, closingDate: e.target.value })
        }
      />
      <br />
      <button onClick={handleCreateCourse}>Create Course</button>

      <h2>Your Courses</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id} style={{ marginBottom: "15px" }}>
              <strong>Title:</strong> {course.title}
              <br />
              <strong>Description:</strong> {course.description}
              <br />
              <strong>Content:</strong> {course.content}
              <br />
              <strong>Price:</strong> ${course.price}
              <br />
              <strong>Start Date:</strong> {course.startDate}
              <br />
              <strong>Closing Date:</strong> {course.closingDate}
              <br />
              <strong>Instructor:</strong>{" "}
              {course.instructor?.username || "N/A"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses found.</p>
      )}
      <CourseList />
    </div>
  );
}

export default InstructorDashboard;
