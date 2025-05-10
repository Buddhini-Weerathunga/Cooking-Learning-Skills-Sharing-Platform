import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Dropdown, Modal, Form, Alert, Image } from 'react-bootstrap';
import axios from 'axios';
import PostForm from './components/PostForm';


const placeholderAvatar = '/images/avatar-placeholder.png'; // Use your own placeholder path

const GroupPosts = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  
  useEffect(() => {
    fetchPosts();
  }, [groupId]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/groups/${groupId}/posts`);
      setPosts(res.data);
    } catch (err) {
      setError('Failed to load posts.');
    }
  };

  const handleCreatePost = async (formData) => {
    try {
      await axios.post(`http://localhost:8080/api/groups/${groupId}/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchPosts();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create post.');
    }
  };

  const handleUpdatePost = async (formData) => {
    try {
      await axios.put(`http://localhost:8080/api/groups/${groupId}/posts/${editingPost.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchPosts();
      setShowForm(false);
      setEditingPost(null);
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  const handleDeletePost = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const confirmDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/groups/${groupId}/posts/${postToDelete}`);
      fetchPosts();
    } catch (err) {
      setError('Failed to delete post.');
    } finally {
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  // Comments/replies logic
  const handleOpenDetail = (post) => {
    setSelectedPost(post);
    setShowDetail(true);
  };
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    setSelectedPost((prev) => ({
      ...prev,
      comments: [...(prev.comments || []), { author: 'Current User', content: comment, createdAt: new Date().toISOString(), avatar: placeholderAvatar }]
    }));
    setComment('');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)', paddingTop: '120px' }}>
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: '#ff9800', fontSize: 38, letterSpacing: 1 }}>
            <span role="img" aria-label="post" style={{ fontSize: 40, verticalAlign: 'middle' }}>📝</span> Group Posts
          </h1>
          <p className="lead" style={{ color: '#795548' }}>
            Share your creations, tips, and updates with the group!
          </p>
        </div>
        <Button 
          style={{ background: '#757575', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 10, padding: '8px 24px', marginBottom: 24 }}
          onClick={() => navigate(`/community/groups/${groupId}`)}
        >
          ← Back to Group
        </Button>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold" style={{ color: '#ff9800', fontSize: 28, margin: 0 }}>All Posts</h2>
          <Button 
            style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 12, padding: '10px 28px', boxShadow: '0 2px 8px 0 rgba(255,152,0,0.10)' }}
            onClick={() => setShowForm(true)}
            className="create-post-btn"
          >
            + Create New Post
          </Button>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="row g-4">
          {posts.map(post => (
            <div className="col-md-6 col-lg-4" key={post.id}>
              <Card className="h-100 shadow post-card" style={{ border: 'none', borderRadius: 20, minHeight: 240, background: '#fff8f0', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex align-items-center mb-2">
                    <Image
                      src={post.authorAvatar || placeholderAvatar}
                      roundedCircle
                      width={44}
                      height={44}
                      style={{ objectFit: 'cover', border: '2px solid #ffb74d', marginRight: 14 }}
                      alt={post.author}
                    />
                    <div>
                      <div className="fw-bold" style={{ color: '#ff9800', fontSize: 17 }}>{post.author}</div>
                      <div className="text-muted" style={{ fontSize: 13 }}>{new Date(post.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Card.Title className="fw-bold" style={{ color: '#6d4c41', fontSize: 22, cursor: 'pointer' }} onClick={() => handleOpenDetail(post)}>
                    {post.title}
                  </Card.Title>
                  <Card.Text style={{ color: '#6d4c41', fontSize: 16 }}>{post.content}</Card.Text>
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      style={{ maxWidth: '100%', marginBottom: '1rem', borderRadius: 10, border: '1.5px solid #ffb74d' }} 
                    />
                  )}
                  {post.tags?.length > 0 && (
                    <div className="mb-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="badge bg-secondary me-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto d-flex justify-content-between align-items-end">
                    <span className="text-muted" style={{ fontSize: 14 }}>
                      {post.likes} <span role="img" aria-label="likes">❤️</span>
                    </span>
                    <Dropdown>
                      <Dropdown.Toggle variant="link" id={`post-${post.id}-actions`}>
                        ⋮
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                          setEditingPost(post);
                          setShowForm(true);
                        }}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={() => handleDeletePost(post.id)}
                          className="text-danger"
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        <PostForm
          show={showForm}
          handleClose={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
          handleSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          initialData={editingPost}
        />

        {/* Post Detail Modal with Comments/Replies */}
        <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg" centered>
          <Modal.Header closeButton style={{ background: '#fff8f0', borderBottom: '2px solid #ffb74d' }}>
            <Modal.Title style={{ color: '#ff9800', fontWeight: 700 }}>{selectedPost?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#fffdf7' }}>
            <div className="d-flex align-items-center mb-3">
              <Image
                src={selectedPost?.authorAvatar || placeholderAvatar}
                roundedCircle
                width={44}
                height={44}
                style={{ objectFit: 'cover', border: '2px solid #ffb74d', marginRight: 14 }}
                alt={selectedPost?.author}
              />
              <div>
                <div className="fw-bold" style={{ color: '#ff9800', fontSize: 17 }}>{selectedPost?.author}</div>
                <div className="text-muted" style={{ fontSize: 13 }}>{selectedPost?.createdAt && new Date(selectedPost.createdAt).toLocaleString()}</div>
              </div>
            </div>
            <div style={{ fontSize: 18, color: '#6d4c41', marginBottom: 12 }}>{selectedPost?.content}</div>
            {selectedPost?.image && (
              <img 
                src={selectedPost.image} 
                alt="Post content" 
                style={{ maxWidth: '100%', marginBottom: '1rem', borderRadius: 10, border: '1.5px solid #ffb74d' }} 
              />
            )}
            <hr />
            <h5 style={{ color: '#ff9800', fontWeight: 700 }}>Comments</h5>
            <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 12 }}>
              {(selectedPost?.comments || []).length === 0 && <div className="text-muted">No comments yet.</div>}
              {(selectedPost?.comments || []).map((reply, idx) => (
                <div key={idx} style={{ marginBottom: 10, padding: 10, background: '#fff7e6', borderRadius: 8, display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={reply.avatar || placeholderAvatar}
                    roundedCircle
                    width={32}
                    height={32}
                    style={{ objectFit: 'cover', border: '1.5px solid #ffb74d', marginRight: 10 }}
                    alt={reply.author}
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
                placeholder="Add a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                style={{ borderRadius: 8, border: '1.5px solid #ffb74d', fontSize: 16 }}
              />
              <Button 
                variant="warning" 
                style={{ fontWeight: 600, borderRadius: 8, fontSize: 16, background: '#ff9800', border: 'none', padding: '8px 18px' }}
                onClick={handleAddComment}
              >
                Comment
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <style>{`
          .post-card:hover {
            transform: translateY(-6px) scale(1.03);
            box-shadow: 0 8px 32px 0 rgba(255, 152, 0, 0.15);
          }
          .create-post-btn:hover {
            background: #e65100 !important;
            color: #fff !important;
          }
        `}</style>
      </Container>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Body style={{ borderRadius: 20, background: '#fff8f0', textAlign: 'center', padding: '2.5rem 2rem' }}>
          <div style={{ fontSize: 48, color: '#ff9800', marginBottom: 16 }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h4 style={{ color: '#d32f2f', fontWeight: 700, marginBottom: 12 }}>Delete Post?</h4>
          <p style={{ color: '#6d4c41', fontSize: 18, marginBottom: 28 }}>
            Are you sure you want to delete this post? This action cannot be undone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button onClick={() => setShowDeleteModal(false)} style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 17, borderRadius: 10, padding: '10px 32px' }}>
              Cancel
            </Button>
            <Button onClick={confirmDeletePost} style={{ background: '#d32f2f', border: 'none', fontWeight: 600, fontSize: 17, borderRadius: 10, padding: '10px 32px' }}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GroupPosts; 