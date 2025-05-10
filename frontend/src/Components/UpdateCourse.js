import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    content: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/courses/${id}`)
      .then((response) => {
        const data = response.data;

        // If your backend sends ISO date-time, trim it to 'yyyy-MM-dd'
        const formatDate = (dateString) => dateString?.split("T")[0];

        setCourseData({
          title: data.title || "",
          description: data.description || "",
          content: data.content || "",
          price: data.price || "",
          startDate: formatDate(data.startDate),
          endDate: formatDate(data.endDate),
        });
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        alert("Failed to load course data.");
      });
  }, [id]);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/courses/${id}`, courseData)
      .then(() => {
        alert("Course updated successfully");
        navigate("/courses");
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        alert("Update failed. Please try again.");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        className="container p-4"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "50%",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Update Course</h3>
        <form onSubmit={handleUpdate}>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Title"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Description"
                name="description"
                value={courseData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Content"
                name="content"
                value={courseData.content}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="number"
                placeholder="Price"
                name="price"
                value={courseData.price}
                onChange={handleChange}
                required
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
                  name="startDate"
                  value={courseData.startDate}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                End Date
                <input
                  className="form-control"
                  type="date"
                  name="endDate"
                  value={courseData.endDate}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn mt-3"
            style={{
              width: "30%",
              height: "45px",
              fontSize: "16px",
              fontWeight: "semi-bold",
              backgroundColor: "rgba(255, 144, 69, 0.84)",
            }}
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
}
