import { Menu } from '@mantine/core';

interface DropdownProps {
  target: React.ReactNode;
  menuItems: (string | 'divider')[];
  avatarContent?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  target,
  menuItems,
  avatarContent,
}) => {
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
            return <Menu.Item key={index}>{item}</Menu.Item>;
          }
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
