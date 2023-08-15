import {
  Menu,
  UnstyledButton,
  Text,
  Flex,
  Button,
  Anchor,
} from '@mantine/core';
import { TiShoppingCart } from 'react-icons/ti';
import Cart from './Cart';

interface ICartItem {
  id: number;
  imageSrc: string;
  merchant: string;
  productName: string;
  price: number;
}
interface IHeaderCartProps {
  cartItems: ICartItem[];
}
const HeaderCart: React.FC<IHeaderCartProps> = ({ cartItems }) => {
  return (
    <Menu shadow="md" width={400}>
      <Menu.Target>
        <UnstyledButton>
          <TiShoppingCart color="#fab005" size={36} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown style={{ maxHeight: '575px', overflowY: 'auto' }}>
        <Menu.Label
          style={{
            position: 'sticky',
            top: -4,
            background: '#fff',
            zIndex: 2,
            padding: '10px 0px',
          }}
        >
          <Text fz="lg" color="black">
            <Flex align="center" justify="space-between">
              <div>
                <Flex>
                  <Text fw={700}>My Cart</Text>
                  <Text>&nbsp;(4)</Text>
                </Flex>
              </div>
              <Anchor href="#" target="_blank">
                <Text fz="sm" color="yellow">
                  View all
                </Text>
              </Anchor>
            </Flex>
          </Text>
        </Menu.Label>
        <Menu.Divider />
        {cartItems.map((item) => (
          <Menu.Item key={item.id}>
            <Cart
              imageSrc={item.imageSrc}
              merchant={item.merchant}
              productName={item.productName}
              price={item.price}
            />
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Label
          style={{
            position: 'sticky',
            bottom: -4,
            background: '#fff',
            zIndex: 2,
            padding: '10px 0',
          }}
        >
          <Flex align="center" justify="space-between">
            <Text fz="md" color="black" style={{ whiteSpace: 'nowrap' }}>
              Subtotal &nbsp;&nbsp;&nbsp; $400.00
            </Text>
            <Button ml="20px" fullWidth style={{ color: 'black' }}>
              View Cart
            </Button>
          </Flex>
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};

export default HeaderCart;
