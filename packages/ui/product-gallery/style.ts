import { Container } from '@mantine/core';
import styled from 'styled-components';

const maxMobileWidth = '976px';
const sm = '600px';

export const StyledContainer = styled(Container)`
  display: flex;
  width: 772px;
  height: 604px;
  margin: 0px;

  @media (max-width: ${maxMobileWidth}) {
    width: 100%;
    height: auto;
  }
`;

export const LeftColumn = styled.div`
  width: 168px;
  overflow-y: hidden;
  flex-shrink: 0;
  position: relative;
  &:hover {
    overflow-y: auto;
  }

  @media (max-width: ${maxMobileWidth}) {
    &:hover {
      overflow-y: auto;
    }
  }
  @media (max-width: ${sm}) {
    display: none;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 604px;

  @media (max-width: ${sm}) {
    display: none;
  }
`;

export const ProductList = styled.div`
  display: flex;
  width: 168px;
  flex-direction: column;
  gap: 10px;

  @media (max-width: ${sm}) {
    width: 100px;
  }
`;

export const Thumbnail = styled.img`
  width: 153px;
  height: 153px;
  cursor: pointer;

  @media (max-width: ${sm}) {
    width: 100px;
  }
`;

export const SelectedImage = styled.img`
  width: 604px;
  height: 604px;

  @media (max-width: ${maxMobileWidth}) {
    width: 100%;
  }
`;

export const CarouselContainer = styled(Container)`
  display: none;

  @media (max-width: ${sm}) {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 604px;
  }
`;
