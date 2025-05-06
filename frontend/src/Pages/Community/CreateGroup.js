import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    rules: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Submitting group data:', groupData);
      
      const response = await axios.post('http://localhost:8080/api/community-groups', {
        name: groupData.name,
        description: groupData.description
      });
      
      console.log('Server response:', response.data);
      
      if (response.data) {
        navigate(`/community/groups/${response.data.id}`);
      }
    } catch (error) {
      console.error('Error creating group:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.status === 500) {
        setError('Database error. Please make sure the database is running and properly configured.');
      } else if (error.response?.status === 404) {
        setError('Server endpoint not found. Please check if the backend server is running.');
      } else {
        setError(error.response?.data?.message || 'Failed to create group. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Container className="py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="text-center mb-4">Create New Group</h2>
                
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={groupData.name}
                      onChange={(e) => setGroupData({...groupData, name: e.target.value})}
                      required
                      placeholder="Enter group name"
                      disabled={loading}
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
                      placeholder="Describe your group's purpose and goals"
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={groupData.category}
                      onChange={(e) => setGroupData({...groupData, category: e.target.value})}
                      placeholder="e.g., Cooking, Baking, Food Photography"
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Group Rules</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={groupData.rules}
                      onChange={(e) => setGroupData({...groupData, rules: e.target.value})}
                      placeholder="Set guidelines for group members"
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Private Group (Only visible to members)"
                      checked={groupData.isPrivate}
                      onChange={(e) => setGroupData({...groupData, isPrivate: e.target.checked})}
                      disabled={loading}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : 'Create Group'}
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => navigate('/community')}
                      size="lg"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateGroup; 