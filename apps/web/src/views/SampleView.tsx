import React from 'react';
import UserReview from '../../../../packages/ui/rating/user-review/UserReview';
// import { Product } from '../../../../packages/ui/product/Product';
import { Quantity } from '../../../../packages/ui/quantity/Quantity';
import { Searchbar } from '../../../../packages/ui/searchbar/searchbar';
import { testData } from '../../../../packages/ui/rating/user-review/test-data';
import { Checkout } from '../components/auth/Checkout';
import { Product } from '../../../../packages/ui/product/Product';
import { RatingComponent } from '../../../../packages/ui/rating/rating';
export const SampleView = () => {
  return (
    <main>
      <section>
        <div>
          <Checkout />
          <br />
          <Quantity />
          <Searchbar />
          {/* <Product /> */}
          <UserReview comment={testData} />
          <RatingComponent />
        </div>
      </section>
    </main>
  );
};
