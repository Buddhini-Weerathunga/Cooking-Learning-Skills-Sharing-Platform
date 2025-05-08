/*import React, { useEffect, useState } from "react";
import axios from "axios";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState("grid"); // 'grid' or 'list'

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses/all") // Replace with your actual endpoint
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>All Courses</h2>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setView("grid")}
          >
            Grid View
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setView("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div className={view === "grid" ? "row" : "d-flex flex-column gap-3"}>
        {courses.map((course) => (
          <div
            key={course.id}
            className={view === "grid" ? "col-md-4 mb-4" : "card mb-3"}
          >
            <div
              className="card h-100 d-flex flex-row"
              style={view === "grid" ? {} : {}}
            >
              <img
                src={course.imageUrl || "https://via.placeholder.com/150"}
                alt={course.title}
                className="card-img-top"
                style={{
                  height: view === "grid" ? "200px" : "100%",
                  width: view === "grid" ? "100%" : "200px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text">
                  <strong>Instructor:</strong>{" "}
                  {course.instructor?.username || "Unknown"}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${course.price}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Start: {course.startDate} | End: {course.closingDate}
                  </small>
                </p>
                <button className="btn btn-primary mt-2">Enroll Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState("grid");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses/all")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleEnroll = (course) => {
    navigate("/enroll", { state: { course } });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>All Courses</h2>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setView("grid")}
          >
            Grid View
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setView("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div className={view === "grid" ? "row" : "d-flex flex-column gap-3"}>
        {courses.map((course) => (
          <div
            key={course.id}
            className={view === "grid" ? "col-md-4 mb-4" : "card mb-3"}
          >
            <div className="card h-100 d-flex flex-row">
              <img
                src={course.imageUrl || "https://via.placeholder.com/150"}
                alt={course.title}
                className="card-img-top"
                style={{
                  height: view === "grid" ? "200px" : "100%",
                  width: view === "grid" ? "100%" : "200px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text">
                  <strong>Instructor:</strong>{" "}
                  {course.instructor?.username || "Unknown"}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${course.price}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Start: {course.startDate} | End: {course.closingDate}
                  </small>
                </p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleEnroll(course)}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
