import { styled } from 'styled-components';
import { Image } from '@mantine/core';

export const ProductImage = styled(Image)`
  height: 200px;
  padding: 20px 40px;
`;

export const CardWrapper = styled.div`
  margin: 12px 0px;
  width: 240px;
  height: 500px;
  // display: flex; TO DO - add this when used for the catalog page
`;

export const ContentWrapper = styled.div`
  margin: 1.25rem 0.1rem;
`;

export const DetailsWrapper = styled.div`
  margin-bottom: 0.62rem;
  &.product-rating {
    margin-left: -4px;
  }
`;
