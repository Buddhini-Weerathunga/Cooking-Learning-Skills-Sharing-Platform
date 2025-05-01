import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    rules: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });
      
      if (response.ok) {
        const data = await response.json();
        navigate(`/community/groups/${data.id}`);
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Container className="py-5">
        <h1>Create New Group</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type="text"
              value={groupData.name}
              onChange={(e) => setGroupData({...groupData, name: e.target.value})}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={groupData.description}
              onChange={(e) => setGroupData({...groupData, description: e.target.value})}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={groupData.category}
              onChange={(e) => setGroupData({...groupData, category: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Group Rules</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={groupData.rules}
              onChange={(e) => setGroupData({...groupData, rules: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Private Group"
              checked={groupData.isPrivate}
              onChange={(e) => setGroupData({...groupData, isPrivate: e.target.checked})}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Group
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateGroup; 