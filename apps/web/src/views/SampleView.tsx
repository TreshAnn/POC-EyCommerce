import React from 'react';
import { CartData } from 'ui/tansaction-history/sampledata';
import { TransactionHistory } from 'ui/tansaction-history/transactionPage';
export const SampleView = () => {
  return (
    <main>
      <TransactionHistory
        merchantName={CartData.merchantName}
        items={CartData.items}
        productImg={CartData.productImg}
        productName={CartData.productName}
        date={CartData.date}
        totalAmount={CartData.totalAmount}
      />
    </main>
  );
};
