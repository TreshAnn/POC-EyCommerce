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

interface ICartProps {
  imageSrc: string;
  merchant: string;
  productName: string;
  price: number;
}

const Cart: React.FC<ICartProps> = ({
  imageSrc,
  merchant,
  productName,
  price,
}) => {
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
              ₱{price.toFixed(2)}
            </Text>
            <Quantity />
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
