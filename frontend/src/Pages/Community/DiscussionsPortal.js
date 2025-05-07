import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaComments, FaUser, FaCalendarAlt, FaTag } from 'react-icons/fa';
import './DiscussionsPortal.css';
import rachelGreen from '../../assets/images/avatars/rachel-green.jpeg';
import michelLaurent from '../../assets/images/avatars/michel-laurent.jpeg';
import sarahBaker from '../../assets/images/avatars/sarah-baker.jpeg';
import defaultAvatar from '../../assets/images/avatars/default-avatar.jpeg';
import axios from 'axios';

const DiscussionsPortal = () => {
  const [discussions, setDiscussions] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDiscussion, setCurrentDiscussion] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Mock discussions data
  const mockDiscussions = [
    {
      id: 1,
      title: 'Best Italian Pasta Recipes',
      content: 'Share your favorite Italian pasta recipes here!',
      author: 'Rachel Green',
      avatar: rachelGreen,
      date: '2023-10-01',
      category: 'recipes',
      tags: ['pasta', 'italian', 'dinner'],
      comments: [
        { id: 1, author: 'John', content: 'Try this carbonara recipe!', date: '2023-10-02' },
        { id: 2, author: 'Sarah', content: 'I love making homemade ravioli!', date: '2023-10-03' }
      ]
    },
    {
      id: 2,
      title: 'Cooking Tips for Beginners',
      content: 'What are your best tips for new cooks?',
      author: 'Michel Laurent',
      avatar: michelLaurent,
      date: '2023-10-05',
      category: 'tips',
      tags: ['beginner', 'tips', 'cooking'],
      comments: [
        { id: 1, author: 'Mike', content: 'Always read the recipe twice!', date: '2023-10-06' }
      ]
    },
    {
      id: 3,
      title: 'Vegetarian Meal Ideas',
      content: 'Looking for vegetarian meal inspiration!',
      author: 'Sarah Baker',
      avatar: sarahBaker,
      date: '2023-10-10',
      category: 'recipes',
      tags: ['vegetarian', 'meals', 'healthy'],
      comments: []
    },
    {
      id: 4,
      title: 'Quick Weeknight Dinners',
      content: 'Share your go-to quick dinner recipes!',
      author: 'Chef Maria',
      avatar: defaultAvatar,
      date: '2023-10-12',
      category: 'recipes',
      tags: ['quick', 'dinner', 'easy'],
      comments: []
    }
  ];

  useEffect(() => {
    // Simulate API call
    setDiscussions(mockDiscussions);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleCreateDiscussion = async () => {
    let avatarUrl = defaultAvatar; // fallback
    // 1. Upload the image if selected
    if (imageFile) {
      const formDataImg = new FormData();
      formDataImg.append('file', imageFile);
      try {
        const uploadRes = await axios.post('http://localhost:8080/api/discussions/upload', formDataImg, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        avatarUrl = uploadRes.data.url;
      } catch (err) {
        alert('Image upload failed. Please try again.');
        return;
      }
    }
    // 2. Create the discussion with the avatar URL
    const payload = {
      ...formData,
      author: 'Current User',
      avatar: avatarUrl,
      date: new Date().toISOString().split('T')[0],
      comments: []
    };
    if (Array.isArray(payload.tags)) {
      payload.tags = payload.tags.join(',');
    }
    try {
      const response = await axios.post('http://localhost:8080/api/discussions', payload);
      const newDiscussion = {
        ...response.data,
        tags: response.data.tags
          ? response.data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
          : []
      };
      setDiscussions([...discussions, newDiscussion]);
      setShowCreateModal(false);
      setFormData({ title: '', content: '', category: 'general', tags: '' });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      alert('Failed to create discussion. Please try again.');
    }
  };

  const handleEditDiscussion = () => {
    const updatedDiscussions = discussions.map(discussion =>
      discussion.id === currentDiscussion.id
        ? { ...discussion, ...formData }
        : discussion
    );
    setDiscussions(updatedDiscussions);
    setShowEditModal(false);
    setCurrentDiscussion(null);
    setFormData({ title: '', content: '', category: 'general', tags: '' });
  };

  const handleDeleteDiscussion = () => {
    const filteredDiscussions = discussions.filter(discussion => discussion.id !== currentDiscussion.id);
    setDiscussions(filteredDiscussions);
    setShowDeleteModal(false);
    setCurrentDiscussion(null);
  };

  const openEditModal = (discussion) => {
    setCurrentDiscussion(discussion);
    setFormData({
      title: discussion.title,
      content: discussion.content,
      category: discussion.category,
      tags: discussion.tags.join(', ')
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (discussion) => {
    setCurrentDiscussion(discussion);
    setShowDeleteModal(true);
  };

  // Helper to generate avatar color and initials
  const getAvatarColor = (name) => {
    // Simple hash to pick a color
    const colors = ['#ff9800', '#2196f3', '#4caf50', '#e91e63', '#9c27b0', '#f44336', '#00bcd4'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="discussions-portal">
      <div className="discussions-header">
        <div className="header-content">
          <h1>
            <span role="img" aria-label="discussion">💬</span> Easy Chef Community Discussions
          </h1>
          <p className="lead">Ask questions, share tips, and help each other grow as chefs!</p>
        </div>
        <button className="create-discussion-btn" onClick={() => setShowCreateModal(true)}>
          <FaPlus /> Start Discussion
        </button>
      </div>

      <div className="discussions-list">
        {discussions.map(discussion => (
          <div key={discussion.id} className="discussion-card">
            <div className="discussion-badge">
              <span role="img" aria-label="discussion">🗨️</span> Discussion
            </div>
            <div className="discussion-content-wrapper">
              <div className="discussion-main">
                <div className="discussion-tags">
                  {(Array.isArray(discussion.tags)
                    ? discussion.tags
                    : (discussion.tags ? discussion.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [])
                  ).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <h2>{discussion.title}</h2>
                <p className="discussion-content">{discussion.content}</p>
                <div className="discussion-meta">
                  <span>
                    {/* Avatar */}
                    <span className="avatar" style={{ backgroundColor: !discussion.avatar ? getAvatarColor(discussion.author) : 'transparent', color: !discussion.avatar ? 'white' : 'inherit' }}>
                      {discussion.avatar ? (
                        <img
                          src={discussion.avatar}
                          alt={discussion.author}
                          style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                        />
                      ) : (
                        getInitials(discussion.author)
                      )}
                    </span>
                    <FaUser /> {discussion.author}
                  </span>
                  <span><FaCalendarAlt /> {discussion.date}</span>
                  <span><FaTag /> {discussion.category}</span>
                </div>
              </div>
              <div className="discussion-sidebar">
                <div className="discussion-comments">
                  <FaComments /> {discussion.comments.length}
                </div>
                <div className="discussion-actions">
                  <button onClick={() => openEditModal(discussion)} className="edit-btn">
                    <FaEdit />
                  </button>
                  <button onClick={() => openDeleteModal(discussion)} className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Discussion Modal */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Start New Discussion</h2>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="general">General</option>
              <option value="recipes">Recipes</option>
              <option value="tips">Tips</option>
            </select>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: 10 }}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ width: 60, height: 60, borderRadius: '50%', marginTop: 10 }} />
            )}
            <div className="modal-actions">
              <button onClick={handleCreateDiscussion}>Create</button>
              <button onClick={() => setShowCreateModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Discussion Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Discussion</h2>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="general">General</option>
              <option value="recipes">Recipes</option>
              <option value="tips">Tips</option>
            </select>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleEditDiscussion}>Save</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Discussion Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Discussion</h2>
            <p>Are you sure you want to delete this discussion?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteDiscussion}>Delete</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionsPortal; 