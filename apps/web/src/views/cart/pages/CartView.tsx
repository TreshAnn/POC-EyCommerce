import { Center, Container, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import CartTable from '../../../../../../packages/ui/cart/CartTable';
import { useCartQuantity } from '../api/cartQuantity';
import { useDeleteItem } from '../api/deleteItem';
import { useGetCart } from '../api/getCart';
import { OrderedItems } from '../types';

export type UpdateCartDTO = Pick<OrderedItems, 'productId' | 'quantity'>;

export const CartView = () => {
  const { data, isLoading, isError, refetch, isSuccess } = useGetCart({});
  const [cartData, setCartData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [totalCartItemAmount, setTotalCartItemAmount] = useState<number>(0);
  const cartUpdate = useCartQuantity({});
  const deleteItem = useDeleteItem({});

  useEffect(() => {
    // If a deletion is successful, refetch the 'cart' query to get updated data
    if (deleteItem.isSuccess) {
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
      const updatedItem: UpdateCartDTO = {
        productId: id,
        quantity: quantity,
      };
      cartUpdate.mutate(updatedItem);
    }
  };

  const deleteItemHandler = (productId: string) => {
    deleteItem.mutate(productId);
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
            customMessage('Cart Empty')
          )}
        </div>
      </section>
    </main>
  );
};

export default CartView;
