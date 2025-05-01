import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, Button, Card, Carousel, Modal } from 'react-bootstrap';
import { mockGroups, mockDiscussions } from './mockData';
import './GroupDetail.css';
import RecipeForm from './components/RecipeForm';
import DiscussionForm from './components/DiscussionForm';
import CommentForm from './components/CommentForm';

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [activeTab, setActiveTab] = useState('recipes');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editingDiscussion, setEditingDiscussion] = useState(null);

  // Banner carousel images
  const bannerImages = [
    {
      url: '/images/baking-banner1.jpg',
      title: 'Artisan Baking',
      description: 'Master the art of bread making'
    },
    {
      url: '/images/baking-banner2.jpg',
      title: 'Pastry Perfection',
      description: 'Create beautiful pastries'
    },
    {
      url: '/images/baking-banner3.jpg',
      title: 'Sweet Creations',
      description: 'Explore dessert making'
    }
  ];

  // Featured recipes/posts
  const featuredItems = [
    {
      id: 1,
      title: 'Artisan Sourdough Bread',
      image: '/images/sourdough.jpg',
      author: 'Jane Smith',
      likes: 156,
      category: 'Bread'
    },
    {
      id: 2,
      title: 'Perfect Croissants',
      image: '/images/croissants.jpg',
      author: 'Mike Johnson',
      likes: 142,
      category: 'Pastries'
    },
    {
      id: 3,
      title: 'French Macarons',
      image: '/images/macarons.jpg',
      author: 'Sarah Wilson',
      likes: 198,
      category: 'Desserts'
    }
  ];

  useEffect(() => {
    const foundGroup = mockGroups.find(g => g.id === groupId);
    setGroup(foundGroup);
  }, [groupId]);

  // Recipe handlers
  const handleCreateRecipe = (formData) => {
    // TODO: Implement API call
    console.log('Creating recipe:', formData);
    setShowRecipeForm(false);
  };

  const handleUpdateRecipe = (formData) => {
    // TODO: Implement API call
    console.log('Updating recipe:', formData);
    setShowRecipeForm(false);
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      // TODO: Implement API call
      console.log('Deleting recipe:', recipeId);
    }
  };

  // Discussion handlers
  const handleCreateDiscussion = (formData) => {
    // TODO: Implement API call
    console.log('Creating discussion:', formData);
    setShowDiscussionForm(false);
  };

  const handleUpdateDiscussion = (formData) => {
    // TODO: Implement API call
    console.log('Updating discussion:', formData);
    setShowDiscussionForm(false);
    setEditingDiscussion(null);
  };

  const handleDeleteDiscussion = (discussionId) => {
    if (window.confirm('Are you sure you want to delete this discussion?')) {
      // TODO: Implement API call
      console.log('Deleting discussion:', discussionId);
    }
  };

  // Comment handlers
  const handleCreateComment = (content, parentId = null) => {
    // TODO: Implement API call
    console.log('Creating comment:', content, 'for parent:', parentId);
  };

  if (!group) return <div>Loading...</div>;

  return (
    <div className="group-detail-page">
      {/* Hero Carousel Section */}
      <Carousel className="hero-carousel">
        {bannerImages.map((image, index) => (
          <Carousel.Item key={index}>
            <div 
              className="carousel-image" 
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <Container>
                <div className="carousel-content">
                  <h2>{image.title}</h2>
                  <p>{image.description}</p>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Group Info Section */}
      <Container className="group-info-section">
        <Row>
          <Col md={8}>
            <h1>{group.name}</h1>
            <p className="lead">{group.description}</p>
          </Col>
          <Col md={4} className="text-end">
            <div className="group-stats">
              <div className="stat-item">
                <i className="fas fa-users"></i>
                <span>{group.memberCount}</span>
                <label>Members</label>
              </div>
              <div className="stat-item">
                <i className="fas fa-book-open"></i>
                <span>{featuredItems.length}</span>
                <label>Recipes</label>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Navigation Section */}
      <div className="sticky-nav">
        <Container>
          <Nav variant="pills" className="justify-content-center" activeKey={activeTab}>
            <Nav.Item>
              <Nav.Link 
                eventKey="recipes" 
                onClick={() => setActiveTab('recipes')}
              >
                <i className="fas fa-utensils"></i> Recipes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="discussions" 
                onClick={() => setActiveTab('discussions')}
              >
                <i className="fas fa-comments"></i> Discussions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="members" 
                onClick={() => setActiveTab('members')}
              >
                <i className="fas fa-users"></i> Members
              </Nav.Link>
            </Nav.Item>
            <Button 
              variant="primary" 
              className="share-btn"
              onClick={() => setShowShareModal(true)}
            >
              <i className="fas fa-plus"></i> Share Recipe
            </Button>
          </Nav>
        </Container>
      </div>

      <Container className="main-content">
        {activeTab === 'recipes' && (
          <>
            {/* Categories Section */}
            <section className="categories-section">
              <h2>Recipe Categories</h2>
              <div className="category-pills">
                {['All', 'Bread', 'Pastries', 'Desserts', 'Cakes', 'Cookies'].map(category => (
                  <Button 
                    key={category} 
                    variant="outline-primary" 
                    className="category-pill"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </section>

            {/* Featured Recipes */}
            <section className="featured-section">
              <h2>Featured Recipes</h2>
              <Row>
                {featuredItems.map(item => (
                  <Col md={4} key={item.id}>
                    <Card className="recipe-card">
                      <div className="card-image-wrapper">
                        <Card.Img variant="top" src={item.image} />
                        <div className="card-category">{item.category}</div>
                      </div>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <div className="card-meta">
                          <span className="author">
                            <i className="fas fa-user"></i> {item.author}
                          </span>
                          <span className="likes">
                            <i className="fas fa-heart"></i> {item.likes}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          </>
        )}

        {activeTab === 'discussions' && (
          <section className="discussions-section">
            <div className="section-header">
              <h2>Discussions</h2>
              <Button variant="primary">
                <i className="fas fa-plus"></i> New Discussion
              </Button>
            </div>
            <Row>
              {mockDiscussions.map(discussion => (
                <Col md={12} key={discussion.id}>
                  <Card className="discussion-card">
                    <Card.Body>
                      <div className="discussion-header">
                        <h3>{discussion.title}</h3>
                        <span className="badge bg-primary">{discussion.replies.length} replies</span>
                      </div>
                      <Card.Text>{discussion.content}</Card.Text>
                      <div className="discussion-meta">
                        <span>
                          <i className="fas fa-user"></i> {discussion.author}
                        </span>
                        <span>
                          <i className="fas fa-clock"></i> {new Date(discussion.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        )}

        {activeTab === 'members' && (
          <section className="members-section">
            <h2>Group Members</h2>
            <Row>
              {group.members?.map(member => (
                <Col md={3} key={member.id}>
                  <Card className="member-card">
                    <Card.Img variant="top" src={member.avatar} />
                    <Card.Body>
                      <Card.Title>{member.name}</Card.Title>
                      <Card.Text>
                        <span className="badge bg-secondary">{member.role}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        )}
      </Container>

      {/* Share Recipe Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Share Your Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your recipe form here */}
        </Modal.Body>
      </Modal>

      {/* Recipe Form Modal */}
      <RecipeForm
        show={showRecipeForm}
        handleClose={() => {
          setShowRecipeForm(false);
          setEditingRecipe(null);
        }}
        handleSubmit={editingRecipe ? handleUpdateRecipe : handleCreateRecipe}
        initialData={editingRecipe}
      />

      {/* Discussion Form Modal */}
      <DiscussionForm
        show={showDiscussionForm}
        handleClose={() => {
          setShowDiscussionForm(false);
          setEditingDiscussion(null);
        }}
        handleSubmit={editingDiscussion ? handleUpdateDiscussion : handleCreateDiscussion}
        initialData={editingDiscussion}
      />
    </div>
  );
};

export default GroupDetail; 