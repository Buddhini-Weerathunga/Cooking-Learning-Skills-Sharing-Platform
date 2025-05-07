import React, { useState } from 'react';
import { Container, Card, Button, Modal, Form, Image, Row, Col } from 'react-bootstrap';

const initialDiscussions = [
  {
    id: 1,
    author: 'Sarah Baker',
    authorAvatar: require('../../assets/images/avatars/sarah-baker.jpeg'),
    title: 'Best flour for sourdough?',
    content: 'What flour do you recommend for a tangy sourdough? Any tips for beginners?',
    tags: ['Bread', 'Tips'],
    createdAt: '2024-06-01T09:00:00Z',
    replies: [
      { author: 'Mike Johnson', avatar: require('../../assets/images/avatars/michel-laurent.jpeg'), content: 'I love using rye flour for extra tang!', createdAt: '2024-06-01T10:00:00Z' }
    ]
  },
  {
    id: 2,
    author: 'Rachel Green',
    authorAvatar: require('../../assets/images/avatars/rachel-green.jpeg'),
    title: 'Vegan egg wash alternatives',
    content: 'What do you use for a shiny vegan pastry finish?',
    tags: ['Vegan', 'Pastry'],
    createdAt: '2024-06-02T12:30:00Z',
    replies: []
  },
  {
    id: 3,
    author: 'Michel Laurent',
    authorAvatar: require('../../assets/images/avatars/michel-laurent.jpeg'),
    title: 'How to get a crispy pizza crust?',
    content: 'I love making pizza at home, but I can never get that perfect crunch on the bottom. Has anyone tried using semolina or a cast iron pan? Any tips for achieving that classic pizzeria texture?',
    tags: ['Pizza', 'Techniques'],
    createdAt: '2024-06-03T15:45:00Z',
    replies: [
      { author: 'Sarah Baker', avatar: require('../../assets/images/avatars/sarah-baker.jpeg'), content: 'Try preheating your pizza stone and use bread flour for extra chew!', createdAt: '2024-06-03T16:00:00Z' }
    ]
  }
];

