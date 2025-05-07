import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form } from 'react-bootstrap';

const DiscussionDetail = () => {
  const { groupId, discussionId } = useParams();
  const navigate = useNavigate();
  const [discussion, setDiscussion] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    // TODO: Fetch discussion details and replies
  }, [discussionId]);

  const handleReply = (e) => {
    e.preventDefault();
    // TODO: Implement reply submission
    setNewReply('');
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Container>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(`/community/groups/${groupId}/discussions`)}
          className="mb-3"
        >
          ← Back to Discussions
        </Button>

        {discussion ? (
          <>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{discussion.title}</Card.Title>
                <Card.Text>{discussion.content}</Card.Text>
                <small className="text-muted">
                  Posted by {discussion.author} on {new Date(discussion.createdAt).toLocaleDateString()}
                </small>
              </Card.Body>
            </Card>

            <h4>Replies</h4>
            {replies.map(reply => (
              <Card key={reply.id} className="mb-3">
                <Card.Body>
                  <Card.Text>{reply.content}</Card.Text>
                  <small className="text-muted">
                    Reply by {reply.author} on {new Date(reply.createdAt).toLocaleDateString()}
                  </small>
                </Card.Body>
              </Card>
            ))}

            <Form onSubmit={handleReply} className="mt-4">
              <Form.Group className="mb-3">
                <Form.Label>Your Reply</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Post Reply
              </Button>
            </Form>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default DiscussionDetail; 