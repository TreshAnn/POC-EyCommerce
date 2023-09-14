import { Menu } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import React from 'react';
interface DropdownItem {
  label: string;
  path?: string; // Make the path optional
}

interface DropdownProps {
  target: React.ReactNode;
  menuItems: (DropdownItem | 'divider')[];
  avatarContent?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  target,
  menuItems,
  avatarContent,
}) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };
  return (
    <Menu shadow="md" width={200} position="bottom-start">
      <Menu.Target>{target}</Menu.Target>

      <Menu.Dropdown>
        {avatarContent && (
          <div style={{ padding: '8px 10px', minWidth: 200 }}>
            {avatarContent}
          </div>
        )}
        <Menu.Divider />
        {menuItems.map((item, index) => {
          if (item === 'divider') {
            return <Menu.Divider key={index} />;
          } else {
            return (
              <Menu.Item
                key={index}
                onClick={() => handleMenuItemClick(item.path)}
              >
                {item.label}
              </Menu.Item>
            );
          }
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
