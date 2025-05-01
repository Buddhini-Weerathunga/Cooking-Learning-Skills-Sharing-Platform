// src/Pages/Certifications/CertificationList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCertifications, deleteCertification } from "./certificationService";
import Layout from "../../Components/Layout";

const cardStyle = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
  marginBottom: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const btnStyle = {
  background: "#ff6804",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 18px",
  fontWeight: 600,
  cursor: "pointer",
  marginRight: "10px",
};

function CertificationList() {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    const res = await getCertifications();
    setCertifications(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      await deleteCertification(id);
      fetchCertifications();
    }
  };

  return (
    <Layout>
      <section
        style={{
          background: "#fef6f0",
          minHeight: "100vh",
          padding: "60px 0 40px 0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <h1
              style={{
                fontFamily: "'Madimi One', sans-serif",
                fontSize: "60px",
                color: "#ff6804",
                margin: 0,
              }}
            >
              Certifications
            </h1>
            <Link to="/certifications/create">
              <button style={btnStyle}>Add Certification</button>
            </Link>
          </div>
          <div>
            {certifications.length === 0 ? (
              <div
                style={{
                  fontFamily: "'Madimi One', sans-serif",
                  fontSize: "22px",
                  color: "#888",
                  textAlign: "center",
                  marginTop: "60px",
                }}
              >
                No certifications found.
              </div>
            ) : (
              certifications.map((cert) => (
                <div key={cert.id} style={cardStyle}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      style={{
                        width: "110px",
                        height: "110px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginRight: "30px",
                        background: "#ffedd5",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h2
                        style={{
                          fontFamily: "'Madimi One', sans-serif",
                          fontSize: "32px",
                          color: "#ff6804",
                          margin: 0,
                        }}
                      >
                        <Link
                          to={`/certifications/${cert.id}`}
                          style={{ color: "#ff6804", textDecoration: "none" }}
                        >
                          {cert.title}
                        </Link>
                      </h2>
                      <div
                        style={{
                          color: "#a88c7d",
                          fontSize: "18px",
                          margin: "8px 0",
                        }}
                      >
                        Level: <b>{cert.level}</b> &nbsp;|&nbsp; Hours:{" "}
                        <b>{cert.estimatedHours}</b>
                      </div>
                      <p style={{ color: "#444", margin: 0 }}>
                        {cert.description}
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: "18px" }}>
                    <Link to={`/certifications/edit/${cert.id}`}>
                      <button
                        style={{
                          ...btnStyle,
                          background: "#ffd7b3",
                          color: "#ff6804",
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      style={{
                        ...btnStyle,
                        background: "#e74c3c",
                        color: "#fff",
                      }}
                      onClick={() => handleDelete(cert.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default CertificationList;
