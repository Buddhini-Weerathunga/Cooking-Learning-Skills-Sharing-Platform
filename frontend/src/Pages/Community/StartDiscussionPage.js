import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import './DiscussionsPortal.css';

const StartDiscussionPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', author: '', tags: '', avatar: '', category: '', date: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    // Validate file size (25MB max)
    if (file.size > 25 * 1024 * 1024) {
      setError('Image size should be less than 25MB');
      return;
    }
    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
    // Upload the image
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm({ ...form, avatar: response.data.url });
      setError(null);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      setAvatarPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setAvatarPreview(null);
    setForm({ ...form, avatar: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsString = form.tags.split(',').map(t => t.trim()).filter(Boolean).join(',');
      const payload = {
        ...form,
        tags: tagsString,
        date: form.date || new Date().toISOString().split('T')[0],
      };
      await axios.post('/api/discussions', payload);
      navigate('/community/discussions');
    } catch (err) {
      setError('Failed to save discussion');
      setLoading(false);
    }
  };

  return (
    <div className="custom-discussion-modal" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={7}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title w-100 text-center">Start New Discussion</h2>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => navigate('/community/discussions')}></button>
              </div>
              <div className="modal-body">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      required
                      placeholder="Enter a descriptive title for your discussion"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={form.content}
                      onChange={e => setForm({ ...form, content: e.target.value })}
                      required
                      placeholder="Share your thoughts, questions, or ideas..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Author</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.author}
                      onChange={e => setForm({ ...form, author: e.target.value })}
                      placeholder="Enter your name or username"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Profile Image</Form.Label>
                    <div className="avatar-upload-container">
                      <div className="avatar-preview">
                        {avatarPreview ? (
                          <>
                            <Image
                              src={avatarPreview}
                              alt="Avatar preview"
                            />
                            <button
                              onClick={removeImage}
                              className="avatar-remove-btn"
                            >
                              ×
                            </button>
                          </>
                        ) : (
                          <div style={{ color: '#ff9800', fontSize: '2rem' }}>👤</div>
                        )}
                      </div>
                      <div>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          style={{ display: 'none' }}
                          id="avatar-upload"
                        />
                        <Form.Label 
                          htmlFor="avatar-upload"
                          className="avatar-upload-btn"
                        >
                          {uploading ? 'Uploading...' : 'Choose Image'}
                        </Form.Label>
                        <div className="avatar-upload-hint">
                          Recommended size: 200x200 pixels, max 5MB
                        </div>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Tags</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.tags}
                      onChange={e => setForm({ ...form, tags: e.target.value })}
                      placeholder="Add tags separated by commas (e.g., baking, tips, beginner)"
                    />
                    <Form.Text className="text-muted" style={{ fontSize: 14, marginTop: 8 }}>
                      Tags help others find your discussion. Use relevant keywords separated by commas.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      placeholder="Enter a category (e.g., General, Tips, Recipes)"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                    />
                  </Form.Group>
                  {error && <div className="error-message mb-3">{error}</div>}
                  <div className="modal-footer">
                    <Button type="button" className="btn btn-secondary" onClick={() => navigate('/community/discussions')} disabled={loading}>
                      Cancel
                    </Button>
                    <Button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Saving...' : 'Start Discussion'}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StartDiscussionPage; 