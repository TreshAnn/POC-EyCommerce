import { CardWrapper, CardDetails, CardComponent } from './styles';
import StarSVG from './StarSVG';
import { Title, Card, Image, Text, Button, Rating } from '@mantine/core';
interface ProductProps {
  ratingValue?: number;
}

export function Product({ ratingValue = 0 }: ProductProps) {
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
              emptySymbol={<StarSVG fill="#CCCCCC" />}
              fullSymbol={<StarSVG fill="#FFD500" />}
              value={ratingValue}
              readOnly
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
