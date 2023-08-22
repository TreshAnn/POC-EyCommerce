import { Card, Flex, Group, Text } from '@mantine/core';
import React from 'react';
import { IoCashOutline } from 'react-icons/io5'; // Import the IoCashOutline icon from react-icons/io5

interface PaymentDetailsProps {
  totalPrice: number;
  deliveryFee: number;
}
export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  totalPrice,
  deliveryFee,
}) => {
  const totalPayment = totalPrice + deliveryFee;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p="xs" withBorder>
        <Group position="apart">
          <Text fw={700} size="md">
            Payment Details
          </Text>
        </Group>
      </Card.Section>

      <Card.Section p="xs" withBorder>
        <Group position="left" align="center">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Flex align="center">
              <IoCashOutline size={20} style={{ marginRight: '5px' }} />
              <Text size="sm">Cash</Text>
            </Flex>
          </div>
        </Group>
      </Card.Section>

      <Card.Section p="xs" withBorder>
        <Group position="apart">
          <Text fw={400}>Total:</Text>
          <Text fw={700}>₱{totalPayment.toFixed(2)}</Text>
        </Group>
      </Card.Section>
    </Card>
  );
};
