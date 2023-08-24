import {
  Divider,
  Image,
  Text,
  Group,
  Flex,
  Container,
  Paper,
  Anchor,
} from '@mantine/core';
import { TiTrash } from 'react-icons/ti';

import { Quantity } from '../quantity/Quantity';
import { StyledQuantityWrapper } from './styles';

interface ICartProps {
  imageSrc: string;
  merchant: string;
  productName: string;
  price: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const Cart: React.FC<ICartProps> = ({
  imageSrc,
  merchant,
  productName,
  price,
  quantity,
  onQuantityChange,
}) => {
  const formattedPrice = price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div>
      <Paper shadow="xs" radius="lg" p="md">
        <Flex align="flex-start" gap="xs" justify="flex-start">
          <div>
            <Image
              width={120}
              height={120}
              src={imageSrc}
              alt="With default placeholder"
              withPlaceholder
            />
          </div>
          <div>
            <Text ta="left" fz="sm" c="dimmed">
              {merchant}
            </Text>
            <Text fz="sm">{productName}</Text>
            <Text fz="lg" fw={500} color="yellow">
              &#8369;{formattedPrice}
            </Text>
            <StyledQuantityWrapper>
              <Quantity
                quantity={quantity}
                onQuantityChange={(newQuantity) => {
                  onQuantityChange(newQuantity);
                }}
              />
            </StyledQuantityWrapper>
          </div>
        </Flex>
        <Divider my="sm" />
        <Group position="right" spacing="xs">
          <Anchor href="#" target="_blank">
            <Text fw={500} color="black">
              Move to Favorites
            </Text>
          </Anchor>
          <Divider orientation="vertical" />
          <Anchor href="#" target="_blank">
            <Text fw={500} color="yellow">
              Edit
            </Text>
          </Anchor>
          <Divider orientation="vertical" />
          <Anchor href="#" target="_blank">
            <TiTrash size={22} color="grey" />
          </Anchor>
        </Group>
      </Paper>
    </div>
  );
};

export default Cart;
