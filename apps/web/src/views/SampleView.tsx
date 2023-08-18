import React from 'react';
import { ProductInfo } from 'ui/product-info/productInfo';
import { ProductData } from 'ui/product-info/sample.data';

import { Product } from '../components/auth/Product';
export const SampleView = () => {
  return (
    <main>
      <ProductInfo data={ProductData} />
    </main>
  );
};
