import { Card, Flex, Group, Text } from '@mantine/core';
import React from 'react';
import { IoCashOutline } from 'react-icons/io5'; // Import the IoCashOutline icon from react-icons/io5

interface PaymentDetailsProps {
  totalPrice: number;
  deliveryFee: number;
  paymentMethod: string;
}
export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  totalPrice,
  deliveryFee,
  paymentMethod,
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
              <Text size="sm">
                <Text size="sm">
                  {paymentMethod.charAt(0).toUpperCase() +
                    paymentMethod.slice(1)}
                </Text>
              </Text>
            </Flex>
          </div>
        </Group>
      </Card.Section>

      <Card.Section p="xs" withBorder>
        <Group position="apart">
          <Text fw={400}>Total:</Text>
          <Text fw={700}>
            &#8369;{' '}
            {totalPayment.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </Group>
      </Card.Section>
    </Card>
  );
};
