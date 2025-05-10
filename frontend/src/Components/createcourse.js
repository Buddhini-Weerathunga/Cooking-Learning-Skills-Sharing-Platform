import React, { useState } from "react";
import axios from "axios";

export default function CreateCOurse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    content: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) =>
    setCourse({ ...course, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = { ...course, price: parseFloat(course.price) };

    axios
      .post("http://localhost:8080/courses", courseData)
      .then(() => {
        alert("Course Created!");
        setCourse({
          title: "",
          description: "",
          content: "",
          price: "",
          startDate: "",
          endDate: "",
        });
      })
      .catch((error) => {
        alert(
          "Error creating course: " + (error.response?.data || error.message)
        );
      });
  };

  return (
    <div className="p-4">
      <h3
        style={{
          color: "#2c3e50",
          fontSize: "24px",
          marginBottom: "15px",
        }}
      >
        Create Course
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Title"
              name="title"
              value={course.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Description"
              name="description"
              value={course.description}
              onChange={handleChange}
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
              value={course.content}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              name="price"
              value={course.price}
              onChange={handleChange}
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
                value={course.startDate}
                onChange={handleChange}
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
                value={course.endDate}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn mt-3"
          style={{
            width: "30%",
            marginLeft: "300px",
            height: "45px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "80px",
            backgroundColor: "rgba(255, 144, 69, 0.84)",
          }}
        >
          Create Course
        </button>
      </form>
    </div>
  );
}
