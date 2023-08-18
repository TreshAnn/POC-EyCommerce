import React from 'react';

import { ProductInfo } from '../../../../packages/ui/product-info/productInfo';

import { ProductData } from '../../../../packages/ui/product-info/sample.data';
export const SampleView = () => {
  return (
    <main>
      <section>
        <div>
          <ProductInfo />
        </div>
      </section>
    </main>
  );
};
