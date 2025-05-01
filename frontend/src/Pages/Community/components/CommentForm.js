import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CommentForm = ({ handleSubmit, initialData = null, type = 'comment' }) => {
  const [content, setContent] = useState(initialData?.content || '');

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(content);
      setContent('');
    }}>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Write your ${type}...`}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {initialData ? 'Update' : 'Post'} {type}
      </Button>
    </Form>
  );
};

export default CommentForm; 