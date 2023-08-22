import React from 'react';
import { ProductInfo } from 'ui/product-info/productInfo';
import { ProductData } from 'ui/product-info/sample.data';

import { Product } from '../components/auth/Product';
export const SampleView = () => {
  return (
    <main>
      <ProductInfo
        productName={ProductData.productName}
        ratingValue={ProductData.ratingValue}
        productDescription={ProductData.productDescription}
        productPrice={ProductData.productPrice}
        merchantName={ProductData.merchantName}
        productImg={ProductData.productImg}
      />
    </main>
  );
};
