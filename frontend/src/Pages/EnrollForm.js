import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EnrollForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", nic: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/courses/${id}`)
      .then((res) => setCourse(res.data));
  }, [id]);

  const submit = () => {
    axios
      .post(`http://localhost:8080/api/students/enroll/${id}`, form)
      .then(() => navigate("/"));
  };

  return course ? (
    <div style={{ padding: 20 }}>
      <h2>Enroll in {course.name}</h2>
      <p>{course.description}</p>
      <div style={{ marginTop: 20 }}>
        {Object.keys(form).map((key) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <input
              placeholder={key}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              style={{ width: "100%", padding: 8 }}
            />
          </div>
        ))}
        <button onClick={submit}>Enroll</button>
      </div>
    </div>
  ) : null;
}
