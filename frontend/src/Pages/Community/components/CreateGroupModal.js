import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateGroupModal = ({ show, onHide, onGroupCreated }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    isPrivate: false
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
        onGroupCreated();
        onHide();
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default CreateGroupModal; 