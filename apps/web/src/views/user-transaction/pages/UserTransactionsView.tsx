import { Paper } from '@mantine/core';
import React, { useState } from 'react';
import { Transaction } from 'ui/transaction-history/Transaction';

import { useCreateRating } from '../../rating/api';
import { Rating } from '../../rating/types';
import { useGetAllOrders } from '../api';

export const UserTransactionsView = () => {
  const allOrders = useGetAllOrders({});
  const createRating = useCreateRating();

  // Callback function to handle data from child
  const handleRatingSubmission = (newRating: Rating, orderId: string) => {
    createRating.mutate({
      newRating,
      orderId,
    });
  };

  if (!allOrders.data) {
    return <Paper p="xl">No orders</Paper>;
  }

  if (allOrders.isLoading) {
    return <Paper p="xl">Loading...</Paper>;
  }

  if (allOrders.isError) {
    return <Paper p="xl">Something went wrong!</Paper>;
  }
  return (
    <main>
      <Transaction
        data={allOrders.data}
        onRatingSubmit={handleRatingSubmission}
      />
    </main>
  );
};