const DiscussionsMock = () => {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [showModal, setShowModal] = useState(false);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discussionToDelete, setDiscussionToDelete] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [reply, setReply] = useState('');

  // Open modal for create/edit
  const openModal = (discussion = null) => {
    setEditingDiscussion(discussion);
    setForm(discussion ? {
      title: discussion.title,
      content: discussion.content,
      tags: discussion.tags.join(', ')
    } : { title: '', content: '', tags: '' });
    setShowModal(true);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (editingDiscussion) {
      setDiscussions(discussions.map(d =>
        d.id === editingDiscussion.id
          ? { ...editingDiscussion, ...form, tags }
          : d
      ));
    } else {
      setDiscussions([
        ...discussions,
        {
          id: Date.now(),
          author: 'Current User',
          authorAvatar: require('../../assets/images/avatars/default-avatar.jpeg'),
          ...form,
          tags,
          createdAt: new Date().toISOString(),
          replies: []
        }
      ]);
    }
    setShowModal(false);
    setEditingDiscussion(null);
    setForm({ title: '', content: '', tags: '' });
  };

  // Delete
  const handleDelete = (id) => {
    setDiscussionToDelete(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    setDiscussions(discussions.filter(d => d.id !== discussionToDelete));
    setShowDeleteModal(false);
    setDiscussionToDelete(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDiscussionToDelete(null);
  };

  // Detail modal
  const openDetail = (discussion) => {
    setSelectedDiscussion(discussion);
    setShowDetail(true);
    setReply('');
  };
  const closeDetail = () => {
    setShowDetail(false);
    setSelectedDiscussion(null);
    setReply('');
  };
  const handleAddReply = () => {
    if (!reply.trim()) return;
    setSelectedDiscussion(prev => ({
      ...prev,
      replies: [
        ...(prev.replies || []),
        { author: 'Current User', avatar: require('../../assets/images/avatars/default-avatar.jpeg'), content: reply, createdAt: new Date().toISOString() }
      ]
    }));
    setReply('');
  };
  // Sync replies to main list
  React.useEffect(() => {
    if (selectedDiscussion) {
      setDiscussions(ds => ds.map(d => d.id === selectedDiscussion.id ? selectedDiscussion : d));
    }
  }, [selectedDiscussion]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)', paddingTop: '60px' }}>
      <Container className="py-5">
        <style>{`
          .discussion-card-animated {
            transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1);
          }
          .discussion-card-animated:hover {
            transform: translateY(-10px) scale(1.04) rotate(-1deg);
            box-shadow: 0 12px 36px 0 rgba(255, 152, 0, 0.18);
            z-index: 2;
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
            onClick={() => openModal()}
          >
            + Start Discussion
          </Button>
        </div>
        <Row className="g-4 flex-column">
          {discussions.map(discussion => (
            <Col key={discussion.id} className="mb-3">
              <Card className="shadow discussion-card-animated" style={{ border: 'none', borderRadius: 18, background: '#e3f2fd', minHeight: 130, maxWidth: 950, margin: '0 auto', display: 'flex', flexDirection: 'row', alignItems: 'stretch', padding: 0, position: 'relative', boxShadow: '0 4px 24px 0 rgba(33,150,243,0.10)' }}>
                {/* Blue accent bar */}
                <div style={{ width: 10, background: '#2196f3', borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }}></div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '1.2rem 2rem', position: 'relative' }}>
                  {/* Discussion badge */}
                  <div style={{ position: 'absolute', top: 18, left: 18, zIndex: 2 }}>
                    <span style={{ background: '#2196f3', color: '#fff', borderRadius: 12, padding: '4px 14px', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px 0 rgba(33,150,243,0.10)' }}>
                      <span role="img" aria-label="discussion" style={{ marginRight: 7, fontSize: 18 }}>🗨️</span> Discussion
                    </span>
                  </div>
                  <Image
                    src={discussion.authorAvatar}
                    roundedCircle
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover', border: '3px solid #90caf9', marginRight: 24, marginLeft: 40 }}
                    alt={discussion.author}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Tags as pill chips above title */}
                    <div className="mb-2" style={{ marginLeft: 2 }}>
                      {discussion.tags.map(tag => (
                        <span key={tag} className="badge me-1" style={{ background: '#bbdefb', color: '#1976d2', fontSize: 15, padding: '7px 16px', borderRadius: 16, fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                    <div className="fw-bold" style={{ color: '#1565c0', fontSize: 26, marginBottom: 2, letterSpacing: 0.5, cursor: 'pointer' }} onClick={() => openDetail(discussion)}>
                      {discussion.title}
                    </div>
                    <div style={{ color: '#1976d2', fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 500 }}>{discussion.content}</div>
                    <div className="mt-2" style={{ fontSize: 15, color: '#607d8b', fontWeight: 500 }}>
                      {discussion.author} &middot; {new Date(discussion.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end justify-content-between ms-3" style={{ minWidth: 120, height: '100%' }}>
                    <span className="text-muted mb-2" style={{ fontSize: 18, display: 'flex', alignItems: 'center', color: '#1976d2' }}>
                      {discussion.replies.length} <span role="img" aria-label="replies" style={{ fontSize: 28, marginLeft: 7, verticalAlign: 'middle' }}>🗨️</span>
                    </span>
                    <div>
                      <Button
                        size="sm"
                        style={{ background: '#0288d1', border: 'none', borderRadius: 8, marginRight: 8 }}
                        onClick={() => openModal(discussion)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        style={{ background: '#d32f2f', border: 'none', borderRadius: 8 }}
                        onClick={() => handleDelete(discussion.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Create/Edit Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton style={{ background: '#fff8f0', borderBottom: '2px solid #ffb74d', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <Modal.Title style={{ color: '#ff9800', fontWeight: 700, fontSize: 24 }}>
              {editingDiscussion ? 'Edit Discussion' : 'Start New Discussion'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#fffdf7', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: '2rem' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" style={{ color: '#ff9800' }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                  style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18 }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" style={{ color: '#ff9800' }}>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  required
                  style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18 }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" style={{ color: '#ff9800' }}>Tags (comma separated)</Form.Label>
                <Form.Control
                  type="text"
                  value={form.tags}
                  onChange={e => setForm({ ...form, tags: e.target.value })}
                  style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 16 }}
                />
              </Form.Group>
              <div className="d-flex justify-content-end gap-3">
                <Button onClick={() => setShowModal(false)} style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 10, padding: '10px 32px' }}>
                  Cancel
                </Button>
                <Button type="submit" style={{ background: '#0288d1', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 10, padding: '10px 32px' }}>
                  {editingDiscussion ? 'Update Discussion' : 'Start Discussion'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={cancelDelete} centered>
          <Modal.Body style={{ borderRadius: 20, background: '#fff8f0', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <div style={{ fontSize: 48, color: '#ff9800', marginBottom: 16 }}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h4 style={{ color: '#d32f2f', fontWeight: 700, marginBottom: 12 }}>Delete Discussion?</h4>
            <p style={{ color: '#6d4c41', fontSize: 18, marginBottom: 28 }}>
              Are you sure you want to delete this discussion? This action cannot be undone.
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

        {/* Detail Modal */}
        <Modal show={showDetail} onHide={closeDetail} size="lg" centered>
          <Modal.Header closeButton style={{ background: '#fff8f0', borderBottom: '2px solid #ffb74d' }}>
            <Modal.Title style={{ color: '#ff9800', fontWeight: 700 }}>{selectedDiscussion?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#fffdf7' }}>
            <div className="d-flex align-items-center mb-3">
              <Image
                src={selectedDiscussion?.authorAvatar}
                roundedCircle
                width={54}
                height={54}
                style={{ objectFit: 'cover', border: '2px solid #ffb74d', marginRight: 14 }}
                alt={selectedDiscussion?.author}
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
                    src={reply.avatar}
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
      </Container>
    </div>
  );
};

export default DiscussionsMock; 