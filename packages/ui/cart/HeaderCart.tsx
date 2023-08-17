import {
  Menu,
  UnstyledButton,
  Text,
  Flex,
  Button,
  Anchor,
} from '@mantine/core';
import React, { useState } from 'react';
import { StyledMenuDropdown, StyledMenuLabel } from './styles';
import { TiShoppingCart } from 'react-icons/ti';
import Cart from './Cart';

interface ICartItem {
  id: number;
  imageSrc: string;
  merchant: string;
  productName: string;
  price: number;
  quantity: number;
}

const HeaderCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      imageSrc:
        'https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg',
      merchant: 'Sample Merchant 1',
      productName: 'Product 1',
      price: 200.0,
      quantity: 4,
    },
    {
      id: 2,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 2',
      productName: 'Product 2',
      price: 150.0,
      quantity: 2,
    },
    {
      id: 3,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },
    // Add more items as needed to test
  ]);
  const [subtotal, setSubtotal] = React.useState(0);

  const calculateSubtotal = (items: ICartItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  React.useEffect(() => {
    const initialSubtotal = calculateSubtotal(cartItems);
    setSubtotal(initialSubtotal);
  }, [cartItems]);

  const handleCartItemQuantityChange = (
    itemId: number,
    newQuantity: number,
  ) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    const newSubtotal = calculateSubtotal(updatedCartItems);
    setSubtotal(newSubtotal);
  };

  return (
    <Menu shadow="md" width={400} closeOnItemClick={false}>
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
              quantity={item.quantity}
              onQuantityChange={(newQuantity: number) =>
                handleCartItemQuantityChange(item.id, newQuantity)
              }
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
              Subtotal &nbsp;&nbsp; ₱{subtotal.toFixed(2)}
            </Text>
            <Button ml="20px" style={{ color: 'black' }}>
              View Cart
            </Button>
          </Flex>
        </StyledMenuLabel>
      </StyledMenuDropdown>
    </Menu>
  );
};

export default HeaderCart;
