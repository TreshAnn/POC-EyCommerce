import React from 'react';

//add imports for component to test
import { CartData } from '../../../../packages/ui/tansaction-history/sampledata';
import { TransactionHistory } from '../../../../packages/ui/tansaction-history/transactionPage';

// NOTE: This view is for testing of component/views(frontend only tasks)
// When used, please remove imports and components inside main before merging active PR
export const SampleView = () => {
  //Add test functions here
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
