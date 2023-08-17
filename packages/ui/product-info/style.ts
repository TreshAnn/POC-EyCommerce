import { Box, Button, Container, Text } from '@mantine/core';
import styled from 'styled-components';

const maxMobileWidth = '976px';
const sm = '600px';
const md = '900px';
const lg = '1200px';

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: '10px';
  padding: 40px 80px;
  background-color: #fcfcfd;
  width: 1038px;
  height: 604px;
  border: 1px solid #fcfcfd;
  box-shadow: 0px 2px 2px 0px #000;

  @media (max-width: ${maxMobileWidth}) {
    padding: 20px;
    width: 100%;
    height: auto;
  }

  .group-wrapper {
    @media (max-width: ${sm}) {
      gap: 0;
      margin-bottom: 20px;
    }
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
`;

export const RatingText = styled(Text)`
  font-size: 40px;
  line-height: 60px;

  @media (max-width: ${lg}) {
    white-space: normal;
    font-size: 35px;
  }
  @media (max-width: ${md}) {
    white-space: normal;
    font-size: 28px;
  }
  @media (max-width: ${sm}) {
    white-space: normal;
    font-size: 23px;
    line-height: 45px;
  }
`;

export const RatingDescription = styled(Text)`
  font-size: 20px;
  color: #777;
  margin-right: 30px;

  @media (max-width: ${md}) {
    font-size: 18px;
    gap: inherit;
  }

  @media (max-width: ${sm}) {
    font-size: 15px;
  }
`;

export const ProductNameText = styled(Text)`
  font-family: 'Overpass';
  font-size: 48px;
  font-weight: 700;
  line-height: 72px;
  align-items: flex-start;

  @media (max-width: ${lg}) {
    white-space: normal;
    font-size: 45px;
  }
  @media (max-width: ${md}) {
    white-space: normal;
    font-size: 40px;
    line-height: 60px;
  }
  @media (max-width: ${sm}) {
    white-space: normal;
    font-size: 35px;
    line-height: 50px;
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

  @media (max-width: ${lg}) {
    white-space: normal;
    font-size: 18px;
  }
  @media (max-width: ${md}) {
    white-space: normal;
    font-size: 15px;
  }
  @media (max-width: ${sm}) {
    white-space: normal;
    font-size: 15x;

    line-height: 100%;
  }
`;

export const ProductDescriptionText = styled(Text)`
  color: #000;
  font-family: 'Overpass';
  font-size: 20px;
  font-weight: 400;
  margin: 0;

  @media (max-width: ${lg}) {
    white-space: normal;
    font-size: 18px;
  }
  @media (max-width: ${md}) {
    white-space: normal;
    font-size: 15px;
    margin-bottom: 40px;
  }
  @media (max-width: ${sm}) {
    white-space: normal;
    font-size: 13px;
    margin-bottom: 50px;
  }
`;
export const ProductPriceText = styled(Text)`
  font-family: 'Overpass';
  font-size: 36px;
  font-weight: 700;
  align-self: flex-start;
  margin-top: auto;

  @media (max-width: ${lg}) {
    white-space: normal;
    font-size: 30px;
  }
  @media (max-width: ${md}) {
    white-space: normal;
    font-size: 28px;
  }
  @media (max-width: ${sm}) {
    white-space: normal;
    font-size: 25px;
  }
`;

export const ProductDescWrapper = styled(Container)`
  width: 878px;
  height: 299px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: ${maxMobileWidth}) {
    width: 100%;
    height: auto;
  }
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

  @media (max-width: ${lg}) {
    width: 128px;
  }
  @media (max-width: ${sm}) {
    width: 123px;
  }
`;

export const BuyNowButton = styled(StyledButton)`
  background: var(--sixth, #ffd500);
  border: 1px solid var(--sixth, #ffd500);
  width: 109px;
  height: 45px;

  @media (max-width: ${lg}) {
    width: 105px;
  }
  @media (max-width: ${sm}) {
    width: 100px;
  }
`;
