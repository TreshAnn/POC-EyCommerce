import { useParams } from 'react-router-dom';
import { useGetMerchant, useGetMerchantProducts } from '../api';
import { CreateProductDTO, useCreateProduct } from '../api/addProduct';
import { Product } from 'ui/product/Product';
import ProductModal from 'ui/product/ProductModal';
import { useDisclosure } from '@mantine/hooks';
import { StyledContainer } from './styles';
import { Button, Grid, Title } from '@mantine/core';

import React, { useState } from 'react';

export const MerchantProducts: React.FC = () => {
  const [savedProductData, setSavedProductData] =
    useState<CreateProductDTO | null>(null);
  const [isOpen, { open, close }] = useDisclosure();
  const { merchantID } = useParams<{ merchantID: string }>();
  const merchantQuery = useGetMerchant({}, merchantID);
  const productQuery = useGetMerchantProducts({});
  const createProductMutation = useCreateProduct({});

  // const handleProductSave = (productData: CreateProductDTO) => {
  //   setSavedProductData(productData);
  //   console.log(productData);
  //   close();
  // };

  const handleAddProduct = (newProductData: CreateProductDTO) => {
    console.log(newProductData);
    createProductMutation.mutate({ ...newProductData });
  };

  if (merchantQuery.isLoading || productQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (merchantQuery.isError || !productQuery.data) {
    return <div>Error loading store data</div>;
  }

  if (!productQuery?.data?.length) {
    return <h1>No Product</h1>;
  }

  return (
    <main>
      <div>
        <ProductModal
          onSave={handleAddProduct}
          isOpen={isOpen}
          onClose={close}
        />
        <Title order={1} align="center">
          {merchantQuery.data?.merchantName} Products
        </Title>
      </div>
      <StyledContainer fluid>
        <Button loading={createProductMutation.isLoading} onClick={open}>
          Add Product
        </Button>
        <Grid>
          {productQuery.data.map((data) => {
            return (
              <Grid.Col sm={4} md={3} lg={2.4}>
                <Product
                  img={data.productImg.ImgURL}
                  name={data.productName}
                  price={data.productPrice}
                ></Product>
              </Grid.Col>
            );
          })}
        </Grid>
      </StyledContainer>
    </main>
  );
};

export default MerchantProducts;
