import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const GroupDiscussions = ({ groupId }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchDiscussions();
  }, [groupId]);

  const fetchDiscussions = async () => {
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/groups/${groupId}/discussions`);
      const data = await response.json();
      setDiscussions(data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/groups/${groupId}/discussions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiscussion),
      });
      
      if (response.ok) {
        fetchDiscussions();
        setNewDiscussion({ title: '', content: '' });
      }
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  };

  return (
    <div>
      <h3>Discussions</h3>
      
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>New Discussion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={newDiscussion.title}
            onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Content"
            value={newDiscussion.content}
            onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
            required
          />
        </Form.Group>
        <Button type="submit">Start Discussion</Button>
      </Form>

      {discussions.map((discussion) => (
        <Card key={discussion.id} className="mb-3">
          <Card.Body>
            <Card.Title>{discussion.title}</Card.Title>
            <Card.Text>{discussion.content}</Card.Text>
            <Card.Footer className="text-muted">
              Posted by {discussion.author} on {new Date(discussion.createdAt).toLocaleDateString()}
            </Card.Footer>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GroupDiscussions; 