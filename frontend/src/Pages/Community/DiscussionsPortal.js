import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Image, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { FaPlus, FaUser, FaCalendarAlt, FaTag, FaComments, FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import './DiscussionsPortal.css';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "http://localhost:8080";

function getAvatarSrc(avatar) {
  if (!avatar) return require('../../assets/images/avatars/default-avatar.jpeg');
  if (avatar.startsWith('http')) return avatar;
  if (avatar.startsWith('/uploads/')) return BACKEND_URL + avatar;
  return require('../../assets/images/avatars/default-avatar.jpeg');
}

const DiscussionsPortal = () => {
  const [discussions, setDiscussions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', author: '', tags: '', avatar: '', category: '', date: '' });
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [reply, setReply] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: '', message: '' });
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState({});
  const [deletePopup, setDeletePopup] = useState({ show: false, discussion: null });

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/discussions`);
      setDiscussions(response.data);
    } catch (err) {
      setError('Failed to fetch discussions');
      console.error('Error fetching discussions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (discussion = null) => {
    setEditingDiscussion(discussion);
    setForm(discussion ? {
      title: discussion.title,
      content: discussion.content,
      author: discussion.author || '',
      tags: Array.isArray(discussion.tags) ? discussion.tags.join(', ') : (discussion.tags || ''),
      avatar: discussion.avatar || '',
      category: discussion.category || '',
      date: discussion.date ? (typeof discussion.date === 'string' ? discussion.date : (discussion.date.toISOString ? discussion.date.toISOString().split('T')[0] : '')) : ''
    } : { title: '', content: '', author: '', tags: '', avatar: '', category: '', date: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert tags to comma-separated string for backend
      const tagsString = form.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
        .join(',');
      const payload = {
        ...form,
        tags: tagsString,
        date: form.date || new Date().toISOString().split('T')[0],
      };
      if (editingDiscussion) {
        await axios.put(`${BACKEND_URL}/api/discussions/${editingDiscussion.id}`, payload);
      } else {
        await axios.post(`${BACKEND_URL}/api/discussions`, payload);
      }
      fetchDiscussions();
      setShowModal(false);
      setEditingDiscussion(null);
      setForm({ title: '', content: '', author: '', tags: '', avatar: '', category: '', date: '' });
    } catch (err) {
      setError('Failed to save discussion');
      console.error('Error saving discussion:', err);
    }
  };

  const handleDelete = async (discussion) => {
    setDeletePopup({ show: true, discussion });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/discussions/${deletePopup.discussion.id}`);
      setDiscussions((prev) => prev.filter((d) => d.id !== deletePopup.discussion.id));
      setToastMessage({ 
        type: 'success', 
        message: `"${deletePopup.discussion.title}" has been deleted successfully` 
      });
      setShowToast(true);
    } catch (error) {
      console.error("Failed to delete discussion:", error);
      setToastMessage({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to delete discussion. Please try again.' 
      });
      setShowToast(true);
    }
    setDeletePopup({ show: false, discussion: null });
  };

  const openDetail = (discussion) => {
    setSelectedDiscussion(discussion);
    setShowDetail(true);
    setReply('');
  };

  const handleAddReply = async () => {
    if (!reply.trim()) return;
    try {
      await axios.post(`${BACKEND_URL}/api/discussions/${selectedDiscussion.id}/replies`, {
        content: reply
      });
      fetchDiscussions();
      setReply('');
    } catch (err) {
      setError('Failed to add reply');
      console.error('Error adding reply:', err);
    }
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)', paddingTop: '60px' }}>
      <Container className="py-5">
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1070 }}>
          <Toast 
            show={showToast} 
            onClose={() => setShowToast(false)} 
            delay={3000} 
            autohide
            bg={toastMessage.type}
            style={{
              minWidth: '250px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '12px'
            }}
          >
            <Toast.Header closeButton={false} style={{ borderRadius: '12px 12px 0 0' }}>
              <strong className="me-auto">
                {toastMessage.type === 'success' ? '✅ Success' : '❌ Error'}
              </strong>
            </Toast.Header>
            <Toast.Body style={{ color: toastMessage.type === 'success' ? '#fff' : '#fff' }}>
              {toastMessage.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <style>{`
          .discussion-card-animated {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .discussion-card-animated:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 16px 48px rgba(33, 150, 243, 0.2);
          }
          .discussion-title:hover {
            color: #1976d2;
          }
          .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: '#ff9800', fontSize: 38, letterSpacing: 1 }}>
            <span role="img" aria-label="discussion" style={{ fontSize: 40, verticalAlign: 'middle' }}>💬</span> Easy Chef Community Discussions
          </h1>
          <p className="lead" style={{ color: '#795548', fontSize: 20, fontStyle: 'italic', fontWeight: 500 }}>
            Ask questions, share tips, and help each other grow as bakers!
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold" style={{ color: '#ff9800', fontSize: 28, margin: 0 }}>All Discussions</h2>
          <Button
            style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 12, padding: '10px 28px' }}
            onClick={() => navigate('/community/discussions/new')}
            disabled={isLoading}
          >
            + Start Discussion
          </Button>
        </div>

        {successMessage && (
          <div className="alert alert-success" style={{ borderRadius: 10, marginBottom: 20 }}>{successMessage}</div>
        )}
        {error && (
          <div className="alert alert-danger" style={{ borderRadius: 10, marginBottom: 20 }}>{error}</div>
        )}

        {isLoading && (
          <div className="text-center mb-4">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <Row>
          {discussions.map(discussion => (
            <Col key={discussion.id} xs={12} className="mb-4">
              <div 
                className="discussion-card-animated" 
                style={{ 
                  border: 'none', 
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  minHeight: '180px',
                  maxWidth: '1000px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  padding: '0',
                  position: 'relative',
                  boxShadow: '0 8px 32px rgba(33, 150, 243, 0.1)',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Gradient accent bar */}
                <div style={{ 
                  width: '12px', 
                  background: 'linear-gradient(180deg, #2196f3 0%, #1565c0 100%)',
                  borderTopLeftRadius: '24px', 
                  borderBottomLeftRadius: '24px' 
                }}></div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '1.5rem 2rem', position: 'relative' }}>
                  {/* Category Badge */}
                  <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 2 }}>
                    <span style={{ 
                      background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                      color: '#fff',
                      borderRadius: '16px',
                      padding: '6px 16px',
                      fontWeight: '700',
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
                      textTransform: 'capitalize'
                    }}>
                      <span role="img" aria-label="category" style={{ marginRight: '8px', fontSize: '16px' }}>
                        {discussion.category === 'Recipe' ? '🍳' : 
                         discussion.category === 'Tips' ? '💡' : 
                         discussion.category === 'Question' ? '❓' : '💬'}
                      </span>
                      {discussion.category || 'Discussion'}
                    </span>
                  </div>

                  {/* Avatar with gradient border */}
                  <div style={{ 
                    position: 'relative',
                    marginRight: '28px',
                    marginLeft: '48px',
                    padding: '3px',
                    background: 'linear-gradient(45deg, #2196f3, #64b5f6)',
                    borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)'
                  }}>
                    <Image
                      src={imageErrors[discussion.id] ? require('../../assets/images/avatars/default-avatar.jpeg') : getAvatarSrc(discussion.avatar)}
                      roundedCircle
                      width={70}
                      height={70}
                      style={{ 
                        objectFit: 'cover',
                        border: '3px solid white',
                        borderRadius: '50%'
                      }}
                      alt={discussion.author}
                      onError={() => handleImageError(discussion.id)}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    {/* Tags with enhanced styling */}
                    <div className="mb-2" style={{ marginLeft: 2, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {(discussion.tags ? discussion.tags.split(',').map(t => t.trim()).filter(Boolean) : []).map(tag => (
                        <span 
                          key={tag} 
                          style={{ 
                            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                            color: '#1565c0',
                            fontSize: '14px',
                            padding: '6px 14px',
                            borderRadius: '12px',
                            fontWeight: '600',
                            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.1)',
                            border: '1px solid rgba(33, 150, 243, 0.1)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          #️⃣ {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title with hover effect */}
                    <div 
                      className="fw-bold discussion-title" 
                      style={{ 
                        color: '#1565c0',
                        fontSize: '24px',
                        marginBottom: '8px',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease'
                      }}
                      onClick={() => openDetail(discussion)}
                    >
                      {discussion.title}
                    </div>

                    {/* Content preview with gradient fade */}
                    <div style={{ 
                      color: '#37474f',
                      fontSize: '16px',
                      lineHeight: '1.5',
                      maxHeight: '48px',
                      overflow: 'hidden',
                      position: 'relative',
                      marginBottom: '12px'
                    }}>
                      {discussion.content}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '100px',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.95))'
                      }}/>
                    </div>

                    {/* Author and date with icons */}
                    <div style={{ 
                      fontSize: '15px',
                      color: '#78909c',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaUser size={14} />
                        {discussion.author}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaCalendarAlt size={14} />
                        {(discussion.date ? new Date(discussion.date).toLocaleDateString() : '')}
                      </span>
                    </div>
                  </div>

                  {/* Actions section */}
                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '1rem',
                    marginLeft: '20px'
                  }}>
                    {/* Reply count with animation */}
                    <div style={{ 
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#1976d2',
                      background: 'rgba(33, 150, 243, 0.1)',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      transition: 'transform 0.2s ease'
                    }}>
                      <span style={{ marginRight: '8px' }}>{discussion.replies?.length || 0}</span>
                      <FaComments size={20} />
                    </div>

                    {/* Action buttons with hover effects */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button
                        size="sm"
                        style={{ 
                          background: 'linear-gradient(135deg, #0288d1 0%, #0277bd 100%)',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '8px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        className="action-button"
                        onClick={() => navigate(`/community/discussions/${discussion.id}/edit`)}
                        disabled={isLoading}
                      >
                        <FaEdit size={14} />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        style={{ 
                          background: 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '8px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        className="action-button"
                        onClick={() => handleDelete(discussion)}
                        disabled={isLoading}
                      >
                        <FaTrash size={14} />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Create/Edit Modal */}
        <Modal 
          show={showModal} 
          onHide={() => setShowModal(false)} 
          centered
          backdrop={false}
          dialogClassName="custom-discussion-modal"
        >
          <div className="custom-discussion-modal">
            <Modal.Header closeButton>
              <Modal.Title>
                {editingDiscussion ? 'Edit Discussion' : 'Start New Discussion'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="Enter a descriptive title for your discussion"
                    style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 16, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)' }}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    required
                    placeholder="Share your thoughts, questions, or ideas..."
                    style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 16, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)', resize: 'vertical' }}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Author</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.author}
                    onChange={e => setForm({ ...form, author: e.target.value })}
                    placeholder="Enter your name or username"
                    style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 16, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)' }}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.tags}
                    onChange={e => setForm({ ...form, tags: e.target.value })}
                    placeholder="Add tags separated by commas (e.g., baking, tips, beginner)"
                    style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 16, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)' }}
                  />
                  <Form.Text className="text-muted" style={{ fontSize: 14, marginTop: 8 }}>
                    Tags help others find your discussion. Use relevant keywords separated by commas.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Avatar URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.avatar}
                    onChange={e => setForm({ ...form, avatar: e.target.value })}
                    placeholder="Paste a URL for your avatar image (optional)"
                    style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 16, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)' }}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    placeholder="Enter a category (e.g., General, Tips, Recipes)"
                    style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 16, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)' }}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 16, padding: '12px 16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)' }}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end gap-3 mt-4">
                  <Button 
                    onClick={() => setShowModal(false)} 
                    style={{ background: '#fff', border: '2px solid #ff9800', color: '#ff9800', fontWeight: 600, fontSize: 16, borderRadius: 10, padding: '10px 24px', transition: 'all 0.2s ease' }}
                    onMouseOver={(e) => { e.target.style.background = '#fff8f0'; e.target.style.transform = 'translateY(-2px)'; }}
                    onMouseOut={(e) => { e.target.style.background = '#fff'; e.target.style.transform = 'translateY(0)'; }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 16, borderRadius: 10, padding: '10px 24px', transition: 'all 0.2s ease' }}
                    onMouseOver={(e) => { e.target.style.background = '#e65100'; e.target.style.transform = 'translateY(-2px)'; }}
                    onMouseOut={(e) => { e.target.style.background = '#ff9800'; e.target.style.transform = 'translateY(0)'; }}
                  >
                    {editingDiscussion ? 'Update Discussion' : 'Start Discussion'}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </div>
        </Modal>

        {/* Detail Modal */}
        <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg" centered>
          <Modal.Header closeButton style={{ background: '#fff8f0', borderBottom: '2px solid #ffb74d' }}>
            <Modal.Title style={{ color: '#ff9800', fontWeight: 700 }}>{selectedDiscussion?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#fffdf7' }}>
            <div className="d-flex align-items-center mb-3">
              <Image
                src={imageErrors[selectedDiscussion?.id] ? require('../../assets/images/avatars/default-avatar.jpeg') : getAvatarSrc(selectedDiscussion?.avatar)}
                roundedCircle
                width={54}
                height={54}
                style={{ objectFit: 'cover', border: '2px solid #ffb74d', marginRight: 14 }}
                alt={selectedDiscussion?.author}
                onError={() => handleImageError(selectedDiscussion?.id)}
              />
              <div>
                <div className="fw-bold" style={{ color: '#ff9800', fontSize: 19 }}>{selectedDiscussion?.author}</div>
                <div className="text-muted" style={{ fontSize: 14 }}>{selectedDiscussion?.createdAt && new Date(selectedDiscussion.createdAt).toLocaleString()}</div>
              </div>
            </div>
            <div style={{ fontSize: 18, color: '#6d4c41', marginBottom: 12 }}>{selectedDiscussion?.content}</div>
            <hr />
            <h5 style={{ color: '#ff9800', fontWeight: 700 }}>Replies</h5>
            <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 12 }}>
              {(selectedDiscussion?.replies || []).length === 0 && <div className="text-muted">No replies yet.</div>}
              {(selectedDiscussion?.replies || []).map((reply, idx) => (
                <div key={idx} style={{ marginBottom: 10, padding: 10, background: '#fff7e6', borderRadius: 8, display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={imageErrors[reply.id] ? require('../../assets/images/avatars/default-avatar.jpeg') : getAvatarSrc(reply.avatar)}
                    roundedCircle
                    width={32}
                    height={32}
                    style={{ objectFit: 'cover', border: '1.5px solid #ffb74d', marginRight: 10 }}
                    alt={reply.author}
                    onError={() => handleImageError(reply.id)}
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: '#388e3c' }}>{reply.author}</div>
                    <div style={{ fontSize: 15 }}>{reply.content}</div>
                    <div className="text-muted" style={{ fontSize: 12 }}>{new Date(reply.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <Form className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Add a reply..."
                value={reply}
                onChange={e => setReply(e.target.value)}
                style={{ borderRadius: 8, border: '1.5px solid #ffb74d', fontSize: 16 }}
              />
              <Button
                variant="warning"
                style={{ fontWeight: 600, borderRadius: 8, fontSize: 16, background: '#ff9800', border: 'none', padding: '8px 18px' }}
                onClick={handleAddReply}
              >
                Reply
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Popup */}
        {deletePopup.show && (
          <div className="delete-popup-overlay">
            <div className="delete-popup">
              <div className="delete-popup-icon">
                <FaExclamationTriangle />
              </div>
              <h4>Delete Discussion</h4>
              <p>Are you sure you want to delete "{deletePopup.discussion?.title}"?</p>
              <div className="delete-popup-buttons">
                <button 
                  className="cancel-btn"
                  onClick={() => setDeletePopup({ show: false, discussion: null })}
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
      </Container>
    </div>
  );
};

export default DiscussionsPortal; 