import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductInfo } from 'ui/product-info/productInfo';
import { RatingModule } from 'ui/rating/RatingModule';
import { testData } from 'ui/rating/user-review/test-data';

import { AddToCartDTO, useAddToCart } from '../../cart/api/addToCart';
import { useGetAll } from '../api/getAllMerchant';
import { useGetProductById } from '../api/getProduct';

export const ProductDetailView = () => {
  // Get the productID from the route parameters
  const { productID } = useParams();
  const ProductID = productID ?? '';
  // APIs
  const productQuery = useGetProductById(ProductID, {});
  const merchantQuery = useGetAll({});
  const merchantsInfo = merchantQuery.data || [];
  const addToCartMutation = useAddToCart({});

  const navigate = useNavigate();
  const merchantID = productQuery.data?.merchantID;

  const getMerchant = merchantsInfo.find(
    (merchant) => merchant.auth._id === merchantID,
  );

  const [quantity, setQuantity] = useState(1);

  if (productQuery.isLoading || merchantQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (productQuery.isError || merchantQuery.isLoading) {
    return <h1>Error fetching productdata</h1>;
  }

  const addToCartHandler = (productId) => {
    const rq: AddToCartDTO = {
      quantity: quantity,
      productId: productId,
    };

    addToCartMutation.mutate({ ...rq });
  };
  return (
    <main>
      <ProductInfo
        productName={productQuery.data.productName}
        productDescription={productQuery.data.productInfo}
        productPrice={productQuery.data.productPrice}
        merchantName={getMerchant?.merchantName || ''}
        productImg={productQuery.data.productImg}
        inventory={productQuery.data.productInventory}
        addToCart={() => addToCartHandler(productQuery.data._id)}
        checkoutBtnHandler={() => navigate(`/checkout`)} //sample path only
        quantity={quantity}
        onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
      />

      <br />
      <br />
      <RatingModule reviews={testData} ratingValue={5} reviewCount={3423} />
    </main>
  );
};
