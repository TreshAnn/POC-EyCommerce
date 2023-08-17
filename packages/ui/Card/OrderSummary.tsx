import { Card, Flex, Grid, Group, Paper, Text } from '@mantine/core';

interface Data {
  productName: string;
  price: number;
  qty: number;
}

export const OrderSummary = () => {
  const tempData: Data[] = [
    {
      productName: 'Daryle’s Original Beef Pares with Tendon',
      price: 140,
      qty: 1,
    },
    {
      productName: 'Trecia’s Bakery',
      price: 0,
      qty: 0,
    },
    {
      productName: 'Mark Louie’s Original Chicken Udon',
      price: 0,
      qty: 0,
    },
  ];

  const totalPrice = tempData.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const deliveryFee = 49;
  const itemCount = tempData.length;

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
          {tempData.map((item, index) => (
            <Grid key={index} columns={7}>
              <Grid.Col span={4}>
                <Text fw={700} size="xs" truncate>
                  {item.productName}
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Paper withBorder>
                  <Flex direction="column" justify="center" align="center">
                    <Text size="xs">x{item.qty}</Text>
                  </Flex>
                </Paper>
              </Grid.Col>
              <Grid.Col span={2}>
                <Flex direction="column" justify="center" align="flex-end">
                  <Text size="xs">₱{item.price.toFixed(2)}</Text>
                </Flex>
              </Grid.Col>
            </Grid>
          ))}
        </Card.Section>
        <Card.Section p="xs">
          <Group position="apart">
            <Text>Subtotal</Text>
            <Text>₱{totalPrice.toFixed(2)}</Text>
          </Group>
          <Group position="apart">
            <Text>Delivery Fee</Text>
            <Text>₱{deliveryFee.toFixed(2)}</Text>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};
