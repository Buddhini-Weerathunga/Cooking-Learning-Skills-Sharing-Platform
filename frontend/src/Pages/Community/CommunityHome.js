import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { FaExclamationTriangle, FaTrash, FaTimes, FaEdit, FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const CommunityHome = () => {
  const [groups, setGroups] = useState([]);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  const fetchGroups = () => {
    axios.get("http://localhost:8080/api/groups").then((res) => setGroups(res.data));
  };

  useEffect(() => {
    fetchGroups();
    // Listen for the custom event to refresh groups after edit
    const handler = () => fetchGroups();
    window.addEventListener('groupsUpdated', handler);
    // Show success alert if redirected from edit
    if (localStorage.getItem('groupEditSuccess')) {
      setShowEditSuccess(true);
      localStorage.removeItem('groupEditSuccess');
      setTimeout(() => setShowEditSuccess(false), 3000);
    }
    return () => window.removeEventListener('groupsUpdated', handler);
  }, []);

  const handleDelete = (group) => {
    setGroupToDelete(group);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/groups/${groupToDelete.id}`);
      setGroups((prev) => prev.filter((g) => g.id !== groupToDelete.id));
      setShowDeleteModal(false);
      setGroupToDelete(null);
    } catch (error) {
      console.error("Failed to delete group:", error);
      alert("Failed to delete group. Please try again.");
    }
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
                        <button className="btn delete-btn fw-bold" style={{ fontSize: 13, padding: "4px 18px", minWidth: 80 }} onClick={() => handleDelete(g)}>
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header className="modal-header">
          <Modal.Title className="text-danger">
            <FaExclamationTriangle className="me-2" />
            Delete Group
          </Modal.Title>
          <Button 
            variant="link" 
            className="close-btn" 
            onClick={() => setShowDeleteModal(false)}
          >
            <FaTimes />
          </Button>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="warning-icon">
            <FaExclamationTriangle />
          </div>
          <p className="warning-text">
            Are you sure you want to delete <strong>{groupToDelete?.name}</strong>?
          </p>
          <p className="warning-subtext">
            This action cannot be undone. All group content will be permanently deleted.
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button 
            variant="secondary" 
            className="cancel-btn"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            className="confirm-delete-btn"
            onClick={confirmDelete}
          >
            <FaTrash className="me-2" />
            Delete Group
          </Button>
        </Modal.Footer>
      </Modal>

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
        }

        /* Modal Styles */
        .modal-content {
          border-radius: 20px;
          border: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        .modal-header {
          border-bottom: none;
          padding: 1.5rem 1.5rem 0.5rem;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .close-btn {
          color: #666;
          padding: 0.5rem;
          transition: all 0.2s ease;
        }
        .close-btn:hover {
          color: #333;
          transform: rotate(90deg);
        }
        .modal-body {
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .warning-icon {
          font-size: 3rem;
          color: #f44336;
          margin-bottom: 1rem;
        }
        .warning-text {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        .warning-subtext {
          color: #666;
          font-size: 0.9rem;
        }
        .modal-footer {
          border-top: none;
          padding: 1rem 1.5rem 1.5rem;
          justify-content: center;
          gap: 1rem;
        }
        .cancel-btn, .confirm-delete-btn {
          padding: 0.8rem 1.5rem;
          font-weight: 600;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .cancel-btn:hover, .confirm-delete-btn:hover {
          transform: translateY(-2px);
        }
        .confirm-delete-btn {
          background: #f44336;
          border: none;
        }
        .confirm-delete-btn:hover {
          background: #d32f2f;
        }
      `}</style>
    </div>
  );
};

export default CommunityHome;
