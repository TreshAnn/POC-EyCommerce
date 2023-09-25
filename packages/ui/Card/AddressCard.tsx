import { Card, Text, UnstyledButton } from '@mantine/core';

interface UserAddressProps {
  street: string;
  city: string;
  region: string;
  zipcode: string;
  country: string;
}

interface UserDataProps {
  firstName: string;
  lastName: string;
  address: UserAddressProps;
  phoneNumber: string;
}

export const AddressCard = ({ data }: { data: UserDataProps }) => {
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section p="xs" withBorder>
          <Text fw={700} size="lg">
            SHIPPING DETAILS
          </Text>
        </Card.Section>
        <Card.Section p="xs">
          <Text size="sm">
            {data.firstName} {data.lastName}
          </Text>
          <Text size="sm"></Text>
          <Text size="sm">{data.phoneNumber}</Text>

          <Text size="sm">{data.address.street}</Text>
          <Text size="sm">{data.address.city}</Text>
          <Text size="sm"></Text>
          <Text size="sm">
            {data.address.region}, {data.address.country} {data.address.zipcode}
          </Text>
          <Text size="sm"></Text>
          <UnstyledButton>
            <Text color="yellow">Edit</Text>
          </UnstyledButton>
        </Card.Section>
      </Card>
    </>
  );
};
