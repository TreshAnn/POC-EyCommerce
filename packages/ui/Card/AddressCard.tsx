import { Card, Text, UnstyledButton } from '@mantine/core';

interface Data {
  name: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
}

export const AddressCard = () => {
  const TempData: Data = {
    name: 'Tom Holland',
    phoneNumber: '(+63) 903-1234-231',
    address1: '5/F Citibank Tower',
    address2: '8741 Paseo De Roxas Street',
    city: 'Makati City, Metro Manila',
  };

  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section p="xs" withBorder>
          <Text fw={700} size="lg">
            SHIPPING DETAILS
          </Text>
        </Card.Section>
        <Card.Section p="xs">
          {Object.keys(TempData).map((key) => (
            <Text key={key} size="sm">
              {TempData[key as keyof Data]}
            </Text>
          ))}
          <UnstyledButton>
            <Text color="yellow">Edit</Text>
          </UnstyledButton>
        </Card.Section>
      </Card>
    </>
  );
};
