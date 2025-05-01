import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCertification } from "./certificationService";
import Layout from "../../Components/Layout";
import axios from "axios";
import { generateCertificate } from "./certificationService";

function CertificationDetail() {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [showCertificateForm, setShowCertificateForm] = useState(false);

  // Get user info from localStorage
  const [userId] = useState(localStorage.getItem("userId") || "");
  const [fullName, setFullName] = useState(
    localStorage.getItem("userName") || ""
  );

  useEffect(() => {
    getCertification(id).then((res) => setCert(res.data));
  }, [id]);

  const handleGenerateCertificate = async () => {
    try {
      const response = await generateCertificate(userId, id, fullName);
      alert(`Certificate generated at: ${response.data}`);
    } catch (error) {
      console.error("Certificate generation failed:", error);
      alert("Certificate generation failed");
    }
  };

  if (!cert)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );

  return (
    <Layout>
      <section
        style={{
          background: "#fef6f0",
          minHeight: "100vh",
          padding: "60px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            padding: "36px 32px",
            minWidth: "340px",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Madimi One', sans-serif",
              fontSize: "36px",
              color: "#ff6804",
              marginBottom: "18px",
            }}
          >
            {cert.title}
          </h2>
          <img
            src={cert.imageUrl}
            alt={cert.title}
            style={{
              width: "160px",
              height: "160px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "18px",
              background: "#ffedd5",
            }}
          />
          <div
            style={{ color: "#a88c7d", fontSize: "18px", marginBottom: "12px" }}
          >
            Level: <b>{cert.level}</b> &nbsp;|&nbsp; Hours:{" "}
            <b>{cert.estimatedHours}</b>
          </div>
          <p style={{ color: "#444", marginBottom: "18px" }}>
            {cert.description}
          </p>
          <div style={{ textAlign: "left", marginBottom: "18px" }}>
            <strong style={{ color: "#ff6804" }}>Requirements:</strong>
            <ul>
              {cert.requirements.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>

          {showCertificateForm && (
            <div style={{ marginTop: "20px" }}>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  padding: "8px",
                  marginRight: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ffd7b3",
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
              <button
                onClick={handleGenerateCertificate}
                style={{
                  background: "#ff6804",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Generate Certificate
              </button>
            </div>
          )}

          <button
            onClick={() => setShowCertificateForm(true)}
            style={{
              background: "#ff6804",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "20px",
              width: "100%",
            }}
          >
            Get Certificate
          </button>

          <Link
            to="/certifications"
            style={{
              color: "#ff6804",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
              display: "block",
              marginTop: "20px",
            }}
          >
            ← Back to list
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default CertificationDetail;
