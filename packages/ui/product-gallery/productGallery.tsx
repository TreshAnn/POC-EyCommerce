import { Carousel } from '@mantine/carousel';
import React, { useState } from 'react';

import {
  CarouselContainer,
  LeftColumn,
  ProductList,
  RightColumn,
  SelectedImage,
  StyledContainer,
  Thumbnail,
} from '../product-gallery/style';

const imageUrls = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6pJrM3THonook4QahSDYOIJhvk9pOPEq_DA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5hINwudKO3LHLMg7jNeF93QUbH18Z-hTVjQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjRpdlEgOL790GI3DHpdhm-3-cJB-U_4z98A&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmg9CJ9EqC1QieFQn2AifLSJ6WEE1ieB8PNg&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5hINwudKO3LHLMg7jNeF93QUbH18Z-hTVjQ&usqp=CAU',
  // Add more image URLs as needed
];

export const ProductGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <StyledContainer>
      <LeftColumn>
        <ProductList>
          {imageUrls.map((image, index) => (
            <Thumbnail
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </ProductList>
      </LeftColumn>
      <RightColumn>
        <SelectedImage src={selectedImage} alt="Selected Product" />
      </RightColumn>
      <CarouselContainer>
        <Carousel
          maw={430}
          mah={500}
          slideSize="100%"
          slideGap={10000}
          mx="auto"
          withIndicators
          withControls={true}
          breakpoints={[
            { maxWidth: 'md', slideSize: '100%' },
            { maxWidth: 'sm', slideSize: '100%', slideGap: 10 },
            { maxWidth: 'xs', slideSize: '100%', slideGap: 10 },
          ]}
          styles={{
            indicator: {
              width: '12px',
              height: '4px',
              transition: 'width 250ms ease',

              '&[data-active]': {
                width: '40px',
              },
            },
          }}
        >
          {imageUrls.map((image, index) => (
            <SelectedImage key={index} src={image} alt={`Product ${index}`} />
          ))}
        </Carousel>
      </CarouselContainer>
    </StyledContainer>
  );
};
