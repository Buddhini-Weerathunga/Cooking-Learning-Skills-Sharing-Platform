import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form } from 'react-bootstrap';

const PostDetail = () => {
  const { groupId, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // TODO: Fetch post details and comments
  }, [postId]);

  const handleComment = (e) => {
    e.preventDefault();
    // TODO: Implement comment submission
    setNewComment('');
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Container>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(`/community/groups/${groupId}/posts`)}
          className="mb-3"
        >
          ← Back to Posts
        </Button>

        {post ? (
          <>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    style={{ maxWidth: '100%', marginBottom: '1rem' }} 
                  />
                )}
                <small className="text-muted">
                  Posted by {post.author} on {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </Card.Body>
            </Card>

            <h4>Comments</h4>
            {comments.map(comment => (
              <Card key={comment.id} className="mb-3">
                <Card.Body>
                  <Card.Text>{comment.content}</Card.Text>
                  <small className="text-muted">
                    Comment by {comment.author} on {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </Card.Body>
              </Card>
            ))}

            <Form onSubmit={handleComment} className="mt-4">
              <Form.Group className="mb-3">
                <Form.Label>Your Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Post Comment
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


export default PostDetail; 