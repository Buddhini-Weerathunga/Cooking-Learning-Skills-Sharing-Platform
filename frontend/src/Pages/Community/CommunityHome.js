import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, ToastContainer, Toast } from "react-bootstrap";
import { FaTrash, FaEdit, FaEye, FaExclamationTriangle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const CommunityHome = () => {
  const [groups, setGroups] = useState([]);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: null, message: '' });
  const [showToast, setShowToast] = useState(false);
  const [deletePopup, setDeletePopup] = useState({ show: false, group: null });

  const fetchGroups = () => {
    axios.get("http://localhost:8080/api/groups").then((res) => setGroups(res.data));
  };

  useEffect(() => {
    fetchGroups();
    const handler = () => fetchGroups();
    window.addEventListener('groupsUpdated', handler);
    if (localStorage.getItem('groupEditSuccess')) {
      setShowEditSuccess(true);
      localStorage.removeItem('groupEditSuccess');
      setTimeout(() => setShowEditSuccess(false), 3000);
    }
    return () => window.removeEventListener('groupsUpdated', handler);
  }, []);

  const handleDelete = async (group) => {
    setDeletePopup({ show: true, group });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/groups/${deletePopup.group.id}`);
      setGroups((prev) => prev.filter((g) => g.id !== deletePopup.group.id));
      setToastMessage({ 
        type: 'success', 
        message: `"${deletePopup.group.name}" has been deleted successfully` 
      });
      setShowToast(true);
    } catch (error) {
      console.error("Failed to delete group:", error);
      setToastMessage({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to delete group. Please try again.' 
      });
      setShowToast(true);
    }
    setDeletePopup({ show: false, group: null });
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)", paddingTop: "90px" }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold" style={{ color: "#ff9800", letterSpacing: 1 }}>
            <span role="img" aria-label="chef hat" style={{ fontSize: 40, verticalAlign: "middle" }}>
              🍳
            </span>{" "}
            Easy Chef Community Groups
          </h1>
          <p className="lead" style={{ color: "#795548" }}>
            Discover, join, and create groups to share your cooking passion!
          </p>
        </div>
        {showEditSuccess && (
          <div className="alert alert-success text-center fw-bold">Group updated successfully!</div>
        )}
        <div className="d-flex justify-content-end align-items-center mb-4">
          <Link to="/community/groups/create">
            <button className="btn btn-lg btn-warning shadow-sm fw-bold">
              + Create New Group
            </button>
          </Link>
        </div>
        {groups.length === 0 ? (
          <div className="alert alert-info text-center">No groups found. Be the first to create one!</div>
        ) : (
          <div className="row g-4">
            {groups.map((g) => (
              <div className="col-md-6 col-lg-4" key={g.id}>
                <div className="card h-100 shadow group-card" style={{ border: "none", borderRadius: 24, minHeight: 320, transition: "transform 0.2s, box-shadow 0.2s" }}>
                  <div className="card-body d-flex flex-column p-4 group-card-bg">
                    <h5 className="card-title fw-bold" style={{ color: "#ff9800", fontSize: 28 }}>{g.name}</h5>
                    <p className="card-text text-truncate" style={{ color: "#6d4c41", fontSize: 18 }}>{g.description}</p>
                    <span className="badge bg-secondary mb-2 category-badge" style={{ background: "#ffe0b2", color: "#ff9800" }}>{g.category || "No Category"}</span>
                    <div className="mt-auto d-flex flex-column gap-2 align-items-center">
                      <Link to={`/community/groups/${g.id}`} className="btn view-btn mb-1 fw-bold" style={{ fontSize: 16, maxWidth: 220 }}>
                        <FaEye className="me-2" />
                        View Details
                      </Link>
                      <div className="d-flex gap-2 justify-content-center">
                        <Link to={`/community/groups/${g.id}/edit`} className="btn edit-btn fw-bold" style={{ fontSize: 13, padding: "4px 18px", minWidth: 80 }}>
                          <FaEdit className="me-1" />
                          Edit
                        </Link>
                        <button 
                          className="btn delete-btn fw-bold" 
                          style={{ 
                            fontSize: 13, 
                            padding: "4px 18px", 
                            minWidth: 80,
                            transition: 'all 0.2s ease'
                          }} 
                          onClick={() => handleDelete(g)}
                        >
                          <FaTrash className="me-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {deletePopup.show && (
        <div className="delete-popup-overlay">
          <div className="delete-popup">
            <div className="delete-popup-icon">
              <FaExclamationTriangle />
            </div>
            <h4>Delete Group</h4>
            <p>Are you sure you want to delete "{deletePopup.group?.name}"?</p>
            <div className="delete-popup-buttons">
              <button 
                className="cancel-btn"
                onClick={() => setDeletePopup({ show: false, group: null })}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1070 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          bg={toastMessage.type}
          style={{
            minWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '12px',
            border: 'none'
          }}
        >
          <Toast.Header 
            closeButton={false} 
            style={{ 
              borderRadius: '12px 12px 0 0',
              background: toastMessage.type === 'success' ? '#4caf50' : '#f44336',
              color: '#fff',
              border: 'none'
            }}
          >
            <strong className="me-auto">
              {toastMessage.type === 'success' ? '✅ Success' : '❌ Error'}
            </strong>
          </Toast.Header>
          <Toast.Body 
            style={{ 
              color: '#fff',
              background: toastMessage.type === 'success' ? '#66bb6a' : '#ef5350',
              borderRadius: '0 0 12px 12px',
              padding: '12px 16px',
              fontSize: '15px'
            }}
          >
            {toastMessage.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <style>{`
        .group-card {
          /* ...existing styles... */
        }
        .group-card-bg {
          background: #ffe0b2 !important;
          border-radius: 18px !important;
          border: 1.5px solid #ffb74d !important;
        }
        .group-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 32px 0 rgba(255, 152, 0, 0.15);
        }
        .category-badge {
          font-size: 18px !important;
          padding: 10px 26px !important;
          border-radius: 14px !important;
          font-weight: 600 !important;
        }
        .view-btn {
          background: #ff9800 !important;
          color: #fff !important;
          border: none !important;
        }
        .view-btn:hover {
          background: #f57c00 !important;
          color: #fff !important;
        }
        .edit-btn {
          background: #0288d1 !important;
          color: #fff !important;
          border: none !important;
        }
        .edit-btn:hover {
          background: #01579b !important;
          color: #fff !important;
        }
        .delete-btn {
          background: #d32f2f !important;
          color: #fff !important;
          border: none !important;
        }
        .delete-btn:hover {
          background: #b71c1c !important;
          color: #fff !important;
          transform: translateY(-2px);
        }
        .delete-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1080;
          animation: fadeIn 0.2s ease;
        }
        .delete-popup {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          text-align: center;
          max-width: 400px;
          width: 90%;
          animation: slideUp 0.3s ease;
        }
        .delete-popup-icon {
          font-size: 48px;
          color: #ff9800;
          margin-bottom: 1rem;
        }
        .delete-popup h4 {
          color: #d32f2f;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .delete-popup p {
          color: #6d4c41;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }
        .delete-popup-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .delete-popup-buttons button {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cancel-btn {
          background: #ff9800;
          color: white;
        }
        .cancel-btn:hover {
          background: #f57c00;
          transform: translateY(-2px);
        }
        .confirm-delete-btn {
          background: #d32f2f;
          color: white;
        }
        .confirm-delete-btn:hover {
          background: #b71c1c;
          transform: translateY(-2px);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CommunityHome;
