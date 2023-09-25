import { Card, Flex, Grid, Group, Paper, Text } from '@mantine/core';

interface OrderedItemProps {
  productName: string;
  productPrice: number;
  quantity: number;
}

interface UserCartProps {
  totalAmount: number;
  orderedItems: OrderedItemProps[];
  deliveryFee: number;
}

export const OrderSummary = ({ data }: { data: UserCartProps }) => {
  const itemCount = data.orderedItems.length;

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section p="xs" withBorder>
          <Group position="apart">
            <Text fw={700} size="md">
              Order Summary
            </Text>
            <Text size="xs">Total (Item {itemCount})</Text>
          </Group>
        </Card.Section>
        <Card.Section p="xs">
          {data.orderedItems.map((item, index) => (
            <Grid key={index} columns={7}>
              <Grid.Col span={4}>
                <Text fw={700} size="xs" truncate>
                  {item.productName}
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Paper withBorder>
                  <Flex direction="column" justify="center" align="center">
                    <Text size="xs">x{item.quantity}</Text>
                  </Flex>
                </Paper>
              </Grid.Col>
              <Grid.Col span={2}>
                <Flex direction="column" justify="center" align="flex-end">
                  <Text size="xs">
                    &#8369;{' '}
                    {item.productPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </Flex>
              </Grid.Col>
            </Grid>
          ))}
        </Card.Section>
        <Card.Section p="xs">
          <Group position="apart">
            <Text>Subtotal</Text>
            <Text>
              &#8369;{' '}
              {data.totalAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Group>
          <Group position="apart">
            <Text>Delivery Fee</Text>
            <Text>
              &#8369;{' '}
              {data.deliveryFee.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};
