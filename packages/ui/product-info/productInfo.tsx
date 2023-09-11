import { Avatar, Button, Col, Grid, Group, Text } from '@mantine/core';

import { ProductGallery } from '../product-gallery/productGallery';
import {
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
import { Quantity } from '../quantity/Quantity';
import { StarRating } from '../rating/StarRating';

interface IProductProps {
  productName: string;
  ratingValue?: number;
  productDescription: string;
  productPrice: number;
  merchantName: string;
  productImg: string[];
  inventory: number;
  quantity: number;

  addToCart: () => void;
  checkoutBtnHandler: () => void;
  onQuantityChange: (newQuantity: number) => void;
}

export function ProductInfo({
  productName,
  ratingValue = 0,
  productDescription,
  productPrice = 0,
  merchantName,
  productImg,
  inventory,
  quantity = 0,
  addToCart,
  checkoutBtnHandler,
  onQuantityChange,
}: IProductProps) {
  const formattedPrice = productPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Wrapper>
      <Grid className="grid-container" gutter="lg" justify="center">
        <Col className="grid-layout" lg={6} md={7} xs={12}>
          <ProductGallery productImg={productImg} />
        </Col>
        <Col lg={6} md={5} xs={12}>
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
              </ProductDescWrapper>
              <ProductPriceText>
                Price: &#8369; {formattedPrice}
              </ProductPriceText>
              <Group>
                <Text color="#777777" size={14}>
                  Quantity
                </Text>
                <Quantity
                  quantity={quantity}
                  onQuantityChange={(newQuantity) =>
                    onQuantityChange(newQuantity)
                  }
                />
                <Text color="#777777" size={10}>
                  {inventory} item/s available
                </Text>
              </Group>
              <Group style={{ marginTop: 15 }}>
                <Button
                  onClick={addToCart}
                  variant="outline"
                  fz="md"
                  style={{ margin: 0 }}
                >
                  <Text color="#FFC815" size={14}>
                    Add to Cart
                  </Text>
                </Button>
                <Button
                  onClick={checkoutBtnHandler}
                  fz="md"
                  style={{ color: 'black', margin: 0 }}
                >
                  Buy Now
                </Button>
              </Group>
            </StyledContainer>
          </StyledBox>
        </Col>
      </Grid>
    </Wrapper>
  );
}
