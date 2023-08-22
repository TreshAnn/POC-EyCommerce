import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
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
import { Breakpoints } from '../utils/screen-size.constant';

interface IProductGalleryProps {
  productImg: string[];
}

export const ProductGallery: React.FC<IProductGalleryProps> = ({
  productImg,
}) => {
  const [selectedImage, setSelectedImage] = useState(productImg[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const isMd = useMediaQuery(`(max-width: ${Breakpoints.md})`);

  return (
    <StyledContainer>
      <LeftColumn>
        <ProductList>
          {productImg.map((image, index) => (
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
        {!isMd ? (
          <SelectedImage src={selectedImage} alt="Selected Product" />
        ) : (
          <CarouselContainer>
            <Carousel
              maw={375}
              mx="auto"
              withIndicators
              height={375}
              dragFree
              slideGap="md"
              align="start"
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
              {productImg.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index}`} />
              ))}
            </Carousel>
          </CarouselContainer>
        )}
      </RightColumn>
    </StyledContainer>
  );
};
