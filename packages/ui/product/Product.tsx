import { Button, Card, Text, Title } from '@mantine/core';

import { StarRating } from '../rating/StarRating';
import {
  CardWrapper,
  ContentWrapper,
  DetailsWrapper,
  ProductImage,
} from './styles';
interface IProductProps {
  ratingValue?: number;
  name: string;
  img: string;
  price: number;
  // onClick: () => void;
  viewProductHandler: () => void;
  addToCart: () => void;
}

export function Product({
  ratingValue = 0,
  img,
  name,
  price = 0,
  // onClick,
  viewProductHandler,
  addToCart,
}: IProductProps) {
  return (
    <CardWrapper>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section onClick={viewProductHandler}>
          <ProductImage src={img} height={160} fit="contain" alt="Product" />
        </Card.Section>
        <ContentWrapper>
          <DetailsWrapper className="product-name">
            <Title order={4} weight={500} h={50}>
              {name}
            </Title>
          </DetailsWrapper>
          <DetailsWrapper className="product-rating">
            <StarRating rate={ratingValue} />
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
            onClick={addToCart}
            fz="md"
            fullWidth
            style={{ color: 'black' }}
          >
            Add to cart
          </Button>
        </ContentWrapper>
      </Card>
    </CardWrapper>
  );
}

export default Product;
