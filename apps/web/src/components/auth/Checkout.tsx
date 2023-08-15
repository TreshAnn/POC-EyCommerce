import { AddressCard } from 'ui/Card/AddressCard';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Stack } from '@mantine/core';
import React from 'react';

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
        </Stack>
      </Modal>
      <Group position="center">
        <Button onClick={open}>Open Modal</Button>
      </Group>
    </>
  );
};
