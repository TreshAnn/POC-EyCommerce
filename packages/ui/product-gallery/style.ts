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
    scrollbar-width: thin;
    scrollbar-color: gray transparent;

    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: gray;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

  @media (max-width: ${Breakpoints.lg}) {
    display: none;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 455px;
  height: 500px;
  margin: 1px;

  @media (max-width: ${Breakpoints.xl}) {
    align-items: center;
    width: 420px;
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
  height: 500px;
  object-fit: contain;

  @media (max-width: ${Breakpoints.xl}) {
    width: 420px;
    height: auto;
  }
`;

export const CarouselContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375px;
`;
