import { Container } from '@mantine/core';
import styled from 'styled-components';

import { Breakpoints } from '../utils/screen-size.constant';

const xs = Breakpoints.xs;
const sm = Breakpoints.sm;
const xl = Breakpoints.xl;

export const StyledContainer = styled(Container)`
  display: flex;
  width: 700px;
  height: 500px;
  margin: 0px;
  padding: 0;
  justify-content: center;

  @media (max-width: ${xl}) {
    width: auto;
    height: 500px;
  }
  @media (max-width: ${sm}) {
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

  @media (max-width: ${xl}) {
    display: none;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 455px;

  @media (max-width: ${xl}) {
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

  @media (max-width: ${sm}) {
    width: 400px;
    height: auto;
  }
  @media (max-width: ${xs}) {
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
