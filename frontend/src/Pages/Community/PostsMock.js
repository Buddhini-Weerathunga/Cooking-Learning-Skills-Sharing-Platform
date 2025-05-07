import React, { useState } from 'react';
import { Container, Card, Button, Modal, Form, Image, Row, Col } from 'react-bootstrap';
import PostForm from './components/PostForm';

// Mock data
const initialPosts = [
  {
    id: 1,
    author: 'Jane Smith',
    authorAvatar: require('../../assets/images/avatars/sarah-baker.jpeg'),
    title: 'My First Sourdough',
    content: 'Check out my first sourdough bread! 🍞',
    image: '/images/recipes/sourdough-bread.jpeg',
    tags: ['Bread', 'Beginner'],
    likes: 12,
    createdAt: '2024-06-01T10:00:00Z'
  },
  {
    id: 2,
    author: 'Mike Johnson',
    authorAvatar: require('../../assets/images/avatars/michel-laurent.jpeg'),
    title: 'Chocolate Cake Success',
    content: 'Finally nailed this chocolate cake recipe!',
    image: '/images/recipes/chocolate-cake.jpeg',
    tags: ['Cake', 'Dessert'],
    likes: 20,
    createdAt: '2024-06-02T14:30:00Z'
  },
  {
    id: 3,
    author: 'Rachel Green',
    authorAvatar: require('../../assets/images/avatars/rachel-green.jpeg'),
    title: 'Vegan Croissants',
    content: 'Tried a vegan croissant recipe and it was amazing! 🥐',
    image: '/images/recipes/croissants.jpeg',
    tags: ['Vegan', 'Pastry'],
    likes: 8,
    createdAt: '2024-06-03T09:15:00Z'
  }
];

const PostsMock = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    image: '',
    tags: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Open modal for create or edit
  const openModal = (post = null) => {
    setEditingPost(post);
    setForm(post ? {
      title: post.title,
      content: post.content,
      image: post.image,
      tags: post.tags.join(', ')
    } : { title: '', content: '', image: '', tags: '' });
    setShowModal(true);
  };

  // Replace the inline modal form with PostForm
  const handlePostFormSubmit = (formData) => {
    // Convert tags to array if needed
    const tags = Array.isArray(formData.tags) ? formData.tags : (formData.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    if (editingPost) {
      setPosts(posts.map(p =>
        p.id === editingPost.id
          ? { ...editingPost, ...formData, tags, image: formData.image?.name ? '' : formData.image }
          : p
      ));
    } else {
      setPosts([
        ...posts,
        {
          id: Date.now(),
          author: 'Current User',
          authorAvatar: posts[0]?.authorAvatar || '',
          ...formData,
          tags,
          likes: 0,
          createdAt: new Date().toISOString(),
          image: formData.image?.name ? '' : formData.image // Only use URL for mock
        }
      ]);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    setPostToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setPosts(posts.filter(p => p.id !== postToDelete));
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)', paddingTop: '60px' }}>
      <Container className="py-5">
        <style>{`
          .post-card-animated {
            transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1);
          }
          .post-card-animated:hover {
            transform: translateY(-10px) scale(1.04) rotate(-1deg);
            box-shadow: 0 12px 36px 0 rgba(255, 152, 0, 0.18);
            z-index: 2;
          }
        `}</style>
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: '#ff9800', fontSize: 38, letterSpacing: 1 }}>
            <span role="img" aria-label="post" style={{ fontSize: 40, verticalAlign: 'middle' }}>🧁</span> Easy Chef Community Posts
          </h1>
          <p className="lead" style={{ color: '#795548', fontSize: 20, fontStyle: 'italic', fontWeight: 500 }}>
            Share your latest creations, tips, and baking adventures with the community!
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button
            style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 12, padding: '10px 28px' }}
            onClick={() => openModal()}
          >
            + Create Post
          </Button>
        </div>
        <Row className="g-4">
          {posts.map(post => (
            <Col md={6} lg={4} key={post.id}>
              <Card className="h-100 shadow post-card-animated" style={{ border: 'none', borderRadius: 20, background: '#fff8f0', minHeight: 380, maxWidth: 480, margin: '0 auto' }}>
                <Card.Body className="d-flex flex-column p-5">
                  <div className="d-flex align-items-center mb-2">
                    <Image
                      src={post.authorAvatar}
                      roundedCircle
                      width={64}
                      height={64}
                      style={{ objectFit: 'cover', border: '3px solid #ffb74d', marginRight: 18 }}
                      alt={post.author}
                    />
                    <div>
                      <div className="fw-bold" style={{ color: '#ff9800', fontSize: 22 }}>{post.author}</div>
                      <div className="text-muted" style={{ fontSize: 15 }}>{new Date(post.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Card.Title className="fw-bold" style={{ color: '#6d4c41', fontSize: 28 }}>
                    {post.title}
                  </Card.Title>
                  <Card.Text style={{ color: '#6d4c41', fontSize: 20 }}>{post.content}</Card.Text>
                  <div className="mb-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="badge bg-secondary me-1" style={{ fontSize: 16, padding: '7px 16px' }}>{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto d-flex justify-content-between align-items-end">
                    <span className="text-muted" style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>
                      {post.likes} <span role="img" aria-label="likes" style={{ fontSize: 28, marginLeft: 6, verticalAlign: 'middle' }}>❤️</span>
                    </span>
                    <div>
                      <Button
                        size="sm"
                        style={{ background: '#0288d1', border: 'none', borderRadius: 8, marginRight: 8 }}
                        onClick={() => openModal(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        style={{ background: '#d32f2f', border: 'none', borderRadius: 8 }}
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Create/Edit Modal */}
        <PostForm
          show={showModal}
          handleClose={() => {
            setShowModal(false);
            setEditingPost(null);
          }}
          handleSubmit={handlePostFormSubmit}
          initialData={editingPost}
        />

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={cancelDelete} centered>
          <Modal.Body style={{ borderRadius: 20, background: '#fff8f0', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <div style={{ fontSize: 48, color: '#ff9800', marginBottom: 16 }}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h4 style={{ color: '#d32f2f', fontWeight: 700, marginBottom: 12 }}>Delete Post?</h4>
            <p style={{ color: '#6d4c41', fontSize: 18, marginBottom: 28 }}>
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button onClick={cancelDelete} style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 17, borderRadius: 10, padding: '10px 32px' }}>
                Cancel
              </Button>
              <Button onClick={confirmDelete} style={{ background: '#d32f2f', border: 'none', fontWeight: 600, fontSize: 17, borderRadius: 10, padding: '10px 32px' }}>
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default PostsMock; 