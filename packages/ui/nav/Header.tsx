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
import { useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { TiShoppingCart } from 'react-icons/ti';
import { Dropdown } from '../dropdown/dropdown';
import HeaderCart from '../cart/HeaderCart';
import { AvatarContainer } from './style';

export const HeaderNavBar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [verifyToken, setVerifyToken] = useState<boolean>(true);
  const isMobile = useMediaQuery('(max-width: 976px)');

  //Test data for cart
  const sampleCartItems = [
    {
      id: 1,
      imageSrc:
        'https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg',
      merchant: 'Sample Merchant 1',
      productName: 'Product 1',
      price: 200.0,
    },
    {
      id: 2,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 2',
      productName: 'Product 2',
      price: 150.0,
    },
    {
      id: 3,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
    },
    // Add more items as needed to test
  ];

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
                    <HeaderCart cartItems={sampleCartItems} />

                    <IoNotifications color="#fab005" size={36} />
                    <Dropdown
                      target={
                        <Avatar color="cyan" radius="xl" size={50}>
                          OR
                        </Avatar>
                      }
                      menuItems={[
                        'View Profile',
                        'Settings',
                        'divider',
                        'My Orders',
                        'My Wallet',
                        'divider',
                        'Log Out',
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
