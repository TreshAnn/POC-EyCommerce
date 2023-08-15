import { Card, Stack, Text, UnstyledButton } from '@mantine/core';
import { useState } from 'react';

export const AddressCard = () => {
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section p="xs" withBorder>
          <Text weight={500}>Shipping Details</Text>
        </Card.Section>
        <Card.Section p="xs">
          <Text size="md">Tom Holland</Text>
          <Text size="md">(+63) 903-1234-231</Text>
          <Text size="md">5/F Citibank Tower</Text>
          <Text size="md">8741 Paseo De Roxas Street</Text>
          <Text size="md">Makati City, Metro Manila</Text>
          <UnstyledButton>
            <Text color="yellow">Edit</Text>
          </UnstyledButton>
        </Card.Section>
      </Card>
    </>
  );
};
