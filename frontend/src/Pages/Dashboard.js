import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/InstructorNav";
import { FaBalanceScaleRight } from "react-icons/fa";

function Dashboard() {
  const [activeSection, setActiveSection] = useState(1);
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

  const handleClick = (sectionNumber) => {
    setActiveSection(sectionNumber);
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/courses/instructor?username=${user.username}`,
        axiosConfig
      );
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
  };

  const handleCreateCourse = async () => {
    // Input validation
    if (!newCourse.title || !newCourse.description || !newCourse.price) {
      alert("Please fill in all the required fields.");
      return;
    }

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
      fetchCourses(); // Refresh the list of courses after adding a new one
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  const handleView = (id) => {
    console.log("Viewing course with ID:", id);
    // Implement view functionality (could navigate to a detail page)
  };

  const handleEdit = (id) => {
    console.log("Editing course with ID:", id);
    // Implement edit functionality (could populate form with current data)
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      // Attempt to delete the course
      const response = await axios.delete(
        `http://localhost:8080/api/courses/delete?id=${id}`,
        axiosConfig
      );

      // Check the response to ensure deletion was successful
      if (response.status === 200) {
        // If successful, refresh the course list
        fetchCourses(); // Refetch courses to reflect deletion
        alert("Course deleted successfully");
      } else {
        // Handle failure in the deletion
        alert("Failed to delete course");
      }
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("There was an error deleting the course. Please try again.");
    }
  };

  const getButtonStyle = (sectionNumber) => ({
    marginRight: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: activeSection === sectionNumber ? "#ff6804" : "#e0e0e0",
    color: activeSection === sectionNumber ? "white" : "black",
    cursor: "pointer",
    transition: "0.3s",
    fontFamily: "'Madimi One', sans-serif",
  });

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div
          className="d-flex justify-content-center mb-4 "
          style={{ marginTop: "-30px" }}
        >
          <button style={getButtonStyle(1)} onClick={() => handleClick(1)}>
            Courses
          </button>
          <button style={getButtonStyle(2)} onClick={() => handleClick(2)}>
            Students
          </button>
          <button style={getButtonStyle(3)} onClick={() => handleClick(3)}>
            Profile
          </button>
          <button style={getButtonStyle(4)} onClick={() => handleClick(4)}>
            Feedbacks
          </button>
        </div>
        <div
          className="border p-4 rounded"
          style={{
            minHeight: "150px",
            width: "80%",
            marginTop: "70px",
            marginLeft: "120px",
          }}
        >
          {activeSection === 1 && (
            <div className="p-4">
              <h3 style={{ marginBottom: "15px" }}>Create Course</h3>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Title"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Description"
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Content"
                    value={newCourse.content}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, content: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Price"
                    value={newCourse.price}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label>
                    Start Date
                    <input
                      className="form-control"
                      type="date"
                      placeholder="Start Date"
                      value={newCourse.startDate}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label>
                    Closing Date
                    <input
                      className="form-control"
                      type="date"
                      placeholder="Closing Date"
                      value={newCourse.closingDate}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          closingDate: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
              </div>

              <button
                className="btn  mt-3"
                onClick={handleCreateCourse}
                style={{
                  width: "30%",
                  marginLeft: "300px",
                  height: "45px",
                  fontSize: "20px",
                  fontweight: "bold",
                  marginBottom: "80px",
                  backgroundColor: "rgba(255, 144, 69, 0.84)",
                }}
              >
                Create Course
              </button>

              <h2>Your Courses</h2>
              {courses.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Content</th>
                      <th>Price</th>
                      <th>Start Date</th>
                      <th>Closing Date</th>
                      <th>Instructor</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>{course.description}</td>
                        <td>{course.content}</td>
                        <td>${course.price}</td>
                        <td>{course.startDate}</td>
                        <td>{course.closingDate}</td>
                        <td>{course.instructor?.username || "N/A"}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => handleEdit(course.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(course.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No courses found.</p>
              )}
            </div>
          )}

          {/* Other sections content */}
          {activeSection === 2 && <div>Section 2 Content</div>}
          {activeSection === 3 && <div>Section 3 Content</div>}
          {activeSection === 4 && <div>Section 4 Content</div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
