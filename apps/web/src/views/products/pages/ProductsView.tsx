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
      productID: 'product10010',
      productImg: {
        ImgAttch: 'base64encodedimage',
        ImgURL:
          'https://sneakernews.com/wp-content/uploads/2020/02/nike-kobe-5-protro-lakers-CD4991-500-2.jpg',
      },
      productName: 'Kobe 5 Protro',
      productInfo: 'Mamba 4ever',
      productPrice: 12000,
      productInventory: 10,
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
