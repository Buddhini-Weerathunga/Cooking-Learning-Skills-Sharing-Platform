import React, { useState } from 'react';
import { Modal, Form, Button, Image } from 'react-bootstrap';

const PostForm = ({ show, handleClose, handleSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    image: initialData?.image || null,
    tags: initialData?.tags || []
  });
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Prepare FormData for backend
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('tags', Array.isArray(formData.tags) ? formData.tags.join(',') : formData.tags);
    if (formData.image && formData.image instanceof File) {
      data.append('image', formData.image);
    }
    handleSubmit(data);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton style={{ background: '#fff8f0', borderBottom: '2px solid #ffb74d', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <Modal.Title style={{ color: '#ff9800', fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>
          {initialData ? 'Edit Post' : 'Create New Post'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#fffdf7', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: '2.5rem 2rem' }}>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18 }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Write your post content here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18 }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Image (optional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 16 }}
            />
            {imagePreview && (
              <div className="mt-3 d-flex flex-column align-items-center">
                <Image src={imagePreview} alt="Preview" style={{ maxWidth: '260px', borderRadius: 14, border: '2px solid #ffb74d', boxShadow: '0 2px 8px 0 rgba(255,152,0,0.10)' }} />
                <span className="text-muted mt-2" style={{ fontSize: 14 }}>Image Preview</span>
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold" style={{ color: '#ff9800', fontSize: 18 }}>Tags (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags separated by commas"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
              })}
              style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18 }}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-3 mt-4">
            <Button onClick={handleClose} style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 10, padding: '10px 32px' }}>
              Cancel
            </Button>
            <Button type="submit" style={{ background: '#0288d1', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 10, padding: '10px 32px' }}>
              {initialData ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostForm; 