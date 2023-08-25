import { Button, Card, Image, Rating, Text, Title } from '@mantine/core';

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
}

export function Product({
  ratingValue = 0,
  img,
  name,
  price = 0,
}: IProductProps) {
  return (
    <CardWrapper>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <ProductImage src={img} alt="Product" />
        </Card.Section>
        <ContentWrapper>
          <DetailsWrapper className="product-name">
            <Title order={4} weight={500} h={50}>
              {name}
            </Title>
          </DetailsWrapper>
          <DetailsWrapper className="product-rating">
            <Rating
              emptySymbol={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.5 12C2.5 6.48 6.97 2 12.49 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.49 22C6.97 22 2.5 17.52 2.5 12ZM12.5 15.45L15.72 17.39C16.1 17.62 16.56 17.28 16.46 16.85L15.61 13.18L18.44 10.73C18.78 10.44 18.6 9.89 18.16 9.85L14.42 9.53L12.96 6.09C12.79 5.68 12.21 5.68 12.04 6.09L10.58 9.54L6.84 9.86C6.4 9.9 6.22 10.45 6.55 10.74L9.38 13.19L8.53 16.85C8.43 17.28 8.9 17.62 9.28 17.39L12.5 15.45Z"
                    fill="#CCCCCC"
                  />
                </svg>
              }
              fullSymbol={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.5 12C2.5 6.48 6.97 2 12.49 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.49 22C6.97 22 2.5 17.52 2.5 12ZM12.5 15.45L15.72 17.39C16.1 17.62 16.56 17.28 16.46 16.85L15.61 13.18L18.44 10.73C18.78 10.44 18.6 9.89 18.16 9.85L14.42 9.53L12.96 6.09C12.79 5.68 12.21 5.68 12.04 6.09L10.58 9.54L6.84 9.86C6.4 9.9 6.22 10.45 6.55 10.74L9.38 13.19L8.53 16.85C8.43 17.28 8.9 17.62 9.28 17.39L12.5 15.45Z"
                    fill="#FFD500"
                  />
                </svg>
              }
              value={ratingValue}
              readOnly
            />
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
          <Button fz="md" fullWidth style={{ color: 'black' }}>
            Add to cart
          </Button>
        </ContentWrapper>
      </Card>
    </CardWrapper>
  );
}

export default Product;
