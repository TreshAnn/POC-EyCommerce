import React from 'react';
import { Checkout } from '../components/auth/Checkout';
import { Product } from '../../../../packages/ui/product/Product';
import { Quantity } from '../../../../packages/ui/quantity/Quantity';
import { Searchbar } from '../../../../packages/ui/searchbar/searchbar';
import { RatingComponent } from '../../../../packages/ui/rating/rating';

export const SampleView = () => {
  return (
    <main>
      <section style={{ height: '100vh' }}>
        <div>
          <Checkout />
          <br />
          <RatingComponent />
        </div>
      </section>
    </main>
  );
};
