import { Flex, Grid, Title } from '@mantine/core';
import React from 'react';
import Product from 'ui/product/Product';
import { Searchbar } from 'ui/searchbar/searchbar';

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
        <Flex justify="center" align="center" gap="xs">
          <Title order={1} weight={600} align="center">
            EY
          </Title>
          <Title order={1} weight={200} align="center">
            Store
          </Title>
        </Flex>

        <Searchbar />
        <Grid>
          {productQuery.data.map((data) => {
            if (data.isActive && data.productInventory > 0) {
              return (
                <Grid.Col sm={4} md={3} lg={2.4}>
                  <Product
                    img={data.productImg.ImgURL}
                    name={data.productName}
                    price={data.productPrice}
                  ></Product>
                </Grid.Col>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      </StyledContainer>
    </main>
  );
};
