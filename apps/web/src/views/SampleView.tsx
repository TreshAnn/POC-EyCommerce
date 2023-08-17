import React from 'react';
import { Checkout } from '../components/auth/Checkout';
import { Product } from '../../../../packages/ui/product/Product';
import { Quantity } from '../../../../packages/ui/quantity/Quantity';
import { Searchbar } from '../../../../packages/ui/searchbar/searchbar';
export const SampleView = () => {
  return (
    <main>
      <section style={{ height: '100vh' }}>
        <div>
          <Checkout />
          <br />
          <Searchbar />
          <Product />
        </div>
      </section>
    </main>
  );
};
