import {
  Anchor,
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Header,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

export const HeaderNavBar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [verifyToken, setVerifyToken] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 976px)');

  return (
    <Box>
      <Header height={60} px="md">
        <Group sx={{ height: '100%' }} position="apart" grow>
          <Title order={3}>EYCommerce</Title>
          {!isMobile && (
            <>
              <Group sx={{ height: '100%' }} spacing={40} position="center">
                <Anchor href="#">Home</Anchor>
                <Anchor href="#">About Us</Anchor>
                <Anchor href="#">Services</Anchor>
                <Anchor href="#">Contact Us</Anchor>
                <Anchor href="#">FAQ</Anchor>
              </Group>
              <Group position="right">
                {verifyToken ? (
                  <Avatar color="cyan" radius="xl">
                    TH
                  </Avatar>
                ) : (
                  <Group>
                    <Button color="yellow" variant="filled">
                      Log in
                    </Button>
                    <Button color="yellow" variant="outline">
                      Sign up
                    </Button>
                  </Group>
                )}
              </Group>
            </>
          )}
          {isMobile && (
            <Group position="right">
              <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" />
            </Group>
          )}
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="fit-content"
        title="EYCommerce"
        zIndex={1000000}
        position="top"
      >
        <Divider my="sm" />
        <Stack align="stretch" justify="center">
          <Anchor href="#" align="center">
            Home
          </Anchor>
          <Anchor href="#" align="center">
            About Us
          </Anchor>
          <Anchor href="#" align="center">
            Services
          </Anchor>
          <Anchor href="#" align="center">
            FAQ
          </Anchor>
          <Divider my="sm" />
          {verifyToken ? (
            <Group>
              <Avatar color="cyan" radius="xl">
                TH
              </Avatar>
              <Text>Tom Holland</Text>
            </Group>
          ) : (
            <Group>
              <Button color="yellow" variant="filled" fullWidth>
                Log in
              </Button>
              <Button color="yellow" variant="outline" fullWidth>
                Sign up
              </Button>
            </Group>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
};
