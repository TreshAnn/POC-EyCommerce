import { Button, Grid } from '@mantine/core';
import React from 'react';
import Product from 'ui/product/Product';

import { useGetAllProducts } from '../api';
import { CreateProductDTO, useCreateProduct } from '../api/addProduct';
import { StyledContainer } from './styles';

export const ProductsView = () => {
  const productQuery = useGetAllProducts({});
  const createProductMutation = useCreateProduct({});

  const handleAddProduct = () => {
    const rq: CreateProductDTO = {
      productID: 'product11333',
      productImg: {
        ImgAttch: 'base64encodedimage',
        ImgURL:
          'https://ever-supermarket2.myshopify.com/cdn/shop/products/9000007743-Purefoods-Tender-Juicy-Hotdog-Jumbo-45-1kg-210430_cefb9798-cde5-4bd8-8931-33c201ca4f69_1200x1200.jpg?v=1674195201',
      },
      productName: 'TJ CheeseDog 123213',
      productInfo: 'TJ Desc',
      productPrice: 180,
      productInventory: 3,
      productCategory: ['sample1'],
    };

    createProductMutation.mutate({ ...rq });
  };

  if (productQuery.isLoading) {
    return <h1>...Loading</h1>;
  }

  if (!productQuery?.data?.length) {
    return <h1>No Product</h1>;
  }

  if (!productQuery.data) return <h1>error</h1>;

  return (
    <main>
      <StyledContainer fluid>
        <Button
          loading={createProductMutation.isLoading}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
        <Grid>
          {productQuery.data.map((data, index) => {
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
