import {
  Anchor,
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Header,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { TiShoppingCart } from 'react-icons/ti';
import { Link } from 'react-router-dom';

import { Dropdown } from '../dropdown/dropdown';

export const HeaderNavBar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [verifyToken, setVerifyToken] = useState<boolean>(true);
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
                  <>
                    <TiShoppingCart color="#fab005" size={36} />
                    <IoNotifications color="#fab005" size={36} />
                    <Dropdown
                      target={
                        <Avatar color="cyan" radius="xl" size={50}>
                          OR
                        </Avatar>
                      }
                    />
                  </>
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
              <TiShoppingCart color="#fab005" size={30} />
              <IoNotifications color="#fab005" size={30} />
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
            <Group style={{ display: 'block' }}>
              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <TiShoppingCart color="#fab005" size={36} />
                <Text style={{ marginLeft: '10px', verticalAlign: 'middle' }}>
                  My Cart
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IoNotifications color="#fab005" size={36} />
                <Text style={{ marginLeft: '10px', verticalAlign: 'middle' }}>
                  Notifications
                </Text>
              </div> */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar color="cyan" radius="xl">
                  TH
                </Avatar>
                <Text style={{ marginLeft: '10px', verticalAlign: 'middle' }}>
                  Tom Holland
                </Text>
              </div>
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
