import { Avatar, Col, Grid, Group, Text } from '@mantine/core';

import { ProductGallery } from '../product-gallery/productGallery';
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
  Wrapper,
} from '../product-info/style';
import { StarRating } from '../rating/StarRating';

interface IProductProps {
  productName: string;
  ratingValue: number;
  productDescription: string;
  productPrice: number;
  merchantName: string;
  productImg: string[];
}

export function ProductInfo({
  productName,
  ratingValue = 0,
  productDescription,
  productPrice = 0,
  merchantName,
  productImg,
}: IProductProps) {
  const formattedPrice = productPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <Wrapper>
      <Grid className="grid-container" gutter="lg">
        <Col className="grid-layout" lg={6} md={7} xs={12}>
          <ProductGallery productImg={productImg} />
        </Col>
        <Col className="grid-layout" lg={6} md={5} xs={12}>
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&usqp=CAU"
                    alt="Merchant"
                    radius="200px"
                    style={{ width: '40px', height: '40px' }}
                  />
                  <MerchantText>{merchantName}</MerchantText>
                </Group>
              </Group>
              <ProductDescWrapper>
                <ProductDescriptionText>
                  {productDescription}
                </ProductDescriptionText>
                <ProductPriceText>Price: ₱{formattedPrice}</ProductPriceText>
              </ProductDescWrapper>
              <Group>
                <AddToCartButton>
                  <Text color="#FFC815"> Add to Cart</Text>
                </AddToCartButton>
                <BuyNowButton>Buy Now</BuyNowButton>
              </Group>
            </StyledContainer>
          </StyledBox>
        </Col>
      </Grid>
    </Wrapper>
  );
}