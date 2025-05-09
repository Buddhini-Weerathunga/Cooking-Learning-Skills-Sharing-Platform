import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCertification, updateCertification } from './certificationService';
import { FaSave, FaPlus, FaTrash, FaClock, FaGraduationCap, FaAward, FaCheckCircle, FaInfoCircle, FaBook } from 'react-icons/fa';
import './Certification.css';
import CertificationNav from '../../Components/CertificationNav';

const certificationTitles = [
  "Professional Chef Certification",
  "Pastry Arts Certification",
  "Culinary Arts Fundamentals",
  "International Cuisine Specialist",
  "Baking and Pastry Master",
  "Food Safety and Hygiene",
  "Restaurant Management",
  "Wine and Beverage Service",
  "Cake Decorating Professional",
  "Healthy Cooking Specialist",
  "Italian Cuisine Expert",
  "Asian Cuisine Master",
  "Mediterranean Cooking",
  "Vegan and Vegetarian Cooking",
  "Food Photography and Styling"
];

const EditCertification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "Beginner",
    imageUrl: "",
    estimatedHours: 0,
    requirements: [""],
  });
  const [activeStep, setActiveStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});

  const fetchCertification = useCallback(async () => {
    try {
      const response = await getCertification(id);
      const data = response.data;
      setFormData({
        title: data.title || "",
        description: data.description || "",
        level: data.level || "Beginner",
        imageUrl: data.imageUrl || "",
        estimatedHours: data.estimatedHours || 0,
        requirements: data.requirements?.length ? data.requirements : [""],
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCertification();
  }, [fetchCertification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleRequirementChange = (idx, value) => {
    const reqs = [...formData.requirements];
    reqs[idx] = value;
    setFormData(prev => ({ ...prev, requirements: reqs }));
    // Clear requirements validation error
    if (validationErrors.requirements) {
      setValidationErrors(prev => ({ ...prev, requirements: null }));
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({ ...prev, requirements: [...prev.requirements, ""] }));
  };

  const removeRequirement = (idx) => {
    const reqs = formData.requirements.filter((_, i) => i !== idx);
    setFormData(prev => ({ ...prev, requirements: reqs }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title?.trim()) errors.title = "Title is required";
    if (!formData.description?.trim()) errors.description = "Description is required";
    if (!formData.imageUrl?.trim()) errors.imageUrl = "Image URL is required";
    if (!formData.estimatedHours || formData.estimatedHours <= 0) {
      errors.estimatedHours = "Hours must be greater than 0";
    }
    if (formData.requirements?.some(req => !req?.trim())) {
      errors.requirements = "All requirements must be filled";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateCertification(id, formData);
      navigate("/certifications");
    } catch (err) {
      setError("Failed to update certification. Please try again.");
      console.error("Error updating certification:", err);
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setActiveStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setActiveStep(prev => prev - 1);
  };

  if (loading) {
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
        <div className="certification-header">
          <div className="certification-header-content">
            <h1 className="certification-title">Edit Certification</h1>
            <p className="certification-subtitle">
              Update your cooking certification program details
            </p>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <FaAward className="error-icon" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="certification-form">
          <div className="form-progress">
            <div className={`progress-step ${activeStep >= 1 ? 'active' : ''}`}>
              <FaInfoCircle className="step-icon" />
              <span>Basic Information</span>
            </div>
            <div className={`progress-step ${activeStep >= 2 ? 'active' : ''}`}>
              <FaBook className="step-icon" />
              <span>Requirements</span>
            </div>
            <div className={`progress-step ${activeStep >= 3 ? 'active' : ''}`}>
              <FaCheckCircle className="step-icon" />
              <span>Review & Submit</span>
            </div>
          </div>

          {activeStep === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label>
                  <FaInfoCircle className="input-icon" />
                  Certification Title
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={validationErrors.title ? 'error' : ''}
                >
                  <option value="">Select a certification title</option>
                  {certificationTitles.map((title, index) => (
                    <option key={index} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
                {validationErrors.title && (
                  <span className="error-message">{validationErrors.title}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FaInfoCircle className="input-icon" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter certification description"
                  className={validationErrors.description ? 'error' : ''}
                />
                {validationErrors.description && (
                  <span className="error-message">{validationErrors.description}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FaGraduationCap className="input-icon" />
                  Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <FaInfoCircle className="input-icon" />
                  Image URL
                </label>
                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className={validationErrors.imageUrl ? 'error' : ''}
                />
                {validationErrors.imageUrl && (
                  <span className="error-message">{validationErrors.imageUrl}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FaClock className="input-icon" />
                  Estimated Hours
                </label>
                <input
                  name="estimatedHours"
                  type="number"
                  value={formData.estimatedHours}
                  onChange={handleChange}
                  placeholder="Enter estimated hours"
                  className={validationErrors.estimatedHours ? 'error' : ''}
                />
                {validationErrors.estimatedHours && (
                  <span className="error-message">{validationErrors.estimatedHours}</span>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => navigate("/certifications")} className="cancel-button">
                  <FaSave className="button-icon" />
                  Cancel
                </button>
                <button type="button" onClick={nextStep} className="next-button">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label>
                  <FaBook className="input-icon" />
                  Requirements
                </label>
                {formData.requirements.map((req, idx) => (
                  <div key={idx} className="requirement-input-group">
                    <input
                      value={req}
                      onChange={(e) => handleRequirementChange(idx, e.target.value)}
                      placeholder={`Requirement ${idx + 1}`}
                      className={validationErrors.requirements ? 'error' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => removeRequirement(idx)}
                      disabled={formData.requirements.length === 1}
                      className="remove-requirement-btn"
                    >
                      <FaTrash className="button-icon" />
                    </button>
                  </div>
                ))}
                {validationErrors.requirements && (
                  <span className="error-message">{validationErrors.requirements}</span>
                )}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="add-requirement-btn"
                >
                  <FaPlus className="button-icon" />
                  Add Requirement
                </button>
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep} className="back-button">
                  Previous Step
                </button>
                <button type="button" onClick={nextStep} className="next-button">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="form-step">
              <div className="review-section">
                <h3>Review Certification Details</h3>
                <div className="review-content">
                  <div className="review-item">
                    <strong>Title:</strong>
                    <span>{formData.title}</span>
                  </div>
                  <div className="review-item">
                    <strong>Description:</strong>
                    <span>{formData.description}</span>
                  </div>
                  <div className="review-item">
                    <strong>Level:</strong>
                    <span>{formData.level}</span>
                  </div>
                  <div className="review-item">
                    <strong>Estimated Hours:</strong>
                    <span>{formData.estimatedHours}</span>
                  </div>
                  <div className="review-item">
                    <strong>Requirements:</strong>
                    <ul>
                      {formData.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep} className="back-button">
                  Previous Step
                </button>
                <button type="submit" className="submit-button">
                  <FaCheckCircle className="button-icon" />
                  Update Certification
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditCertification;
