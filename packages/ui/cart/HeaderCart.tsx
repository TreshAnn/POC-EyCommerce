import {
  Anchor,
  Button,
  Flex,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import React, { useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';

import {
  Cart as RqCart,
  OrderedItems,
} from '../../../apps/web/src/views/cart/types';
import Cart from './Cart';
import { StyledMenuDropdown, StyledMenuLabel } from './styles';

interface ICartItem {
  id: number;
  imageSrc: string;
  merchant: string;
  productName: string;
  price: number;
  quantity: number;
}

interface Props {
  data: RqCart;
}

const HeaderCart = ({ data: { orderedItems = [] } }: Props) => {
  const [cartItems, setCartItems] = useState(orderedItems);
  const [subtotal, setSubtotal] = React.useState(0);

  const calculateSubtotal = (items: OrderedItems[]) => {
    return items.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0,
    );
  };

  React.useEffect(() => {
    const initialSubtotal = calculateSubtotal(cartItems);
    setSubtotal(initialSubtotal);
  }, [cartItems]);

  const handleCartItemQuantityChange = (
    itemId: string,
    newQuantity: number,
  ) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productID === itemId) {
        // eslint-disable-next-line no-console
        console.log(itemId);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    const newSubtotal = calculateSubtotal(updatedCartItems);
    setSubtotal(newSubtotal);
  };

  const formattedSubtotal = subtotal.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
                  <Text>&nbsp;({orderedItems?.length})</Text>
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
        {cartItems.length === 0 ? (
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            Cart is empty
          </Text>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <Menu.Item key={index}>
                <Cart
                  imageSrc={item.productImg.ImgURL}
                  merchant={'Test Merchant'}
                  productName={item.productName}
                  price={item.productPrice}
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity: number) =>
                    handleCartItemQuantityChange(item.productID, newQuantity)
                  }
                />
              </Menu.Item>
            ))}
          </>
        )}
        <Menu.Divider />
        <StyledMenuLabel
          style={{
            position: 'sticky',
            bottom: -5,
          }}
        >
          <Flex align="center" justify="space-between">
            <Text fz="md" color="black" style={{ whiteSpace: 'nowrap' }}>
              Subtotal &nbsp;&nbsp; ₱{formattedSubtotal}
            </Text>
            <Anchor href="/cart">
              <Button ml="20px" style={{ color: 'black' }}>
                View Cart
              </Button>
            </Anchor>
          </Flex>
        </StyledMenuLabel>
      </StyledMenuDropdown>
    </Menu>
  );
};

export default HeaderCart;
