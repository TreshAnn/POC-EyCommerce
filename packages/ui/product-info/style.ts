import { Box, Button, Container, Text } from '@mantine/core';
import styled from 'styled-components';

import { Breakpoints } from '../utils/screen-size.constant';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 10px 40px;
  margin: 0;
  justify-content: center;
  flex-direction: column;

  @media (max-width: ${Breakpoints.sm}) {
    padding: 0;
  }
  .grid-container {
    margin: 0;

    @media (max-width: ${Breakpoints.lg}) {
      padding: 10px 20px;
    }

    @media (max-width: ${Breakpoints.md}) {
      padding: 0;
      display: flex;
      flex-direction: row;
    }
  }

  .grid-layout {
    padding: 0;
    justify-content: center;
  }

  .group-wrapper {
    @media (max-width: ${Breakpoints.xl}) {
      gap: 0;
    }
  }
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: '10px';
  background-color: #fcfcfd;
  width: 730px;
  height: 500px;
  margin-left: 5px;
  padding: 30px 40px;
  border: 1px solid #fcfcfd;
  box-shadow: 0px 2px 2px 0px #777;

  @media (max-width: ${Breakpoints.xl}) {
    width: 600px;
    height: 500px;
  }

  @media (max-width: ${Breakpoints.lg}) {
    width: 100%;
    margin: 0;
  }

  @media (max-width: ${Breakpoints.sm}) {
    width: 100vw;
    margin: 0;
    margin-bottom: 5px;
  }

  @media (max-width: ${Breakpoints.xs}) {
    width: 300;
    padding: 5px;
    margin-bottom: 5px;
  }
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: '10px';
  align-self: stretch;
  margin: 0;
  padding: 0;

  @media (max-width: ${Breakpoints.xs}) {
    padding: 5px;
  }
`;

export const RatingText = styled(Text)`
  font-size: 40px;

  @media (max-width: ${Breakpoints.lg}) {
    font-size: 30px;
    margin-right: 5px;
  }
  @media (max-width: ${Breakpoints.md}) {
    font-size: 35px;
    margin-left: 5px;
  }
  @media (max-width: ${Breakpoints.xs}) {
    font-size: 25px;
  }
`;

export const RatingDescription = styled(Text)`
  font-size: 20px;
  color: #777;
  margin-right: 30px;

  @media (max-width: ${Breakpoints.lg}) {
    font-size: 16px;
    margin-left: 5px;
  }

  @media (max-width: ${Breakpoints.md}) {
    font-size: 20px;
    margin-left: 5px;
  }
  @media (max-width: ${Breakpoints.xs}) {
    font-size: 18px;
  }
`;

export const ProductNameText = styled(Text)`
  font-family: 'Overpass';
  font-size: 48px;
  font-weight: 700;
  line-height: normal;
  align-items: flex-start;

  @media (max-width: ${Breakpoints.xl}) {
    font-size: 35px;
  }
  @media (max-width: ${Breakpoints.lg}) {
    font-size: 30px;
  }
  @media (max-width: ${Breakpoints.md}) {
    font-size: 48px;
  }

  @media (max-width: ${Breakpoints.sm}) {
    font-size: 20px;
  }
`;
export const MerchantText = styled(Text)`
  color: #000;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: 'Overpass';
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;

  @media (max-width: ${Breakpoints.lg}) {
    font-size: 18px;
    font-weight: 500px;
    line-height: 100%;
  }
  @media (max-width: ${Breakpoints.xs}) {
    font-size: 16px;
  }
`;

export const ProductDescriptionText = styled(Text)`
  color: #000;
  font-family: 'Overpass';
  font-size: 20px;
  margin: 0;
  height: auto;

  @media (max-width: ${Breakpoints.lg}) {
    font-size: 15px;
  }

  @media (max-width: ${Breakpoints.md}) {
    font-size: 18px;
  }
  @media (max-width: ${Breakpoints.sm}) {
    font-size: 18px;
  }

  @media (max-width: ${Breakpoints.xs}) {
    font-size: 18px;
  }
`;
export const ProductPriceText = styled(Text)`
  font-family: 'Overpass';
  font-size: 36px;
  font-weight: 700;
  align-self: flex-start;
  margin-top: auto;

  @media (max-width: ${Breakpoints.lg}) {
    font-size: 24px;
  }
`;

export const ProductDescWrapper = styled(Container)`
  height: 280px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledButton = styled(Button)`
  color: black;
  border-radius: 8px;
  border: 1px solid var(--sixth, #ffd500);
  background: var(--third, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  padding: 10px 20px;
`;

export const AddToCartButton = styled(StyledButton)`
  background: var(--third, #fff);
  border: 1px solid var(--sixth, #ffd500);
  width: 130px;
  height: 45px;
  margin: 0;

  @media (max-width: ${Breakpoints.lg}) {
    width: 100px;
    height: 40px;
    font-size: 12px;
    padding: 10px 5px;
  }
`;

export const BuyNowButton = styled(StyledButton)`
  background: var(--sixth, #ffd500);
  border: 1px solid var(--sixth, #ffd500);
  width: 109px;
  height: 45px;
  margin: 0;

  @media (max-width: ${Breakpoints.lg}) {
    width: 110px;
    height: 40px;
    font-size: 12px;
    padding: 10px 5px;
  }
`;
