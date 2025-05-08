import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Image, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { FaPlus, FaUser, FaCalendarAlt, FaTag, FaComments, FaEdit, FaTrash, FaExclamationTriangle, FaHeart, FaShare } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "http://localhost:8080";

function getAvatarSrc(avatar) {
  if (!avatar) return require('../../assets/images/avatars/default-avatar.jpeg');
  if (avatar.startsWith('http')) return avatar;
  if (avatar.startsWith('/uploads/')) return BACKEND_URL + avatar;
  return require('../../assets/images/avatars/default-avatar.jpeg');
}

const PostsPortal = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', author: '', tags: '', avatar: '', category: '', date: '' });
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: '', message: '' });
  const [deletePopup, setDeletePopup] = useState({ show: false, post: null });
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/posts`);
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (post) => {
    setDeletePopup({ show: true, post });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/posts/${deletePopup.post.id}`);
      setPosts((prev) => prev.filter((p) => p.id !== deletePopup.post.id));
      setToastMessage({ 
        type: 'success', 
        message: `"${deletePopup.post.title}" has been deleted successfully` 
      });
      setShowToast(true);
    } catch (error) {
      console.error("Failed to delete post:", error);
      setToastMessage({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to delete post. Please try again.' 
      });
      setShowToast(true);
    }
    setDeletePopup({ show: false, post: null });
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`${BACKEND_URL}/api/posts/${postId}/like`);
      fetchPosts(); // Refresh posts to get updated like count
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleShare = async (post) => {
    try {
      await navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)', paddingTop: '90px' }}>
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: '#ff9800', fontSize: 38, letterSpacing: 1 }}>
            <span role="img" aria-label="post" style={{ fontSize: 40, verticalAlign: 'middle' }}>📝</span> Easy Chef Community Posts
          </h1>
          <p className="lead" style={{ color: '#795548', fontSize: 20, fontStyle: 'italic', fontWeight: 500 }}>
            Share your cooking experiences, recipes, and tips with the community!
          </p>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold" style={{ color: '#ff9800', fontSize: 28, margin: 0 }}>All Posts</h2>
          <Button
            style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 12, padding: '10px 28px' }}
            onClick={() => navigate('/community/posts/create')}
            disabled={isLoading}
          >
            + Create New Post
          </Button>
        </div>

        {isLoading && (
          <div className="text-center mb-4">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <Row>
          {posts.map(post => (
            <Col key={post.id} xs={12} className="mb-4">
              <div 
                className="post-card-animated" 
                style={{ 
                  border: 'none', 
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  minHeight: '200px',
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
                {/* Post Image */}
                <div style={{ 
                  width: '300px',
                  background: '#f5f5f5',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={post.image || require('../../assets/images/recipes/artisan-bread.jpeg')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={() => handleImageError(post.id)}
                  />
                </div>

                <div style={{ flex: 1, padding: '1.5rem 2rem', position: 'relative' }}>
                  {/* Category Badge */}
                  <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 2 }}>
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
                        {post.category === 'Recipe' ? '🍳' : 
                         post.category === 'Tips' ? '💡' : 
                         post.category === 'Story' ? '📖' : '📝'}
                      </span>
                      {post.category || 'Post'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    className="fw-bold" 
                    style={{ 
                      color: '#1565c0',
                      fontSize: '24px',
                      marginBottom: '12px',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease'
                    }}
                    onClick={() => navigate(`/community/posts/${post.id}`)}
                  >
                    {post.title}
                  </h3>

                  {/* Content Preview */}
                  <p style={{ 
                    color: '#37474f',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="mb-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : []).map(tag => (
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
                          border: '1px solid rgba(33, 150, 243, 0.1)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Author and Date */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Image
                        src={imageErrors[post.id] ? require('../../assets/images/avatars/default-avatar.jpeg') : getAvatarSrc(post.avatar)}
                        roundedCircle
                        width={32}
                        height={32}
                        style={{ objectFit: 'cover', border: '2px solid #ffb74d' }}
                        alt={post.author}
                        onError={() => handleImageError(post.id)}
                      />
                      <span style={{ color: '#78909c', fontWeight: '500' }}>{post.author}</span>
                    </div>
                    <span style={{ color: '#78909c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaCalendarAlt size={14} />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderTop: '1px solid #e0e0e0',
                    paddingTop: '16px'
                  }}>
                    <button
                      onClick={() => handleLike(post.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#e91e63',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <FaHeart size={18} />
                      <span>{post.likes || 0}</span>
                    </button>
                    <button
                      onClick={() => handleShare(post)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#2196f3',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <FaShare size={18} />
                      <span>Share</span>
                    </button>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                      <Button
                        size="sm"
                        style={{ 
                          background: 'linear-gradient(135deg, #0288d1 0%, #0277bd 100%)',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '8px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onClick={() => navigate(`/community/posts/${post.id}/edit`)}
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
                          gap: '6px'
                        }}
                        onClick={() => handleDelete(post)}
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

        {/* Delete Confirmation Popup */}
        {deletePopup.show && (
          <div className="delete-popup-overlay">
            <div className="delete-popup">
              <div className="delete-popup-icon">
                <FaExclamationTriangle />
              </div>
              <h4>Delete Post</h4>
              <p>Are you sure you want to delete "{deletePopup.post?.title}"?</p>
              <div className="delete-popup-buttons">
                <button 
                  className="cancel-btn"
                  onClick={() => setDeletePopup({ show: false, post: null })}
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
          .post-card-animated {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .post-card-animated:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 16px 48px rgba(33, 150, 243, 0.2);
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
      </Container>
    </div>
  );
};

export default PostsPortal; 