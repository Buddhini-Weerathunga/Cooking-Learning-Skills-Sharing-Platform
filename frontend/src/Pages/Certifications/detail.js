import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCertification, generateCertificate, deleteCertification } from "./certificationService";
import { 
  FaClock, 
  FaGraduationCap, 
  FaAward, 
  FaCheckCircle, 
  FaInfoCircle, 
  FaBook,
  FaUsers,
  FaStar,
  FaCalendarAlt,
  FaUserGraduate,
  FaCertificate,
  FaDownload,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import "./Certification.css";
import CertificationNav from '../../Components/CertificationNav';

function CertificationDetail() {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userId] = useState(localStorage.getItem("userId") || "");
  const [fullName, setFullName] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    getCertification(id).then((res) => setCert(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      try {
        await deleteCertification(id);
        window.location.href = "/certifications";
      } catch (error) {
        console.error("Error deleting certification:", error);
        alert("Failed to delete certification. Please try again.");
      }
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      setIsGenerating(true);
      const response = await generateCertificate(userId, id, fullName);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      localStorage.setItem(`certificate_${id}`, response.data);
    } catch (error) {
      console.error("Certificate generation failed:", error);
      alert("Certificate generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!cert) {
    return (
      <div className="certification-hero">
        <div className="certification-container">
          <CertificationNav />
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="certification-hero">
      <div className="certification-container">
        <CertificationNav />
        <div className="certification-detail">
          <div className="detail-header">
            <div className="certification-breadcrumb">
              <Link to="/certifications">Certifications</Link>
              <span> / </span>
              <span>{cert.title}</span>
            </div>
            <div className="detail-title-container">
              <h1 className="detail-title">{cert.title}</h1>
              <div className="detail-actions">
                <Link to={`/certifications/edit/${id}`} className="action-icon edit">
                  <FaEdit />
                </Link>
                <button onClick={handleDelete} className="action-icon delete">
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="detail-meta">
              <div className="meta-item">
                <FaAward className="meta-icon" />
                {cert.level}
              </div>
              <div className="meta-item">
                <FaClock className="meta-icon" />
                {cert.estimatedHours} Hours
              </div>
              <div className="meta-item">
                <FaUsers className="meta-icon" />
                {cert.enrolledStudents || 0} Enrolled
              </div>
              <div className="meta-item">
                <FaStar className="meta-icon" />
                {cert.rating || "4.5"} Rating
              </div>
            </div>
          </div>

          <div className="detail-content">
            <div className="detail-main">
              <div className="certification-tabs">
                <button 
                  className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FaInfoCircle className="tab-icon" />
                  Overview
                </button>
                <button 
                  className={`tab-button ${activeTab === 'requirements' ? 'active' : ''}`}
                  onClick={() => setActiveTab('requirements')}
                >
                  <FaCheckCircle className="tab-icon" />
                  Requirements
                </button>
                <button 
                  className={`tab-button ${activeTab === 'curriculum' ? 'active' : ''}`}
                  onClick={() => setActiveTab('curriculum')}
                >
                  <FaGraduationCap className="tab-icon" />
                  Curriculum
                </button>
              </div>

              {activeTab === 'overview' && (
                <div className="overview-section">
                  <h3 className="section-title">
                    <FaInfoCircle className="section-icon" />
                    About This Certification
                  </h3>
                  <p className="description-text">{cert.description}</p>
                  
                  <div className="certification-highlights">
                    <h4>What You'll Learn</h4>
                    <ul className="highlights-list">
                      {cert.requirements.slice(0, 4).map((r, idx) => (
                        <li key={idx}>
                          <FaCheckCircle className="highlight-icon" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div className="requirements-section">
                  <h3 className="section-title">
                    <FaCheckCircle className="section-icon" />
                    Certification Requirements
                  </h3>
                  <div className="requirements-grid">
                    {cert.requirements.map((r, idx) => (
                      <div key={idx} className="requirement-card">
                        <FaCheckCircle className="requirement-icon" />
                        <p>{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="curriculum-section">
                  <h3 className="section-title">
                    <FaGraduationCap className="section-icon" />
                    Course Curriculum
                  </h3>
                  <div className="curriculum-timeline">
                    {cert.requirements.map((r, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-number">{idx + 1}</div>
                        <div className="timeline-content">
                          <h4>Module {idx + 1}</h4>
                          <p>{r}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="detail-sidebar">
              <div className="sidebar-card">
                <div className="certification-image-container">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="certification-image"
                  />
                  <div className="certification-rating">
                    <FaStar className="star-icon" />
                    <span>{cert.rating || "4.5"}</span>
                  </div>
                </div>

                <div className="certification-quick-info">
                  <div className="info-item">
                    <FaCalendarAlt className="info-icon" />
                    <div className="info-content">
                      <h4>Duration</h4>
                      <p>{cert.estimatedHours} Hours</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaUserGraduate className="info-icon" />
                    <div className="info-content">
                      <h4>Level</h4>
                      <p>{cert.level}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaBook className="info-icon" />
                    <div className="info-content">
                      <h4>Requirements</h4>
                      <p>{cert.requirements.length} Items</p>
                    </div>
                  </div>
                </div>

                {!showCertificateForm ? (
                  <button
                    onClick={() => setShowCertificateForm(true)}
                    className="detail-button primary"
                  >
                    <FaCertificate className="button-icon" />
                    Get Your Certificate
                  </button>
                ) : (
                  <div className="certificate-form">
                    <h3 className="sidebar-title">
                      <FaCertificate className="section-icon" />
                      Generate Your Certificate
                    </h3>
                    <div className="form-content">
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="name-input"
                      />
                      <button
                        onClick={handleGenerateCertificate}
                        className="generate-certificate-btn"
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <div className="loading-spinner"></div>
                        ) : (
                          <>
                            <FaDownload className="button-icon" />
                            Generate Certificate
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {showSuccess && (
                  <div className="success-message">
                    <FaCertificate className="success-icon" />
                    Certificate generated successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificationDetail;
