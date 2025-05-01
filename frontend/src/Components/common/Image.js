import React, { useState } from 'react';
import styled from 'styled-components';
import { IMAGE_URLS } from '../../constants/imageUrls';

const ImageContainer = styled.div`
  position: relative;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: ${props => props.borderRadius || '0'};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  transition: opacity 0.3s ease;
  opacity: ${props => props.isLoaded ? 1 : 0};
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Image = ({ 
  src, 
  alt, 
  width, 
  height, 
  objectFit,
  borderRadius,
  fallbackType = 'recipe' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  const getFallbackImage = () => {
    return IMAGE_URLS[fallbackType]?.default || IMAGE_URLS.recipes.defaultRecipe;
  };

  return (
    <ImageContainer width={width} height={height} borderRadius={borderRadius}>
      <StyledImage
        src={error ? getFallbackImage() : src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        isLoaded={isLoaded}
        objectFit={objectFit}
      />
      {!isLoaded && (
        <LoadingOverlay>
          <div>Loading...</div>
        </LoadingOverlay>
      )}
    </ImageContainer>
  );
};

export default Image; 