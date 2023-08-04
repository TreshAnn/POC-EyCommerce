import { Avatar, Button, Menu, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Dropdown = () => {
  return (
    <Menu withArrow shadow="md" width={200} position="bottom-start">
      <Menu.Target>
        <Button>Menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft: 8,
            paddingTop: 2,
          }}
        >
          <Avatar
            component={Link}
            to="/my-route/"
            size="md"
            src="/vite.svg"
            alt="User Photo"
            style={{ borderRadius: '50%', border: '1px solid #000' }}
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
        </div>

        <Menu.Divider />
        <Menu.Item>View Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item>My Orders</Menu.Item>
        <Menu.Item>My Wallet</Menu.Item>
        <Menu.Divider />
        <Menu.Item> Sign Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
