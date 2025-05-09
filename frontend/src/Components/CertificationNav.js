import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaList } from 'react-icons/fa';
import './CertificationNav.css';

const CertificationNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="certification-nav">
      <div className="nav-container">
        <Link to="/certifications" className={`nav-item ${isActive('/certifications') ? 'active' : ''}`}>
          <FaList className="nav-icon" />
          <span>All Certifications</span>
        </Link>
        <Link to="/certifications/create" className={`nav-item ${isActive('/certifications/create') ? 'active' : ''}`}>
          <FaPlus className="nav-icon" />
          <span>Create New</span>
        </Link>
        <Link to="/" className="nav-item">
          <FaHome className="nav-icon" />
          <span>Home</span>
        </Link>
      </div>
    </nav>
  );
};

export default CertificationNav; 