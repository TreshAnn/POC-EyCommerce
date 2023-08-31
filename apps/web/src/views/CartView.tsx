import React, { useState, useEffect } from 'react';
import { Center, Container, Text } from '@mantine/core';
import CartTable from '../../../../packages/ui/cart/CartTable';
import { useGetCart } from './cart/api/getCart';
import { useCartQuantity } from './cart/api/cartQuantity';
import { UpdateCart } from './cart/types';

export const CartView = () => {
  const { data, isLoading, isError, error } = useGetCart({});
  const [cartData, setCartData] = useState([]);
  const [totalCartItemAmount, setTotalCartItemAmount] = useState<number>(0);
  const cartUpdate = useCartQuantity({});

  // eslint-disable-next-line no-console
  // console.log(item);

  const customMessage = (message: string) => {
    return (
      <Container size="xs" style={{ minHeight: '100vh', marginTop: '20px' }}>
        <Center>
          <Text align="center" size="xl">
            {message}
          </Text>
        </Center>
      </Container>
    );
  };

  if (isLoading) {
    return customMessage('Loading...');
  }

  if (isError) {
    return customMessage('Something went wrong!');
  }

  // EVENT HANDLERS
  const totalAmountHandler = (testAmount: number) => {
    setTotalCartItemAmount(testAmount);
  };

  const updateToCartHandler = (id: string, quantity: number) => {
    if (quantity !== undefined) {
      const updatedItem: UpdateCart = {
        productID: id,
        quantity: quantity,
      };
      cartUpdate.mutate(updatedItem);
    }
  };

  return (
    <main>
      {/* Section height is for demo purposes only; please position the footer at the bottom instead of the middle */}
      <section style={{ height: '80vh', background: 'lightgray' }}>
        <div>
          <br />
          {!data || data?.orderedItems?.length !== 0 ? (
            <CartTable
              data={data}
              totalCartItemAmount={totalCartItemAmount}
              totalAmountHandler={totalAmountHandler}
              updateToCartHandler={updateToCartHandler}
            />
          ) : (
            customMessage('Cart empty')
          )}
        </div>
      </section>
    </main>
  );
};

export default CartView;
