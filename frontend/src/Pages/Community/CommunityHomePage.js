import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, Button, Card, Carousel, Modal } from 'react-bootstrap';
import { mockGroups, mockDiscussions } from './mockData';
import './CommunityHomePage.css';
import RecipeForm from './components/RecipeForm';
import DiscussionForm from './components/DiscussionForm';
import CommentForm from './components/CommentForm';

import sourdoughImg from '../../assets/images/recipes/sourdough-bread.jpeg';
import croissantsImg from '../../assets/images/recipes/croissants.jpeg';
import macaronsImg from '../../assets/images/recipes/french-baguettes.jpeg';
import banner1 from '../../assets/images/banners/bread-banner.jpeg';
import banner2 from '../../assets/images/banners/pastry-banner.jpeg';
import banner3 from '../../assets/images/banners/baking-banner.jpeg';
import bakingTexture from '../../assets/images/banners/baking-texture.png';

const CommunityHomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recipes');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editingDiscussion, setEditingDiscussion] = useState(null);

  const bannerImages = [
    { url: banner1, title: 'Artisan Baking', description: 'Master the art of bread making' },
    { url: banner2, title: 'Pastry Perfection', description: 'Create beautiful pastries' },
    { url: banner3, title: 'Sweet Creations', description: 'Explore dessert making' }
  ];

  const featuredItems = [
    { id: 1, title: 'Artisan Sourdough Bread', image: sourdoughImg, author: 'Jane Smith', likes: 156, category: 'Bread' },
    { id: 2, title: 'Perfect Croissants', image: croissantsImg, author: 'Mike Johnson', likes: 142, category: 'Pastries' },
    { id: 3, title: 'French Baguettes', image: macaronsImg, author: 'Sarah Wilson', likes: 198, category: 'Desserts' }
  ];

  return (
    <div className="group-detail-page" style={{ minHeight: '100vh', background: '#faf6f1', paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 }}>
      <Carousel className="hero-carousel" interval={2000} pause={false}>
        {bannerImages.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-image" style={{ backgroundImage: `url(${image.url})` }}>
              <Container>
                <div className="carousel-content" style={{ color: '#ff6a00', textShadow: '2px 2px 6px rgba(0,0,0,0.5)' }}>
                  <h2>{image.title}</h2>
                  <p>{image.description}</p>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div
        className="group-info-section w-100"
        style={{
          backgroundImage: `linear-gradient(135deg, #fff6f0, #ffece3), url(${bakingTexture})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          padding: '50px 100px'
        }}
      >
        <Container fluid>
          <Row>
            <Col md={8}>
              <h1 style={{ color: '#ff6a00', fontWeight: 'bold', fontSize: '2.8rem', animation: 'fadeInDown 1s ease' }}>Welcome to the Easy Chef Community!</h1>
              <p className="lead" style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'grey', fontWeight: '500' }}>
                👨‍🍳 A vibrant space to exchange baking secrets, share delicious recipes, and connect with fellow baking lovers! 
                Whether you're a beginner or a seasoned pro, this community is the perfect place to rise together and make baking even sweeter.
              </p>
            </Col>
            <Col md={4} className="text-end">
              <div className="group-stats">
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <span><i className="fas fa-user-friends me-1"></i>{mockGroups.length}</span>
                  <label>Groups</label>
                </div>
                <div className="stat-item">
                  <i className="fas fa-book-open"></i>
                  <span><i className="fas fa-utensils me-1"></i>{featuredItems.length}</span>
                  <label>Recipes</label>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="sticky-nav" style={{ backgroundColor: '#ffcc80', borderBottom: '1px solid #ff6a00', padding: '12px 0' }}>
        <Container>
          <Nav variant="pills" className="justify-content-center" activeKey={activeTab}>
            <Nav.Item className="mx-4 nav-animated">
              <Nav.Link
                eventKey="recipes"
                onClick={() => setActiveTab('recipes')}
                style={{ fontWeight: 'bold', color: 'black', backgroundColor: '#ff6a00', transition: 'all 0.3s ease', padding: '6px 16px', borderRadius: '8px' }}
              >
                Recipes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mx-4 nav-animated">
              <Nav.Link
                eventKey="discussions"
                onClick={() => navigate('/community/discussions')}
                style={{ fontWeight: 'bold', color: 'black', backgroundColor: '#ff6a00', transition: 'all 0.3s ease', padding: '6px 16px', borderRadius: '8px' }}
              >
                Discussions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mx-4 nav-animated">
              <Nav.Link
                as={Link}
                to="/community/groups/create"
                eventKey="groups"
                style={{ fontWeight: 'bold', color: 'black', backgroundColor: '#ff6a00', transition: 'all 0.3s ease', padding: '6px 16px', borderRadius: '8px' }}
              >
                Groups
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mx-4 nav-animated">
              <Nav.Link
                eventKey="posts"
                onClick={() => navigate('/community/groups/1/posts')}
                style={{ fontWeight: 'bold', color: 'black', backgroundColor: '#ff6a00', transition: 'all 0.3s ease', padding: '6px 16px', borderRadius: '8px' }}
              >
                Posts
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>

      <div className="main-content" style={{ marginTop: '1rem', marginBottom: 0 }}>
        {activeTab === 'recipes' && (
          <section className="featured-section" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px 1rem 40px' }}>
            <h2 className="text-center mb-4" style={{ fontWeight: '700', color: '#333' }}>Featured Recipes</h2>
            <Row>
              {featuredItems.map(item => (
                <Col md={4} key={item.id} className="mb-4">
                  <Card className="recipe-card h-100 shadow-sm border-0" style={{ backgroundColor: '#ffe0b2' }}>
                    <div className="card-image-wrapper position-relative">
                      <Card.Img
                        variant="top"
                        src={item.image}
                        style={{ height: 'auto', width: '100%', objectFit: 'contain', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                      />
                      <div className="position-absolute top-0 end-0 m-2 px-2 py-1 bg-light text-dark rounded-pill small shadow-sm">
                        {item.category}
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title className="mb-1" style={{ fontWeight: '600' }}>{item.title}</Card.Title>
                      <div className="d-flex justify-content-between text-muted small">
                        <span>{item.author}</span>
                        <span><i className="fas fa-heart me-1 text-danger"></i>{item.likes}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        )}
      </div>
    </div>
  );
};

export default CommunityHomePage;

