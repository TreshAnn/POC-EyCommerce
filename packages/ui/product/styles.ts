import { styled } from 'styled-components';

export const ProductImage = styled.img`
  height: 200px;
`;

export const CardWrapper = styled.div`
  margin: 12px auto 0;
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
