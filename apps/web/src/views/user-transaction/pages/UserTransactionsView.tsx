import { Paper } from '@mantine/core';
import React from 'react';
import { Transaction } from 'ui/transaction-history/Transaction';

import { useGetAllOrders } from '../api';

export const UserTransactionsView = () => {
  const allOrders = useGetAllOrders({});

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
      <Transaction data={allOrders.data} />
    </main>
  );
};
