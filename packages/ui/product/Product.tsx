import React from 'react';
import styled from 'styled-components';
import Star from './Star';
import {
  Title,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Rating,
} from '@mantine/core';

const ProductImage = styled.img`
  height: 200px;
`;

const CardWrapper = styled.div`
  margin: 48px auto 0;
  width: 300px;
  height: 600px;
  // display: flex; TO DO - add this when used for the catalog page
`;

const CardDetails = styled.div`
  margin: 1.25rem 0.1rem;
`;

const CardComponent = styled.div`
  margin-bottom: 0.62rem;
  &.product-rating {
    margin-left: -4px;
  }
`;

export function Product() {
  return (
    <CardWrapper>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://placehold.co/600x500.png?text=Product+Image"
            alt="Product"
          />
        </Card.Section>
        <CardDetails>
          <CardComponent className="product-name">
            <Title order={4} weight={500}>
              Spicy Korean Chicken BBQ
            </Title>
          </CardComponent>
          <CardComponent className="product-rating">
            <Rating
              emptySymbol={<Star fill="#CCCCCC" />}
              fullSymbol={<Star fill="#FFD500" />}
              defaultValue={2}
            />
          </CardComponent>
          <CardComponent className="product-price">
            <Text size="lg" fw={500} color="yellow">
              ₱ 120.00
            </Text>
          </CardComponent>
          <Button fz="md" fullWidth style={{ color: 'black' }}>
            Add to cart
          </Button>
        </CardDetails>
      </Card>
    </CardWrapper>
  );
}

export default Product;
