import React, { useState } from 'react';
import { Container, Form, Button, Image, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaTag, FaTimes, FaExclamationTriangle, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const BACKEND_URL = "http://localhost:8080";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('postName', form.title);
      formData.append('postTitle', form.title);
      formData.append('postContent', form.content);
      formData.append('author', 'Anonymous');
      formData.append('category', form.category);
      formData.append('tags', form.tags);
      if (form.image) {
        formData.append('image', form.image);
      }

      await axios.post(`${BACKEND_URL}/api/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/community/posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)',
      paddingTop: '90px',
      paddingBottom: '40px'
    }}>
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ 
            color: '#ff9800', 
            fontSize: 38, 
            letterSpacing: 1,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            <span role="img" aria-label="post" style={{ fontSize: 40, verticalAlign: 'middle' }}>📝</span> Create New Post
          </h1>
          <p className="lead" style={{ 
            color: '#795548', 
            fontSize: 20, 
            fontStyle: 'italic', 
            fontWeight: 500,
            marginTop: '12px'
          }}>
            Share your cooking experiences with the community!
          </p>
        </div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 8px 32px rgba(33, 150, 243, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'fadeIn 0.5s ease'
        }}>
          {error && (
            <Alert variant="danger" className="mb-4" style={{
              borderRadius: '12px',
              border: 'none',
              background: 'rgba(244, 67, 54, 0.1)',
              color: '#d32f2f',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FaExclamationTriangle size={20} />
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label style={{ 
                color: '#1565c0',
                fontWeight: '600',
                fontSize: '1.1rem',
                marginBottom: '8px'
              }}>
                Title
              </Form.Label>
              <Form.Control
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  padding: '12px 16px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.9)'
                }}
                placeholder="Enter a catchy title for your post"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ 
                color: '#1565c0',
                fontWeight: '600',
                fontSize: '1.1rem',
                marginBottom: '8px'
              }}>
                Content
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                style={{
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  padding: '16px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.9)',
                  resize: 'vertical'
                }}
                placeholder="Share your cooking story, recipe, or tips..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label style={{ 
                    color: '#1565c0',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    marginBottom: '8px'
                  }}>
                    Category
                  </Form.Label>
                  <Form.Select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                    style={{
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      padding: '12px 16px',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.9)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select a category</option>
                    <option value="Recipe">Recipe</option>
                    <option value="Tips">Tips</option>
                    <option value="Story">Story</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label style={{ 
                    color: '#1565c0',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    marginBottom: '8px'
                  }}>
                    Tags
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    style={{
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      padding: '12px 16px',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.9)'
                    }}
                    placeholder="Enter tags separated by commas"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label style={{ 
                color: '#1565c0',
                fontWeight: '600',
                fontSize: '1.1rem',
                marginBottom: '8px'
              }}>
                Featured Image
              </Form.Label>
              <div style={{
                border: '2px dashed #e0e0e0',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
                {previewImage ? (
                  <div style={{ position: 'relative' }}>
                    <Image
                      src={previewImage}
                      alt="Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '300px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage(null);
                        setForm({ ...form, image: null });
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div>
                    <FaPlus size={32} style={{ color: '#ff9800', marginBottom: '1rem' }} />
                    <p style={{ color: '#666', margin: 0 }}>Click to upload an image</p>
                    <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      Recommended size: 1200x800 pixels
                    </p>
                  </div>
                )}
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end gap-3 mt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/community/posts')}
                style={{
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  border: '2px solid #e0e0e0',
                  transition: 'all 0.3s ease'
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(255, 152, 0, 0.2)'
                }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : (
                  'Create Post'
                )}
              </Button>
            </div>
          </Form>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .form-control:focus, .form-select:focus {
            border-color: #ff9800;
            box-shadow: 0 0 0 0.25rem rgba(255, 152, 0, 0.25);
          }
          .form-control:hover, .form-select:hover {
            border-color: #ffb74d;
          }
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(255, 152, 0, 0.3);
          }
          .btn-outline-secondary:hover {
            background: #f5f5f5;
            border-color: #bdbdbd;
          }
        `}</style>
      </Container>
    </div>
  );
};

export default CreatePost; 