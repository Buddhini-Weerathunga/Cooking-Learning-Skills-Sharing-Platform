import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import local images
import sourdoughBread from '../assets/images/recipes/sourdough-bread.jpeg';
import croissants from '../assets/images/recipes/croissants.jpeg';
import artisanBread from '../assets/images/recipes/artisan-bread.jpeg';
import frenchBaguettes from '../assets/images/recipes/french-baguettes.jpeg';
import cinnamonRolls from '../assets/images/recipes/cinnamon-rolls.jpeg';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const HeroSection = styled.div`
  position: relative;
  height: 60vh;
  background-image: url(${artisanBread});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3));
  }
`;

const HeroContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 20px;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  p {
    font-size: 1.2rem;
    max-width: 600px;
    margin-bottom: 30px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: -100px auto 0;
  padding: 0 20px;
  position: relative;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    font-size: 2.5rem;
    color: #ff6b6b;
    margin: 0;
  }

  p {
    color: #666;
    margin: 10px 0 0;
    font-size: 1.1rem;
  }
`;

const TabContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 40px;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

const TabButton = styled.button`
  padding: 12px 24px;
  border: none;
  background: ${props => props.active ? '#ff6b6b' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#ff6b6b' : '#f0f0f0'};
  }
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const RecipeCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const RecipeContent = styled.div`
  padding: 20px;

  h3 {
    margin: 0 0 10px;
    color: #333;
  }

  p {
    color: #666;
    margin: 0;
    line-height: 1.5;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 12px 24px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #ff5252;
  }
`;

const CommunityGroup = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [recipes] = useState([
    {
      id: 1,
      title: 'Classic Sourdough Bread',
      description: 'A perfect crusty sourdough with open crumb structure',
      image: sourdoughBread,
      author: 'Sarah Baker',
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      title: 'Buttery Croissants',
      description: 'Traditional French croissants with flaky layers',
      image: croissants,
      author: 'Michel Laurent',
      likes: 189,
      comments: 32
    },
    {
      id: 3,
      title: 'Artisan Bread',
      description: 'Simple yet delicious artisan bread recipe',
      image: artisanBread,
      author: 'John Doe',
      likes: 156,
      comments: 28
    },
    {
      id: 4,
      title: 'French Baguettes',
      description: 'Authentic French baguettes with crispy crust',
      image: frenchBaguettes,
      author: 'Marie Claire',
      likes: 145,
      comments: 23
    },
    {
      id: 5,
      title: 'Cinnamon Rolls',
      description: 'Soft and gooey homemade cinnamon rolls',
      image: cinnamonRolls,
      author: 'Emily White',
      likes: 278,
      comments: 52
    }
  ]);

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Baking Enthusiasts Community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join our passionate community of bakers, share recipes, and master the art of baking together
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community
            </ActionButton>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <MainContent>
        <StatsGrid>
          <StatCard
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>1.2K</h3>
            <p>Members</p>
          </StatCard>
          <StatCard
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>450+</h3>
            <p>Recipes Shared</p>
          </StatCard>
          <StatCard
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>89</h3>
            <p>Active Discussions</p>
          </StatCard>
        </StatsGrid>

        <TabContainer>
          <TabButtons>
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
          </TabButtons>

          {activeTab === 'recipes' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Latest Recipes</h2>
                <ActionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Share Recipe
                </ActionButton>
              </div>
              <RecipeGrid>
                {recipes.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <img src={recipe.image} alt={recipe.title} />
                    <RecipeContent>
                      <h3>{recipe.title}</h3>
                      <p>{recipe.description}</p>
                      <div className="meta">
                        <span>By {recipe.author}</span>
                        <div>
                          <span>❤️ {recipe.likes}</span>
                          <span style={{ marginLeft: '15px' }}>💬 {recipe.comments}</span>
                        </div>
                      </div>
                    </RecipeContent>
                  </RecipeCard>
                ))}
              </RecipeGrid>
            </div>
          )}
        </TabContainer>
      </MainContent>
    </PageContainer>
  );
};

export default CommunityGroup; 