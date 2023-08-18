import { Avatar, Group, Rating, Text } from '@mantine/core';
import { StarRating } from '../rating/StarRating';

import {
  AddToCartButton,
  BuyNowButton,
  MerchantText,
  ProductDescriptionText,
  ProductDescWrapper,
  ProductNameText,
  ProductPriceText,
  RatingDescription,
  RatingText,
  StyledBox,
  StyledContainer,
} from '../product-info/style';

interface IProductProps {
  productName?: string;
  ratingValue?: number;
  productDescription?: string;
  productPrice?: number;
  merchantName?: string;
}

export function ProductInfo({
  productName = 'Spicy Korean Fried Chicken',
  ratingValue = 3,
  productDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  productPrice = 120,
  merchantName = 'NaroShoppee',
}: IProductProps) {
  return (
    <StyledBox>
      <StyledContainer>
        <ProductNameText>{productName}</ProductNameText>
        <Group className="group-wrapper">
          <RatingText>{ratingValue.toFixed(1)}</RatingText>
          <StarRating rate={ratingValue} />
          <RatingDescription>
            ({ratingValue.toFixed(1)} out of 5)
          </RatingDescription>
          <Group>
            <Avatar
              size="md"
              src="https://picsum.photos/id/237/200/300"
              alt="Merchant"
              radius="200px"
              style={{ width: '40px', height: '40px' }}
            />
            <MerchantText>{merchantName}</MerchantText>
          </Group>
        </Group>
        <ProductDescWrapper>
          <ProductDescriptionText>{productDescription}</ProductDescriptionText>
          <ProductPriceText>Price: ₱{productPrice.toFixed(2)}</ProductPriceText>
        </ProductDescWrapper>
        <Group>
          <AddToCartButton>
            <Text color="#FFC815"> Add to Cart</Text>
          </AddToCartButton>
          <BuyNowButton>Buy Now</BuyNowButton>
        </Group>
      </StyledContainer>
    </StyledBox>
  );
}
