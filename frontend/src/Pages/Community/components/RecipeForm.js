import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const RecipeForm = ({ show, handleClose, handleSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    ingredients: initialData?.ingredients || [''],
    instructions: initialData?.instructions || [''],
    category: initialData?.category || '',
    cookingTime: initialData?.cookingTime || '',
    difficulty: initialData?.difficulty || 'medium',
    image: initialData?.image || null
  });
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeField = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const updateField = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? 'Edit Recipe' : 'Share New Recipe'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}>
          <Form.Group className="mb-3">
            <Form.Label>Recipe Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="bread">Bread</option>
                  <option value="pastries">Pastries</option>
                  <option value="desserts">Desserts</option>
                  <option value="cakes">Cakes</option>
                  <option value="cookies">Cookies</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Cooking Time</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.cookingTime}
                  onChange={(e) => setFormData({ ...formData, cookingTime: e.target.value })}
                  placeholder="e.g., 45 mins"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Difficulty</Form.Label>
                <Form.Select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateField('ingredients', index, e.target.value)}
                  placeholder="Enter ingredient"
                />
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => removeField('ingredients', index)}
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            ))}
            <Button
              variant="outline-primary"
              onClick={() => addField('ingredients')}
              size="sm"
            >
              <i className="fas fa-plus"></i> Add Ingredient
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  as="textarea"
                  value={instruction}
                  onChange={(e) => updateField('instructions', index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                />
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => removeField('instructions', index)}
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            ))}
            <Button
              variant="outline-primary"
              onClick={() => addField('instructions')}
              size="sm"
            >
              <i className="fas fa-plus"></i> Add Step
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Recipe Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2"
                style={{ maxWidth: '200px' }}
              />
            )}
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {initialData ? 'Update Recipe' : 'Share Recipe'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeForm; 