import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert } from 'react-bootstrap';

const EditGroup = () => {
  const { groupId } = useParams();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/groups/${groupId}`).then((res) => setForm(res.data));
  }, [groupId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/groups/${groupId}`, form);
      window.dispatchEvent(new Event('groupsUpdated'));
      localStorage.setItem('groupEditSuccess', 'true');
      navigate('/community/groups');
    } catch (err) {
      setError('Failed to update group. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)', paddingTop: '80px' }}>
      <Container className="py-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg" style={{ borderRadius: 24, border: 'none', background: '#fff8f0' }}>
              <div className="card-body p-5">
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#ff9800', fontSize: 38, letterSpacing: 1 }}>
                  <span role="img" aria-label="chef hat" style={{ fontSize: 40, verticalAlign: 'middle' }}>🍳</span> Edit Group
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
                      style={{ borderRadius: 12, border: '1.5px solid #ffb74d', fontSize: 18, color: form.category === '' ? '#888' : '#212529' }}
                    >
                      <option value="" disabled>Select a category</option>
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
                      className="save-btn"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      style={{ background: '#757575', color: '#fff', fontWeight: 700, fontSize: 18, borderRadius: 10, padding: '10px 0', border: 'none' }}
                      onClick={() => navigate(`/community/groups/${groupId}`)}
                      size="lg"
                      disabled={loading}
                      className="cancel-btn"
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
      <style>{`
        .save-btn:hover {
          background: #e65100 !important;
          color: #fff !important;
        }
        .cancel-btn:hover {
          background: #424242 !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default EditGroup; 