import { Center, Container, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import CartTable from '../../../../packages/ui/cart/CartTable';
import { useCartQuantity } from './cart/api/cartQuantity';
import { useDeleteItem } from './cart/api/deleteItem';
import { useGetCart } from './cart/api/getCart';
import { UpdateCart } from './cart/types';
import { useQuery } from '@tanstack/react-query';

export const CartView = () => {
  const { data, isLoading, isError, refetch, isSuccess } = useGetCart({});
  const [cartData, setCartData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [totalCartItemAmount, setTotalCartItemAmount] = useState<number>(0);
  const cartUpdate = useCartQuantity({});
  const deleteItem = useDeleteItem({});

  // eslint-disable-next-line no-console
  // console.log(item);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('useEffect triggered');
    // If a deletion is successful, refetch the 'cart' query to get updated data
    if (deleteItem.isSuccess) {
      // eslint-disable-next-line no-console
      console.log('Deletion was successful, refetching...');
      refetch();
    }
  }, [deleteItem.isSuccess, refetch]);

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

  const updateToCartHandler = (id: string, quantity?: number) => {
    if (quantity !== undefined) {
      const updatedItem: UpdateCart = {
        productId: id,
        quantity: quantity,
      };
      cartUpdate.mutate(updatedItem);
    }
  };

  const deleteItemHandler = (productId: string) => {
    deleteItem.mutate(productId);
    //refetch();
  };

  return (
    <main>
      {/* Section height is for demo purposes only; please position the footer at the bottom instead of the middle */}
      <section style={{ height: '80vh', background: 'lightgray' }}>
        <div>
          <br />
          {data.length !== 0 ? (
            <CartTable
              data={data}
              totalCartItemAmount={totalCartItemAmount}
              totalAmountHandler={totalAmountHandler}
              updateToCartHandler={updateToCartHandler}
              deleteItem={deleteItemHandler}
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
