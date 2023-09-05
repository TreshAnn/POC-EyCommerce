import React from 'react';
import { Button, Card, Image, Rating, Text, Title } from '@mantine/core';

import {
  CardWrapper,
  ContentWrapper,
  DetailsWrapper,
  ProductImage,
} from './styles';
interface IProductProps {
  id: string;
  name: string;
  img: string;
  info: string;
  stock: number;
  price: number;
  onEdit: (id: string) => void;
  isLoading: boolean;
}

export function MerchantProduct({
  id,
  img,
  name,
  info,
  stock = 0,
  price = 0,
  isLoading,
  onEdit,
}: IProductProps) {
  const handleEditClick = () => {
    onEdit(id);
  };
  return (
    <CardWrapper>
      <Card shadow="sm" padding="lg" radius="md" h={410} withBorder>
        <Card.Section>
          <ProductImage src={img} alt="Product" />
        </Card.Section>
        <ContentWrapper>
          <DetailsWrapper className="product-name">
            <Title order={4} weight={500} h={50}>
              {name}
            </Title>
          </DetailsWrapper>
          <DetailsWrapper className="product-name">
            <Text size="sm" fw={500}>
              Stock: {stock}
            </Text>
          </DetailsWrapper>
          <DetailsWrapper className="product-price">
            <Text size="lg" fw={500} color="yellow">
              &#8369;{' '}
              {price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </DetailsWrapper>

          <Button
            onClick={handleEditClick}
            fz="md"
            fullWidth
            style={{ color: 'black' }}
            loading={isLoading}
            loaderPosition="center"
          >
            Edit
          </Button>
        </ContentWrapper>
      </Card>
    </CardWrapper>
  );
}

export default MerchantProduct;
