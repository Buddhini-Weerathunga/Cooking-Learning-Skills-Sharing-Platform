import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Button, Alert, Modal } from 'react-bootstrap';

const GroupDetail = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/groups/${groupId}`);
        setGroup(res.data);
        setError(null);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Group not found. It may have been deleted or never existed.');
        } else {
          setError('Failed to load group. Please try again later.');
        }
      }
    };
    fetchGroup();
  }, [groupId]);

  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/groups/${groupId}`);
      navigate("/community");
    } catch (err) {
      setError('Failed to delete group. Please try again later.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate("/community")}>
          Return to Groups
        </Button>
      </Container>
    );
  }

  if (!group) return <div>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)", paddingTop: "60px" }}>
      <Container className="py-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg" style={{ borderRadius: 24 }}>
              <div className="card-body p-5">
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#ff9800', fontSize: 38 }}>{group.name}</h2>
                <div className="mb-3 text-center">
                  <span className="badge" style={{ background: '#ff9800', color: '#fff', fontSize: 20, padding: '10px 28px', borderRadius: 14, fontWeight: 600 }}>{group.category || 'No Category'}</span>
                </div>
                <p className="mb-4" style={{ fontSize: 22, color: '#6d4c41' }}>{group.description}</p>
                <div className="mb-3">
                  <strong style={{ fontSize: 20 }}>Rules:</strong>
                  <div style={{ color: '#795548', fontSize: 18 }}>{group.groupRules || 'No rules specified.'}</div>
                </div>
                <div className="mb-3">
                  <strong style={{ fontSize: 20 }}>Private:</strong> {group.privateGroup ? <span style={{ color: '#d84315', fontSize: 18 }}>Yes</span> : <span style={{ color: '#388e3c', fontSize: 18 }}>No</span>}
                </div>
                <div className="mb-4">
                  <strong style={{ fontSize: 20 }}>Members:</strong> <span style={{ color: '#6d4c41', fontSize: 18 }}>{group.memberCount}</span>
                </div>
                <div className="d-flex gap-3 justify-content-center">
                  <Link to={`/community/groups/${groupId}/edit`}>
                    <Button className="edit-btn" style={{ background: '#0288d1', border: 'none', fontWeight: 600, fontSize: 17, padding: '10px 32px' }}>Edit</Button>
                  </Link>
                  <Button className="delete-btn" style={{ background: '#d32f2f', border: 'none', fontWeight: 600, fontSize: 17, padding: '10px 32px' }} onClick={handleDelete}>Delete</Button>
                  <Button className="back-btn" style={{ background: '#ffb300', color: '#fff', border: 'none', fontWeight: 600, fontSize: 17, padding: '10px 32px' }} onClick={() => navigate('/community/groups')}>Back to Groups</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Body style={{ borderRadius: 20, background: '#fff8f0', textAlign: 'center', padding: '2.5rem 2rem' }}>
          <div style={{ fontSize: 48, color: '#ff9800', marginBottom: 16 }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h4 style={{ color: '#d32f2f', fontWeight: 700, marginBottom: 12 }}>Delete Group?</h4>
          <p style={{ color: '#6d4c41', fontSize: 18, marginBottom: 28 }}>
            Are you sure you want to delete this group? This action cannot be undone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button onClick={() => setShowDeleteModal(false)} style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 17, borderRadius: 10, padding: '10px 32px' }}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} style={{ background: '#d32f2f', border: 'none', fontWeight: 600, fontSize: 17, borderRadius: 10, padding: '10px 32px' }}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <style>{`
        .edit-btn:hover {
          background: #01579b !important;
          color: #fff !important;
        }
        .delete-btn:hover {
          background: #b71c1c !important;
          color: #fff !important;
        }
        .back-btn:hover {
          background: #ff9800 !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default GroupDetail; 