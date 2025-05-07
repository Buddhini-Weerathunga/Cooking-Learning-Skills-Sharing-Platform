import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CreateGroup = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    groupRules: '',
    privateGroup: false,
    creatorId: '',
    memberCount: 1,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Submitting group data:', form);
      
      await axios.post('http://localhost:8080/api/groups', form);
      
      console.log('Group created successfully');
      
      navigate('/community');
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)', paddingTop: '80px' }}>
      <Container className="py-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg" style={{ borderRadius: 24, border: 'none', background: '#fff8f0' }}>
              <div className="card-body p-5">
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#ff9800', fontSize: 38, letterSpacing: 1 }}>
                  <span role="img" aria-label="chef hat" style={{ fontSize: 40, verticalAlign: 'middle' }}>🍳</span> Create New Group
                </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold" style={{ color: '#ff9800' }}>Group Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter group name"
                      disabled={loading}
                      style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18 }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold" style={{ color: '#ff9800' }}>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      placeholder="Describe your group's purpose and goals"
                      disabled={loading}
                      style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18 }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold" style={{ color: '#ff9800' }}>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      disabled={loading}
                      style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18 }}
                    >
                      <option value="">Select a category</option>
                      <option value="Cooking">Cooking</option>
                      <option value="Baking">Baking</option>
                      <option value="Food Photography">Food Photography</option>
                      <option value="Nutrition">Nutrition</option>
                      <option value="Grilling">Grilling</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold" style={{ color: '#ff9800' }}>Group Rules</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="groupRules"
                      value={form.groupRules}
                      onChange={handleChange}
                      placeholder="Set guidelines for group members"
                      disabled={loading}
                      style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18 }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label={<span style={{ color: '#ff9800', fontWeight: 600 }}>Private Group (Only visible to members)</span>}
                      name="privateGroup"
                      checked={form.privateGroup}
                      onChange={handleChange}
                      disabled={loading}
                      style={{ fontSize: 18 }}
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button 
                      style={{ background: '#ff9800', border: 'none', fontWeight: 600, fontSize: 20, borderRadius: 12, padding: '12px 0' }}
                      type="submit" 
                      size="lg"
                      disabled={loading}
                      className="create-btn"
                    >
                      {loading ? 'Creating...' : 'Create Group'}
                    </Button>
                    <Button 
                      style={{ background: '#757575', color: '#fff', fontWeight: 700, fontSize: 18, borderRadius: 10, padding: '10px 0', border: 'none' }}
                      onClick={() => navigate('/community/groups')}
                      size="lg"
                      disabled={loading}
                      className="cancel-btn"
                    >
                      Cancel
                    </Button>
                    <Link to="/community/groups" className="d-inline-block">
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="mt-2 fw-bold shadow-sm view-groups-btn"
                        disabled={loading}
                        style={{ 
                          fontWeight: 700, 
                          fontSize: 15, 
                          borderRadius: 8, 
                          padding: '6px 18px', 
                          background: '#ff9800', 
                          color: '#fff', 
                          border: 'none', 
                          letterSpacing: 1,
                          boxShadow: '0 2px 8px 0 rgba(255,152,0,0.10)'
                        }}
                      >
                        <span role="img" aria-label="groups" style={{ marginRight: 6 }}>👥</span> View Groups
                      </Button>
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        .create-btn:hover {
          background: #e65100 !important;
          color: #fff !important;
        }
        .cancel-btn:hover {
          background: #424242 !important;
          color: #fff !important;
        }
        .view-groups-btn:hover {
          background: #e65100 !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default CreateGroup; 