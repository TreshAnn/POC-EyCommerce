import { Text } from '@mantine/core';
import React from 'react';

function OrderTableHead() {
  return (
    <>
      <thead>
        <tr>
          <th colSpan={3}>
            <Text fz="xl" fw={700}>
              Product(s)
            </Text>
          </th>
          <th>
            <Text fw={700}>Date</Text>
          </th>
          <th>
            <Text fw={700}>Quantity</Text>
          </th>
          <th>
            <Text fw={700}>Amount</Text>
          </th>
        </tr>
      </thead>
    </>
  );
}

export default OrderTableHead;
