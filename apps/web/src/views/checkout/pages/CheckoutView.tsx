import { Button, Paper, Stack, Title } from '@mantine/core';
import React from 'react';
import { AddressCard } from 'ui/Card/AddressCard';
import { OrderSummary } from 'ui/Card/OrderSummary';
import { PaymentDetails } from 'ui/Card/PaymentDetails';

import { useGetCart } from '../../cart/api/getCart';
import { useGetOneUser } from '../../user/api/getUser';
import { CreateOrderDTO, useCreateOrder } from '../api';
import { StyledContainer } from './styles';

export const CheckoutView = () => {
  const paymentMethod = 'cash';
  const deliveryFee = 49;
  const checkoutData = {
    productId: [''],
    shippingFee: deliveryFee,
    status: 'processing',
    paymentMethod: paymentMethod,
  };
  const cart = useGetCart({});
  const createOrder = useCreateOrder();
  const cartUser = useGetOneUser({}, cart.data?.userId || '');

  const handleCheckOut = (newOrderData: CreateOrderDTO) => {
    // eslint-disable-next-line no-console
    console.log(newOrderData);
    createOrder.mutate({ ...newOrderData });
  };

  if (cart.data) {
    const productIds = cart.data.orderedItems.map((item) => item.productId);
    checkoutData.productId = productIds;
  }

  if (cart.isLoading) {
    return (
      <StyledContainer>
        <Paper p="xl">Loading...</Paper>
      </StyledContainer>
    );
  }

  if (cart.isError) {
    return (
      <StyledContainer>
        <Paper p="xl">Something went wrong!</Paper>
      </StyledContainer>
    );
  }

  if (cartUser.data) {
    return (
      <main>
        <StyledContainer>
          <Paper w="80%" p="xl">
            <Stack>
              <Title>Order Summary</Title>
              <AddressCard data={cartUser.data} />
              <OrderSummary data={{ ...cart.data, deliveryFee: deliveryFee }} />
              <PaymentDetails
                totalPrice={cart.data.totalAmount}
                deliveryFee={deliveryFee}
                paymentMethod={paymentMethod}
              />
              <Button
                onClick={() => handleCheckOut(checkoutData)}
                fw={400}
                fullWidth
                style={{ color: 'black' }}
              >
                Place Order
              </Button>
            </Stack>
          </Paper>
        </StyledContainer>
      </main>
    );
  } else {
    return (
      <StyledContainer>
        <Paper p="xl">No data</Paper>
      </StyledContainer>
    );
  }
};

export default CheckoutView;
