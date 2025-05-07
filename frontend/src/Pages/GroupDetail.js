import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from '../components/common/Image';
import { IMAGE_URLS } from '../constants/imageUrls';

const GroupDetailContainer = styled.div`
  padding: 120px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BannerSection = styled.div`
  position: relative;
  height: 400px;
  background-image: url(${IMAGE_URLS.banners.baking});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  margin-bottom: 30px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 15px;
  }
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  color: white;
  z-index: 1;

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  p {
    font-size: 1.2rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 30px;
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StatBox = styled.div`
  text-align: center;
  
  h3 {
    font-size: 1.8rem;
    color: #ff6b6b;
    margin: 0;
  }
  
  p {
    color: #666;
    margin: 5px 0 0;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const TabButton = styled.button`
  padding: 12px 24px;
  background: ${props => props.active ? '#ff6b6b' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:hover {
    background: #ff5252;
    transform: translateY(-2px);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  input, textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  button {
    padding: 12px;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    
    &:hover {
      background: #ff5252;
    }
  }
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const RecipeCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const RecipeContent = styled.div`
  padding: 15px;

  h3 {
    margin: 0 0 10px;
    color: #333;
  }

  p {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
  }
`;

const DiscussionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const MemberCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
    object-fit: cover;
  }

  h3 {
    margin: 0;
    color: #333;
  }

  p {
    color: #666;
    margin: 5px 0;
  }
`;

const GroupDetail = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);
  const [showNewRecipeModal, setShowNewRecipeModal] = useState(false);
  
  // Form states
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: null
  });

  // Data states
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: 'Artisan Sourdough Bread',
      description: 'Perfect crusty sourdough with open crumb',
      image: IMAGE_URLS.recipes.sourdoughBread,
      author: 'Sarah Baker',
      likes: 23
    },
    {
      id: 2,
      title: 'French Croissants',
      description: 'Flaky, buttery homemade croissants',
      image: IMAGE_URLS.recipes.croissants,
      author: 'Michel Laurent',
      likes: 45
    },
    {
      id: 3,
      title: 'Chocolate Babka',
      description: 'Rich chocolate swirled bread',
      image: IMAGE_URLS.recipes.chocolateBabka,
      author: 'Rachel Green',
      likes: 31
    }
  ]);

  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'Best flour for sourdough?',
      content: "What's your preferred flour brand for making sourdough bread?",
      author: 'Jane Smith',
      date: '2/10/2024',
      replies: 0
    },
    {
      id: 2,
      title: 'Troubleshooting dense bread',
      content: 'My bread keeps coming out dense. Any tips?',
      author: 'Mike Johnson',
      date: '2/9/2024',
      replies: 5
    }
  ]);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Sarah Baker',
      role: 'Group Admin',
      avatar: IMAGE_URLS.avatars.sarah,
      recipes: 15
    },
    {
      id: 2,
      name: 'Michel Laurent',
      role: 'Master Baker',
      avatar: IMAGE_URLS.avatars.michel,
      recipes: 8
    },
    {
      id: 3,
      name: 'Rachel Green',
      role: 'Pastry Chef',
      avatar: IMAGE_URLS.avatars.rachel,
      recipes: 12
    }
  ]);

  const handleNewDiscussion = (e) => {
    e.preventDefault();
    const newDiscussionItem = {
      id: discussions.length + 1,
      ...newDiscussion,
      author: 'Current User',
      date: new Date().toLocaleDateString(),
      replies: 0
    };
    setDiscussions([newDiscussionItem, ...discussions]);
    setNewDiscussion({ title: '', content: '' });
    setShowNewDiscussionModal(false);
  };

  const handleNewRecipe = (e) => {
    e.preventDefault();
    const newRecipeItem = {
      id: recipes.length + 1,
      ...newRecipe,
      author: 'Current User',
      likes: 0,
      image: newRecipe.image ? URL.createObjectURL(newRecipe.image) : 'https://images.unsplash.com/photo-1555507036-ab1f4038808a'
    };
    setRecipes([newRecipeItem, ...recipes]);
    setNewRecipe({
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      image: null
    });
    setShowNewRecipeModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewRecipe({ ...newRecipe, image: file });
    }
  };

  return (
    <GroupDetailContainer>
      <BannerSection>
        <Image 
          src={IMAGE_URLS.banners.baking}
          alt="Baking Banner"
          height="400px"
          borderRadius="15px"
          fallbackType="banners"
        />
        <BannerContent>
          <h1>Baking Enthusiasts</h1>
          <p>A group for sharing baking tips and recipes</p>
        </BannerContent>
      </BannerSection>

      <StatsContainer>
        <StatBox>
          <h3>150</h3>
          <p>Members</p>
        </StatBox>
        <StatBox>
          <h3>3</h3>
          <p>Recipes</p>
        </StatBox>
      </StatsContainer>

      <TabContainer>
        <TabButton 
          active={activeTab === 'recipes'} 
          onClick={() => setActiveTab('recipes')}
        >
          Recipes
        </TabButton>
        <TabButton 
          active={activeTab === 'discussions'} 
          onClick={() => setActiveTab('discussions')}
        >
          Discussions
        </TabButton>
        <TabButton 
          active={activeTab === 'members'} 
          onClick={() => setActiveTab('members')}
        >
          Members
        </TabButton>
      </TabContainer>

      {activeTab === 'recipes' && (
        <div>
          <ActionButton onClick={() => setShowNewRecipeModal(true)}>
            Share Recipe
          </ActionButton>
          <RecipeGrid>
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id}>
                <Image 
                  src={recipe.image}
                  alt={recipe.title}
                  height="200px"
                  borderRadius="12px 12px 0 0"
                  fallbackType="recipes"
                />
                <RecipeContent>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  <p style={{ marginTop: '10px' }}>
                    By {recipe.author} • ❤️ {recipe.likes}
                  </p>
                </RecipeContent>
              </RecipeCard>
            ))}
          </RecipeGrid>
        </div>
      )}

      {activeTab === 'discussions' && (
        <div>
          <ActionButton onClick={() => setShowNewDiscussionModal(true)}>
            New Discussion
          </ActionButton>
          {discussions.map(discussion => (
            <DiscussionCard key={discussion.id}>
              <h3>{discussion.title}</h3>
              <p>{discussion.content}</p>
              <small>
                {discussion.author} • {discussion.date} • 
                {discussion.replies} {discussion.replies === 1 ? 'reply' : 'replies'}
              </small>
            </DiscussionCard>
          ))}
        </div>
      )}

      {activeTab === 'members' && (
        <MemberGrid>
          {members.map(member => (
            <MemberCard key={member.id}>
              <Image 
                src={member.avatar}
                alt={member.name}
                width="100px"
                height="100px"
                objectFit="cover"
                borderRadius="50%"
                fallbackType="avatars"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>{member.recipes} recipes shared</p>
            </MemberCard>
          ))}
        </MemberGrid>
      )}

      {showNewDiscussionModal && (
        <Modal>
          <ModalContent>
            <h2>Start New Discussion</h2>
            <Form onSubmit={handleNewDiscussion}>
              <input
                type="text"
                placeholder="Discussion Title"
                value={newDiscussion.title}
                onChange={(e) => setNewDiscussion({
                  ...newDiscussion,
                  title: e.target.value
                })}
                required
              />
              <textarea
                placeholder="What would you like to discuss?"
                value={newDiscussion.content}
                onChange={(e) => setNewDiscussion({
                  ...newDiscussion,
                  content: e.target.value
                })}
                rows="5"
                required
              />
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowNewDiscussionModal(false)}>
                  Cancel
                </button>
                <button type="submit">Post Discussion</button>
              </div>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {showNewRecipeModal && (
        <Modal>
          <ModalContent>
            <h2>Share New Recipe</h2>
            <Form onSubmit={handleNewRecipe}>
              <input
                type="text"
                placeholder="Recipe Title"
                value={newRecipe.title}
                onChange={(e) => setNewRecipe({
                  ...newRecipe,
                  title: e.target.value
                })}
                required
              />
              <textarea
                placeholder="Recipe Description"
                value={newRecipe.description}
                onChange={(e) => setNewRecipe({
                  ...newRecipe,
                  description: e.target.value
                })}
                rows="3"
                required
              />
              <textarea
                placeholder="Ingredients (one per line)"
                value={newRecipe.ingredients}
                onChange={(e) => setNewRecipe({
                  ...newRecipe,
                  ingredients: e.target.value
                })}
                rows="5"
                required
              />
              <textarea
                placeholder="Instructions (step by step)"
                value={newRecipe.instructions}
                onChange={(e) => setNewRecipe({
                  ...newRecipe,
                  instructions: e.target.value
                })}
                rows="5"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowNewRecipeModal(false)}>
                  Cancel
                </button>
                <button type="submit">Share Recipe</button>
              </div>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </GroupDetailContainer>
  );
};

export default GroupDetail; 