import { Button, Group, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { AddressCard } from 'ui/Card/AddressCard';
import { OrderSummary } from 'ui/Card/OrderSummary';
import { PaymentDetails } from 'ui/Card/PaymentDetails';

export const Checkout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={true}
        title="Checkout"
        centered
      >
        <Stack>
          <AddressCard />
          <OrderSummary />
          <PaymentDetails />
        </Stack>
      </Modal>
      <Group position="center">
        <Button onClick={open}>Open Modal</Button>
      </Group>
    </>
  );
};
