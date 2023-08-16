import {
  Menu,
  UnstyledButton,
  Text,
  Flex,
  Button,
  Anchor,
} from '@mantine/core';
import { StyledMenuDropdown, StyledMenuLabel } from './styles';
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
      <StyledMenuDropdown>
        <StyledMenuLabel
          style={{
            position: 'sticky',
            top: -4,
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
              <Anchor href="/#" target="_blank">
                <Text fz="sm" color="yellow">
                  View all
                </Text>
              </Anchor>
            </Flex>
          </Text>
        </StyledMenuLabel>
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
        <StyledMenuLabel
          style={{
            position: 'sticky',
            bottom: -5,
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
        </StyledMenuLabel>
      </StyledMenuDropdown>
    </Menu>
  );
};

export default HeaderCart;
