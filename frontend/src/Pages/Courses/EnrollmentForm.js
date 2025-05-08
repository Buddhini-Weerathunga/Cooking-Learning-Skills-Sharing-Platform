import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const EnrollmentForm = () => {
  const location = useLocation();
  const { course } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nic: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/enrollments/enroll?courseId=${course.id}`,
        formData
      )
      .then(() => {
        alert("Enrolled successfully!");
        setFormData({ name: "", email: "", nic: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Enrollment failed.");
      });
  };

  if (!course) return <p>No course selected.</p>;

  return (
    <div className="container mt-4">
      <h3>Enroll in: {course.title}</h3>
      <p>
        <strong>Instructor:</strong> {course.instructor?.username || "Unknown"}
      </p>
      <p>
        <strong>Description:</strong> {course.description}
      </p>
      <p>
        <strong>Price:</strong> ${course.price}
      </p>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <label>NIC:</label>
        <input
          type="text"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-success mt-2">
          Enroll
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm;
