import React, { useEffect, useState } from "react";
import axios from "axios";

function Course() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:8080/api/courses");
    setCourses(res.data);
  };

  const fetchStudents = async (courseId) => {
    const res = await axios.get(
      `http://localhost:8080/api/courses/${courseId}/students`
    );
    setStudents(res.data);
    setSelectedCourseId(courseId);
  };

  const enrollStudent = async (courseId) => {
    const name = prompt("Student Name:");
    const email = prompt("Student Email:");
    if (name && email) {
      await axios.post(
        `http://localhost:8080/api/students/enroll/${courseId}`,
        {
          name,
          email,
        }
      );
      fetchStudents(courseId);
    }
  };

  const createCourse = async () => {
    const name = prompt("Course Name:");
    const description = prompt("Description:");
    const content = prompt("Content:");
    const price = parseFloat(prompt("Price:"));
    const startDate = prompt("Start Date (YYYY-MM-DD):");
    const endDate = prompt("End Date (YYYY-MM-DD):");

    if (name && startDate && endDate) {
      await axios.post("http://localhost:8080/api/courses", {
        name,
        description,
        content,
        price,
        startDate,
        endDate,
      });
      fetchCourses();
    }
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:8080/api/courses/${id}`);
    fetchCourses();
    if (selectedCourseId === id) setStudents([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses</h2>
      <button onClick={createCourse}>Add Course</button>
      <ul>
        {courses.map((course) => (
          <li key={course.id} style={{ marginBottom: "15px" }}>
            <strong>{course.name}</strong>
            <p>Description: {course.description}</p>
            <p>Content: {course.content}</p>
            <p>Price: ${course.price}</p>
            <p>Start Date: {course.startDate}</p>
            <p>End Date: {course.endDate}</p>

            <button onClick={() => fetchStudents(course.id)}>
              View Students
            </button>
            <button onClick={() => enrollStudent(course.id)}>
              Enroll Student
            </button>
            <button onClick={() => deleteCourse(course.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {students.length > 0 && (
        <div>
          <h3>Students in Course ID {selectedCourseId}</h3>
          <ul>
            {students.map((s) => (
              <li key={s.id}>
                {s.name} ({s.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Course;
