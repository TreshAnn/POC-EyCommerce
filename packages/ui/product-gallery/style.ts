import { Container } from '@mantine/core';
import styled from 'styled-components';

import { Breakpoints } from '../utils/screen-size.constant';

export const StyledContainer = styled(Container)`
  display: flex;
  width: 700px;
  height: 500px;
  margin: 0px;
  padding: 0;
  justify-content: center;

  @media (max-width: ${Breakpoints.xl}) {
    width: auto;
    height: 500px;
  }
  @media (max-width: ${Breakpoints.sm}) {
    width: 100%;
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

  @media (max-width: ${Breakpoints.xl}) {
    display: none;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 455px;

  @media (max-width: ${Breakpoints.xl}) {
    align-items: center;
  }
`;

export const ProductList = styled.div`
  display: flex;
  width: 168px;
  flex-direction: column;
  gap: 10px;
`;

export const Thumbnail = styled.img`
  width: 153px;
  height: 153px;
  cursor: pointer;
`;

export const SelectedImage = styled.img`
  width: 450px;
  height: 450px;

  @media (max-width: ${Breakpoints.sm}) {
    width: 400px;
    height: auto;
  }
  @media (max-width: ${Breakpoints.xs}) {
    width: 350px;
    height: auto;
  }
`;

export const CarouselContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375px;
`;
