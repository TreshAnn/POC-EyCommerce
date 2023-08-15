import { Card, Stack, Text, UnstyledButton } from '@mantine/core';
import { useState } from 'react';

export const AddressCard = () => {
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section p="xs" withBorder>
          <Text fw={700} size="lg">
            SHIPPING DETAILS
          </Text>
        </Card.Section>
        <Card.Section p="xs">
          <Text size="sm">Tom Holland</Text>
          <Text size="sm">(+63) 903-1234-231</Text>
          <Text size="sm">5/F Citibank Tower</Text>
          <Text size="sm">8741 Paseo De Roxas Street</Text>
          <Text size="sm">Makati City, Metro Manila</Text>
          <UnstyledButton>
            <Text color="yellow">Edit</Text>
          </UnstyledButton>
        </Card.Section>
      </Card>
    </>
  );
};
