import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Dropdown } from 'react-bootstrap';
import { mockDiscussions } from './mockData';
import DiscussionForm from './components/DiscussionForm';

const GroupDiscussions = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [discussions, setDiscussions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDiscussion, setEditingDiscussion] = useState(null);

  useEffect(() => {
    fetchDiscussions();
  }, [groupId]);

  const fetchDiscussions = () => {
    const groupDiscussions = mockDiscussions.filter(d => d.groupId === groupId);
    setDiscussions(groupDiscussions);
  };

  const handleCreateDiscussion = (formData) => {
    const newDiscussion = {
      id: Date.now().toString(),
      groupId,
      ...formData,
      author: "Current User",
      createdAt: new Date().toISOString(),
      replies: []
    };
    mockDiscussions.push(newDiscussion);
    fetchDiscussions();
  };

  const handleUpdateDiscussion = (formData) => {
    const index = mockDiscussions.findIndex(d => d.id === editingDiscussion.id);
    if (index !== -1) {
      mockDiscussions[index] = {
        ...mockDiscussions[index],
        ...formData,
        updatedAt: new Date().toISOString()
      };
      fetchDiscussions();
    }
    setEditingDiscussion(null);
  };

  const handleDeleteDiscussion = (discussionId) => {
    if (window.confirm('Are you sure you want to delete this discussion?')) {
      const index = mockDiscussions.findIndex(d => d.id === discussionId);
      if (index !== -1) {
        mockDiscussions.splice(index, 1);
        fetchDiscussions();
      }
    }
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Container>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(`/community/groups/${groupId}`)}
          className="mb-3"
        >
          ← Back to Group
        </Button>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Discussions</h2>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Start New Discussion
          </Button>
        </div>

        {discussions.map(discussion => (
          <Card key={discussion.id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title>
                  <Link to={`/community/groups/${groupId}/discussions/${discussion.id}`}>
                    {discussion.title}
                  </Link>
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
              <Card.Text>{discussion.content}</Card.Text>
              {discussion.tags?.length > 0 && (
                <div className="mb-2">
                  {discussion.tags.map(tag => (
                    <span key={tag} className="badge bg-secondary me-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <Card.Footer className="text-muted">
                Posted by {discussion.author} on {new Date(discussion.createdAt).toLocaleDateString()}
                {discussion.updatedAt && ' (edited)'}
              </Card.Footer>
            </Card.Body>
          </Card>
        ))}

        <DiscussionForm
          show={showForm}
          handleClose={() => {
            setShowForm(false);
            setEditingDiscussion(null);
          }}
          handleSubmit={editingDiscussion ? handleUpdateDiscussion : handleCreateDiscussion}
          initialData={editingDiscussion}
        />
      </Container>
    </div>
  );
};

export default GroupDiscussions; 