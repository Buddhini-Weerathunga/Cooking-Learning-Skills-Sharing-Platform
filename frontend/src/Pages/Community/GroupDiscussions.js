import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Dropdown, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import DiscussionForm from './components/DiscussionForm';

const GroupDiscussions = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [discussions, setDiscussions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDiscussions();
  }, [groupId]);

  const fetchDiscussions = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/groups/${groupId}/discussions`);
      setDiscussions(res.data);
    } catch (err) {
      setError('Failed to load discussions.');
    }
  };

  const handleCreateDiscussion = async (formData) => {
    try {
      await axios.post(`http://localhost:8080/api/groups/${groupId}/discussions`, formData);
      fetchDiscussions();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create discussion.');
    }
  };

  const handleUpdateDiscussion = async (formData) => {
    try {
      await axios.put(`http://localhost:8080/api/groups/${groupId}/discussions/${editingDiscussion.id}`, formData);
      fetchDiscussions();
      setShowForm(false);
      setEditingDiscussion(null);
    } catch (err) {
      setError('Failed to update discussion.');
    }
  };

  const handleDeleteDiscussion = async (discussionId) => {
    if (window.confirm('Are you sure you want to delete this discussion?')) {
      try {
        await axios.delete(`http://localhost:8080/api/groups/${groupId}/discussions/${discussionId}`);
        fetchDiscussions();
      } catch (err) {
        setError('Failed to delete discussion.');
      }
    }
  };

  // Comments/replies logic
  const handleOpenDetail = (discussion) => {
    setSelectedDiscussion(discussion);
    setShowDetail(true);
  };
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    // For now, just append locally. Replace with backend call if you have an endpoint.
    setSelectedDiscussion((prev) => ({
      ...prev,
      replies: [...(prev.replies || []), { author: 'Current User', content: comment, createdAt: new Date().toISOString() }]
    }));
    setComment('');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)', paddingTop: '120px' }}>
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: '#ff9800', fontSize: 38, letterSpacing: 1 }}>
            <span role="img" aria-label="chat" style={{ fontSize: 40, verticalAlign: 'middle' }}>💬</span> Group Discussions
          </h1>
          <p className="lead" style={{ color: '#795548' }}>
            Share your thoughts, ask questions, and connect with the community!
          </p>
        </div>
        <Button 
          style={{ background: '#757575', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 10, padding: '8px 24px', marginBottom: 24 }}
          onClick={() => navigate(`/community/groups/${groupId}`)}
        >
          ← Back to Group
        </Button>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold" style={{ color: '#ff9800', fontSize: 28, margin: 0 }}>All Discussions</h2>
          <Button 
            style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 12, padding: '10px 28px', boxShadow: '0 2px 8px 0 rgba(255,152,0,0.10)' }}
            onClick={() => setShowForm(true)}
            className="start-discussion-btn"
          >
            + Start New Discussion
          </Button>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="row g-4">
          {discussions.map(discussion => (
            <div className="col-md-6 col-lg-4" key={discussion.id}>
              <Card className="h-100 shadow discussion-card" style={{ border: 'none', borderRadius: 20, minHeight: 220, background: '#fff8f0', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="fw-bold" style={{ color: '#ff9800', fontSize: 22, cursor: 'pointer' }} onClick={() => handleOpenDetail(discussion)}>
                      {discussion.title}
                    </Card.Title>
                    <Dropdown>
                      <Dropdown.Toggle variant="link" id={`discussion-${discussion.id}-actions`}>
                        ⋮
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                          setEditingDiscussion(discussion);
                          setShowForm(true);
                        }}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={() => handleDeleteDiscussion(discussion.id)}
                          className="text-danger"
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <Card.Text style={{ color: '#6d4c41', fontSize: 16 }}>{discussion.content}</Card.Text>
                  {discussion.tags?.length > 0 && (
                    <div className="mb-2">
                      {discussion.tags.map(tag => (
                        <span key={tag} className="badge bg-secondary me-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto text-end">
                    <span className="text-muted" style={{ fontSize: 14 }}>
                      Posted by {discussion.author} on {new Date(discussion.createdAt).toLocaleDateString()}
                      {discussion.updatedAt && ' (edited)'}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        <DiscussionForm
          show={showForm}
          handleClose={() => {
            setShowForm(false);
            setEditingDiscussion(null);
          }}
          handleSubmit={editingDiscussion ? handleUpdateDiscussion : handleCreateDiscussion}
          initialData={editingDiscussion}
        />

        {/* Discussion Detail Modal with Comments/Replies */}
        <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg" centered>
          <Modal.Header closeButton style={{ background: '#fff8f0', borderBottom: '2px solid #ffb74d' }}>
            <Modal.Title style={{ color: '#ff9800', fontWeight: 700 }}>{selectedDiscussion?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#fffdf7' }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#ff9800', fontWeight: 600 }}>{selectedDiscussion?.author}</div>
              <div className="text-muted mb-2" style={{ fontSize: 14 }}>
                {selectedDiscussion?.createdAt && new Date(selectedDiscussion.createdAt).toLocaleString()}
              </div>
              <div style={{ fontSize: 18 }}>{selectedDiscussion?.content}</div>
            </div>
            <hr />
            <h5 style={{ color: '#ff9800', fontWeight: 700 }}>Replies</h5>
            <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 12 }}>
              {(selectedDiscussion?.replies || []).length === 0 && <div className="text-muted">No replies yet.</div>}
              {(selectedDiscussion?.replies || []).map((reply, idx) => (
                <div key={idx} style={{ marginBottom: 10, padding: 10, background: '#fff7e6', borderRadius: 8 }}>
                  <div style={{ fontWeight: 600, color: '#388e3c' }}>{reply.author}</div>
                  <div style={{ fontSize: 15 }}>{reply.content}</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>{new Date(reply.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <Form className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Add a reply..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                style={{ borderRadius: 8, border: '1.5px solid #ffb74d', fontSize: 16 }}
              />
              <Button 
                variant="warning" 
                style={{ fontWeight: 600, borderRadius: 8, fontSize: 16, background: '#ff9800', border: 'none', padding: '8px 18px' }}
                onClick={handleAddComment}
              >
                Reply
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <style>{`
          .discussion-card:hover {
            transform: translateY(-6px) scale(1.03);
            box-shadow: 0 8px 32px 0 rgba(255, 152, 0, 0.15);
          }
          .start-discussion-btn:hover {
            background: #e65100 !important;
            color: #fff !important;
          }
        `}</style>
      </Container>
    </div>
  );
};

export default GroupDiscussions; 