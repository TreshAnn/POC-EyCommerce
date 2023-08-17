import { Card, Flex, Group, Text } from '@mantine/core';
import React from 'react';
import { IoCashOutline } from 'react-icons/io5';

interface PaymentDetailsProps {
  subtotal: number;
  deliveryFee: number;
}

export const PaymentDetails = ({
  subtotal,
  deliveryFee,
}: PaymentDetailsProps) => {
  const total = subtotal + deliveryFee;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p="xs" withBorder>
        <Group position="apart">
          <Text style={{ fontWeight: '900px' }}>Payment Details</Text>
        </Group>
      </Card.Section>

      <Card.Section p="xs" withBorder>
        <Group position="left" align="center">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Flex align="center">
              <IoCashOutline size={20} style={{ marginRight: '5px' }} />
              <Text size="sm">Cash Payment</Text>
            </Flex>
          </div>
        </Group>
      </Card.Section>

      <Card.Section p="xs" withBorder>
        <Group position="apart">
          <Text fw={700}>TOTAL</Text>
          <Text fw={700}>₱{total.toFixed(2)}</Text>
        </Group>
      </Card.Section>
    </Card>
  );
};
