import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductInfo } from 'ui/product-info/productInfo';
import { ProductData } from 'ui/product-info/sample.data';

import { useGetProductById } from '../api/getProduct';

export const ProductDetailView = () => {
  const { productID } = useParams();
  const ProductID = productID ?? '';
  const productQuery = useGetProductById(ProductID, {});

  if (productQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (productQuery.isError) {
    return <h1>Error fetching product data</h1>;
  }

  const product = productQuery.data;
  return (
    <main>
      <ProductInfo
        productName={product.productName}
        productDescription={product.productInfo}
        productPrice={product.productPrice}
        merchantName={ProductData.merchantName}
        productImg={product.productImg}
      />
    </main>
  );
};
