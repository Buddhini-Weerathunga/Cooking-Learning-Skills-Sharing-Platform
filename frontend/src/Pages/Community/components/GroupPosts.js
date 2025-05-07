import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const GroupPosts = ({ groupId }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: '', attachments: [] });

  useEffect(() => {
    fetchPosts();
  }, [groupId]);

  const fetchPosts = async () => {
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/groups/${groupId}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/groups/${groupId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      
      if (response.ok) {
        fetchPosts();
        setNewPost({ content: '', attachments: [] });
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h3>Posts</h3>
      
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Share something with the group..."
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            multiple
            onChange={(e) => setNewPost({...newPost, attachments: Array.from(e.target.files)})}
          />
        </Form.Group>
        <Button type="submit">Share Post</Button>
      </Form>

      {posts.map((post) => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
            {post.attachments && post.attachments.length > 0 && (
              <div className="post-attachments">
                {post.attachments.map((attachment, index) => (
                  <img 
                    key={index}
                    src={attachment.url}
                    alt={`Attachment ${index + 1}`}
                    style={{ maxWidth: '200px', marginRight: '10px' }}
                  />
                ))}
              </div>
            )}
            <Card.Footer className="text-muted">
              Posted by {post.author} on {new Date(post.createdAt).toLocaleDateString()}
            </Card.Footer>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GroupPosts; 