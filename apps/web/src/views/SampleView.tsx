import React from 'react';
import UserReview from '../../../../packages/ui/rating/user-review/UserReview';
// import { Product } from '../../../../packages/ui/product/Product';
import { Quantity } from '../../../../packages/ui/quantity/Quantity';
import { Searchbar } from '../../../../packages/ui/searchbar/searchbar';
import { testData } from '../../../../packages/ui/rating/user-review/test-data';

export const SampleView = () => {
  return (
    <main>
      {/* Section height is for demo purposes only; please position the footer at the bottom instead of the middle */}
      <section style={{ height: '100vh' }}>
        <div>
          <br />
          <Quantity />
          <Searchbar />
          {/* <Product /> */}
          <UserReview comment={testData} />
        </div>
      </section>
    </main>
  );
};
