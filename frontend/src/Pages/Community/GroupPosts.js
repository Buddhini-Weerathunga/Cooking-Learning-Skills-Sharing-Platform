import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Dropdown } from 'react-bootstrap';
import { mockPosts } from './mockData';
import PostForm from './components/PostForm';

const GroupPosts = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [groupId]);

  const fetchPosts = () => {
    const groupPosts = mockPosts.filter(p => p.groupId === groupId);
    setPosts(groupPosts);
  };

  const handleCreatePost = (formData) => {
    const newPost = {
      id: Date.now().toString(),
      groupId,
      ...formData,
      author: "Current User",
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    mockPosts.push(newPost);
    fetchPosts();
  };

  const handleUpdatePost = (formData) => {
    const index = mockPosts.findIndex(p => p.id === editingPost.id);
    if (index !== -1) {
      mockPosts[index] = {
        ...mockPosts[index],
        ...formData,
        updatedAt: new Date().toISOString()
      };
      fetchPosts();
    }
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const index = mockPosts.findIndex(p => p.id === postId);
      if (index !== -1) {
        mockPosts.splice(index, 1);
        fetchPosts();
      }
    }
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Container>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(`/community/groups/${groupId}`)}
          className="mb-3"
        >
          ← Back to Group
        </Button>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Posts</h2>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            Create New Post
          </Button>
        </div>

        {posts.map(post => (
          <Card key={post.id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title>
                  <Link to={`/community/groups/${groupId}/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </Card.Title>
                <Dropdown>
                  <Dropdown.Toggle variant="link" id={`post-${post.id}-actions`}>
                    ⋮
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                      setEditingPost(post);
                      setShowForm(true);
                    }}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item 
                      onClick={() => handleDeletePost(post.id)}
                      className="text-danger"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Card.Text>{post.content}</Card.Text>
              {post.image && (
                <img 
                  src={post.image} 
                  alt="Post content" 
                  style={{ maxWidth: '100%', marginBottom: '1rem' }} 
                />
              )}
              {post.tags?.length > 0 && (
                <div className="mb-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="badge bg-secondary me-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <Card.Footer className="text-muted">
                Posted by {post.author} on {new Date(post.createdAt).toLocaleDateString()}
                {post.updatedAt && ' (edited)'} • {post.likes} likes
              </Card.Footer>
            </Card.Body>
          </Card>
        ))}

        <PostForm
          show={showForm}
          handleClose={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
          handleSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          initialData={editingPost}
        />
      </Container>
    </div>
  );
};

export default GroupPosts; 