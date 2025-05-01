import React, { useEffect, useState } from "react";
import axios from "axios";

function CourseList() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Function to fetch courses by instructor
  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/courses/instructor?username=${user.username}`,
        axiosConfig
      );
      if (Array.isArray(res.data)) {
        setCourses(res.data); // Update the courses state
      } else {
        console.warn("Expected array, got:", res.data);
        setCourses([]); // If not an array, set courses to an empty array
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]); // Handle error by setting courses to an empty array
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Courses</h1>
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
    </div>
  );
}

export default CourseList;
