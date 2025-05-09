// src/Pages/Certifications/CertificationList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCertifications, deleteCertification } from "./certificationService";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaAward, 
  FaClock, 
  FaUsers,
  FaSearch,
  FaFilter,
  FaSort,
  FaStar,
  FaGraduationCap,
  FaBook,
  FaInfoCircle
} from "react-icons/fa";
import "./Certification.css";
import CertificationNav from '../../Components/CertificationNav';
import 'bootstrap/dist/css/bootstrap.min.css';

function CertificationList() {
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setIsLoading(true);
      const res = await getCertifications();
      setCertifications(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load certifications. Please try again later.");
      console.error("Error fetching certifications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      try {
        await deleteCertification(id);
        fetchCertifications();
      } catch (err) {
        console.error("Error deleting certification:", err);
        alert("Failed to delete certification. Please try again.");
      }
    }
  };

  const filteredCertifications = certifications
    .filter(cert => {
      const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = filterLevel === "all" || cert.level === filterLevel;
      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name":
          return a.title.localeCompare(b.title);
        case "duration":
          return b.estimatedHours - a.estimatedHours;
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="certification-hero">
        <CertificationNav />
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="certification-hero">
      <CertificationNav />
      <div className="certification-container">
        <div className="certification-header">
          <div className="certification-header-content">
            <h1 className="certification-title">Professional Certifications</h1>
            <p className="certification-subtitle">
              Master culinary arts through our comprehensive certification programs
            </p>
            <div className="certification-badges">
              <span className="badge">
                <FaAward className="badge-icon" />
                Industry Recognition
              </span>
              <span className="badge">
                <FaGraduationCap className="badge-icon" />
                Expert-Led Training
              </span>
              <span className="badge">
                <FaBook className="badge-icon" />
                Comprehensive Curriculum
              </span>
            </div>
          </div>
        </div>

        <div className="certification-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="filter-group">
              <FaSort className="sort-icon" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <FaInfoCircle className="error-icon" />
            {error}
          </div>
        )}

        <div className="certification-grid">
          {filteredCertifications.length === 0 ? (
            <div className="empty-state">
              <FaAward className="empty-icon" />
              <h2>No Certifications Found</h2>
              <p>Be the first to create a certification program!</p>
              <Link to="/certifications/create" className="create-button">
                <FaPlus className="button-icon" />
                Create Certification
              </Link>
            </div>
          ) : (
            filteredCertifications.map((cert) => (
              <div key={cert.id} className="certification-card">
                <div className="certification-card-image">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="certification-image"
                  />
                  <div className="certification-level">
                    <FaAward className="level-icon" />
                    {cert.level}
                  </div>
                  {cert.rating && (
                    <div className="certification-rating">
                      <FaStar className="star-icon" />
                      <span>{cert.rating}</span>
                    </div>
                  )}
                </div>
                <div className="certification-card-content">
                  <h2 className="certification-card-title">
                    <Link to={`/certifications/${cert.id}`}>
                      {cert.title}
                    </Link>
                  </h2>
                  <p className="certification-card-description">
                    {cert.description}
                  </p>
                  <div className="certification-card-meta">
                    <span className="meta-item">
                      <FaClock className="meta-icon" />
                      {cert.estimatedHours} Hours
                    </span>
                    <span className="meta-item">
                      <FaUsers className="meta-icon" />
                      {cert.enrolledStudents || 0} Enrolled
                    </span>
                    <span className="meta-item">
                      <FaBook className="meta-icon" />
                      {cert.requirements.length} Requirements
                    </span>
                  </div>
                  <div className="certification-card-actions">
                    <Link to={`/certifications/${cert.id}`} className="view-button">
                      <FaInfoCircle className="button-icon" />
                      View Details
                    </Link>
                    <Link to={`/certifications/edit/${cert.id}`} className="edit-button">
                      <FaEdit className="button-icon" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="delete-button"
                    >
                      <FaTrash className="button-icon" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {certifications.length > 0 && (
          <div className="create-certification">
            <Link to="/certifications/create" className="create-button">
              <FaPlus className="button-icon" />
              Create New Certification
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificationList;
