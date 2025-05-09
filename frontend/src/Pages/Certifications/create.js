// src/Pages/Certifications/CertificationCreate.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createCertification } from "./certificationService";
import { FaPlus, FaTrash, FaClock, FaGraduationCap, FaAward, FaArrowLeft, FaCheckCircle, FaInfoCircle, FaBook, FaImage } from "react-icons/fa";
import "./Certification.css";
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

const certificationImages = {
  "Professional Chef Certification": "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Pastry Arts Certification": "https://images.unsplash.com/photo-1558326567-98ae2405596b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Culinary Arts Fundamentals": "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "International Cuisine Specialist": "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Baking and Pastry Master": "https://images.unsplash.com/photo-1608198093002-ad4e505484ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Food Safety and Hygiene": "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Restaurant Management": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Wine and Beverage Service": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Cake Decorating Professional": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Healthy Cooking Specialist": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Italian Cuisine Expert": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Asian Cuisine Master": "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Mediterranean Cooking": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Vegan and Vegetarian Cooking": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "Food Photography and Styling": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
};

function CertificationCreate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "Beginner",
    imageUrl: "",
    estimatedHours: 0,
    requirements: [""],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!form.title?.trim()) newErrors.title = "Title is required";
      if (!form.description?.trim()) newErrors.description = "Description is required";
      if (!form.imageUrl?.trim()) newErrors.imageUrl = "Image URL is required";
      if (!form.estimatedHours || form.estimatedHours <= 0) {
        newErrors.estimatedHours = "Hours must be greater than 0";
      }
    } else if (step === 2) {
      if (form.requirements?.some(req => !req?.trim())) {
        newErrors.requirements = "All requirements must be filled";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleRequirementChange = (idx, value) => {
    const reqs = [...form.requirements];
    reqs[idx] = value;
    setForm(prev => ({ ...prev, requirements: reqs }));
    if (errors.requirements) {
      setErrors(prev => ({ ...prev, requirements: null }));
    }
  };

  const addRequirement = () => {
    setForm(prev => ({ ...prev, requirements: [...prev.requirements, ""] }));
  };

  const removeRequirement = (idx) => {
    const reqs = form.requirements.filter((_, i) => i !== idx);
    setForm(prev => ({ ...prev, requirements: reqs }));
  };

  const handleTitleChange = (e) => {
    const selectedTitle = e.target.value;
    setForm(prev => ({
      ...prev,
      title: selectedTitle,
      imageUrl: certificationImages[selectedTitle] || ""
    }));
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: null }));
    }
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;

    try {
      setIsSubmitting(true);
      await createCertification(form);
      navigate("/certifications");
    } catch (error) {
      console.error("Failed to create certification:", error);
      setErrors(prev => ({ ...prev, submit: "Failed to create certification" }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="certification-hero">
      <div className="certification-container">
        <CertificationNav />
        <div className="certification-header">
          <div className="certification-header-content">
            <div className="certification-breadcrumb">
              <Link to="/certifications">Certifications</Link>
              <span> / </span>
              <span>Create New</span>
            </div>
            <h1 className="certification-title">Create New Certification</h1>
            <p className="certification-subtitle">
              Design a comprehensive cooking certification program that helps students master professional culinary skills
            </p>
          </div>
        </div>

        {errors.submit && (
          <div className="error-message">
            <FaAward className="error-icon" />
            {errors.submit}
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
            <div className="form-section">
              <h3 className="section-title">
                <FaInfoCircle className="section-icon" />
                Basic Information
              </h3>
              <div className="form-group">
                <label htmlFor="title">Certification Title</label>
                <select
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  className={errors.title ? "input-error" : ""}
                >
                  <option value="">Select a certification title</option>
                  {certificationTitles.map((title, index) => (
                    <option key={index} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of the certification program"
                  className={errors.description ? "input-error" : ""}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="level">
                    <FaGraduationCap className="input-icon" />
                    Difficulty Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="estimatedHours">
                    <FaClock className="input-icon" />
                    Estimated Duration
                  </label>
                  <input
                    id="estimatedHours"
                    name="estimatedHours"
                    type="number"
                    min="1"
                    value={form.estimatedHours}
                    onChange={handleChange}
                    placeholder="Enter estimated completion time in hours"
                    className={errors.estimatedHours ? "input-error" : ""}
                  />
                  {errors.estimatedHours && <span className="error-message">{errors.estimatedHours}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">
                  <FaImage className="input-icon" />
                  Cover Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL will be set automatically based on the selected title"
                  className={errors.imageUrl ? "input-error" : ""}
                  readOnly
                />
                {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="next-button"
                  disabled={isSubmitting}
                >
                  Next Step
                  <FaArrowLeft className="button-icon" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="form-section">
              <h3 className="section-title">
                <FaBook className="section-icon" />
                Program Requirements
              </h3>
              <div className="form-group">
                <label>Learning Requirements</label>
                {form.requirements.map((req, idx) => (
                  <div key={idx} className="requirement-input-group">
                    <input
                      value={req}
                      onChange={(e) => handleRequirementChange(idx, e.target.value)}
                      placeholder="Enter a specific requirement or learning objective"
                      className={errors.requirements ? "input-error" : ""}
                    />
                    <button
                      type="button"
                      onClick={() => removeRequirement(idx)}
                      disabled={form.requirements.length === 1}
                      className="remove-requirement-btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                {errors.requirements && <span className="error-message">{errors.requirements}</span>}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="add-requirement-btn"
                >
                  <FaPlus /> Add Requirement
                </button>
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep} className="back-button">
                  <FaArrowLeft className="button-icon" />
                  Previous Step
                </button>
                <button type="button" onClick={nextStep} className="next-button">
                  Next Step
                  <FaArrowLeft className="button-icon" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="form-section">
              <h3 className="section-title">
                <FaCheckCircle className="section-icon" />
                Review & Submit
              </h3>
              <div className="review-section">
                <div className="review-item">
                  <h4>Certification Details</h4>
                  <p><strong>Title:</strong> {form.title}</p>
                  <p><strong>Level:</strong> {form.level}</p>
                  <p><strong>Duration:</strong> {form.estimatedHours} hours</p>
                </div>
                <div className="review-item">
                  <h4>Description</h4>
                  <p>{form.description}</p>
                </div>
                <div className="review-item">
                  <h4>Requirements</h4>
                  <ul>
                    {form.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep} className="back-button">
                  <FaArrowLeft className="button-icon" />
                  Previous Step
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  {isSubmitting ? (
                    <span className="button-content">
                      <div className="button-spinner"></div>
                      Creating Certification...
                    </span>
                  ) : (
                    <span className="button-content">
                      <FaCheckCircle className="button-icon" />
                      Create Certification
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CertificationCreate;
