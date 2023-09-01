import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductInfo } from 'ui/product-info/productInfo';

import { useGetAll } from '../api/getAllMerchant';
import { useGetProductById } from '../api/getProduct';
import { RatingModule } from 'ui/rating/RatingModule';
import { testData } from 'ui/rating/user-review/test-data';

export const ProductDetailView = () => {
  const { productID } = useParams();
  const ProductID = productID ?? '';
  const productQuery = useGetProductById(ProductID, {});
  const merchantQuery = useGetAll({});
  const merchantsInfo = merchantQuery.data || [];

  const merchantID = productQuery.data?.merchantID;

  const getMerchant = merchantsInfo.find(
    (merchant) => merchant.auth._id === merchantID,
  );

  if (productQuery.isLoading || merchantQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (productQuery.isError || merchantQuery.isLoading) {
    return <h1>Error fetching product data</h1>;
  }

  const product = productQuery.data;
  return (
    <main>
      <ProductInfo
        productName={product.productName}
        productDescription={product.productInfo}
        productPrice={product.productPrice}
        merchantName={getMerchant?.merchantName || ''}
        productImg={product.productImg}
      />

      <br />
      <br />
      <RatingModule reviews={testData} ratingValue={5} reviewCount={3423} />
    </main>
  );
};
