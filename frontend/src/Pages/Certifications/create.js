// src/Pages/Certifications/CertificationCreate.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCertification } from "./certificationService";
import Layout from "../../Components/Layout";

function CertificationCreate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "Beginner",
    imageUrl: "",
    estimatedHours: 0,
    requirements: [""],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRequirementChange = (idx, value) => {
    const reqs = [...form.requirements];
    reqs[idx] = value;
    setForm({ ...form, requirements: reqs });
  };

  const addRequirement = () => {
    setForm({ ...form, requirements: [...form.requirements, ""] });
  };

  const removeRequirement = (idx) => {
    const reqs = form.requirements.filter((_, i) => i !== idx);
    setForm({ ...form, requirements: reqs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCertification(form);
    navigate("/certifications");
  };

  return (
    <Layout>
      <section
        style={{
          background: "#ffedd5",
          minHeight: "100vh",
          padding: "60px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            padding: "36px 32px",
            minWidth: "340px",
            maxWidth: "480px",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontFamily: "'Madimi One', sans-serif",
              fontSize: "36px",
              color: "#ff6804",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Add Certification
          </h2>
          <div style={{ marginBottom: "18px" }}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1.5px solid #ffd7b3",
                marginBottom: "10px",
                fontSize: "18px",
              }}
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1.5px solid #ffd7b3",
                marginBottom: "10px",
                fontSize: "16px",
                minHeight: "60px",
              }}
            />
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1.5px solid #ffd7b3",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1.5px solid #ffd7b3",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />
            <input
              name="estimatedHours"
              type="number"
              value={form.estimatedHours}
              onChange={handleChange}
              placeholder="Estimated Hours"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1.5px solid #ffd7b3",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />
            <label style={{ fontWeight: 600, color: "#ff6804" }}>
              Requirements:
            </label>
            {form.requirements.map((req, idx) => (
              <div key={idx} style={{ display: "flex", marginBottom: "8px" }}>
                <input
                  value={req}
                  onChange={(e) => handleRequirementChange(idx, e.target.value)}
                  placeholder="Requirement"
                  required
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ffd7b3",
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeRequirement(idx)}
                  disabled={form.requirements.length === 1}
                  style={{
                    marginLeft: "8px",
                    background: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0 12px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              style={{
                background: "#ffd7b3",
                color: "#ff6804",
                border: "none",
                borderRadius: "6px",
                padding: "6px 16px",
                cursor: "pointer",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              Add Requirement
            </button>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#ff6804",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "12px",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Create
          </button>
        </form>
      </section>
    </Layout>
  );
}

export default CertificationCreate;
