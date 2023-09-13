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
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { TiShoppingCart } from 'react-icons/ti';
import { Dropdown } from '../dropdown/dropdown';
import HeaderCart from '../cart/HeaderCart';
import { AvatarContainer } from '../nav/style';
import { useAuth } from '../../../apps/web/src/views/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const HeaderNavBar = () => {
  const { user } = useAuth();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [verifyToken, setVerifyToken] = useState<boolean>(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 976px)');

  const navTo = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    // Check if the user is authenticated
    if (user) {
      setVerifyToken(true);
    } else {
      setVerifyToken(false);
    }
  }, [user]);

  return (
    <Box>
      <Header height={60} px="md">
        <Group sx={{ height: '100%' }} position="apart" grow>
          <Anchor href="/products">
            <Title order={3} style={{ color: 'black', textDecoration: 'none' }}>
              EYCommerce
            </Title>
          </Anchor>
          {!isMobile && (
            <>
              <Group sx={{ height: '100%' }} spacing={40} position="center">
                <Anchor href="/products">Home</Anchor>
                {user?.role === 'merchant' && (
                  <>
                    <Anchor href="/my-products">My Products</Anchor>
                  </>
                )}
                <Anchor href="#">About Us</Anchor>
                <Anchor href="#">Services</Anchor>
                <Anchor href="#">Contact Us</Anchor>
                <Anchor href="#">FAQ</Anchor>
              </Group>
              <Group position="right">
                {verifyToken ? (
                  <>
                    <HeaderCart />
                    <IoNotifications color="#fab005" size={36} />
                    <Dropdown
                      target={
                        <Avatar color="cyan" radius="xl" size={50}>
                          OR
                        </Avatar>
                      }
                      menuItems={[
                        { label: 'View Profile', path: '#' },
                        { label: 'Settings', path: '#' },
                        'divider',
                        { label: 'My Orders', path: '#' },
                        { label: 'My Wallet', path: '#' },
                        'divider',
                        { label: 'Log Out', path: '/logout' },
                      ]}
                      avatarContent={
                        <AvatarContainer>
                          <Avatar
                            size="md"
                            src="/vite.svg"
                            alt="User Photo"
                            style={{
                              borderRadius: '50%',
                              border: '1px solid #000',
                            }}
                          />
                          <div>
                            <div style={{ flex: 1 }}>
                              <Text size="sm" weight={500}>
                                Olivia Rhye
                              </Text>

                              <Text color="dimmed" size="xs">
                                beta@email.com
                              </Text>
                            </div>
                          </div>
                        </AvatarContainer>
                      }
                    />
                  </>
                ) : (
                  <Group>
                    <Button
                      color="yellow"
                      onClick={() => navTo('/login')}
                      variant="filled"
                    >
                      Log in
                    </Button>

                    <Button
                      color="yellow"
                      onClick={() => navTo('/register')}
                      variant="outline"
                    >
                      Sign up
                    </Button>
                  </Group>
                )}
              </Group>
            </>
          )}
          {isMobile && (
            <Group position="right">
              <UnstyledButton>
                <TiShoppingCart color="#fab005" size={36} />
              </UnstyledButton>
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
