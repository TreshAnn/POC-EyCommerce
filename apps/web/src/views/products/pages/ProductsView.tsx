import { Button, Grid } from '@mantine/core';
import React from 'react';
import Product from 'ui/product/Product';

import { useGetAllProducts } from '../api';
import { StyledContainer } from './styles';

export const ProductsView = () => {
  const productQuery = useGetAllProducts({});

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
