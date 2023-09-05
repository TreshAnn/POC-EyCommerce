import { Flex, Grid, Title } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from 'ui/product/Product';
import { Searchbar } from 'ui/searchbar/searchbar';

import { AddToCartDTO, useAddToCart } from '../../cart/api/addToCart';
import { useGetAllProducts } from '../api';
import { StyledContainer, StyledGridCol } from './styles';

export const ProductsView = () => {
  const productQuery = useGetAllProducts({});
  const addToCartMutation = useAddToCart({});
  const navigate = useNavigate();
  if (productQuery.isLoading) {
    return <h1>...Loading</h1>;
  }

  if (!productQuery?.data?.length) {
    return <h1>No Product</h1>;
  }

  if (!productQuery.data) return <h1>error</h1>;

  const addToCartHandler = (productId) => {
    const rq: AddToCartDTO = {
      quantity: 1,
      productID: productId,
    };

    // eslint-disable-next-line no-console
    console.log(rq);
    addToCartMutation.mutate({ ...rq });
  };

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
          {productQuery.data.map((data, index) => {
            if (data.isActive && data.productInventory > 0) {
              return (
                <StyledGridCol xs={6} sm={4} md={3} lg={2.4} key={data._id}>
                  <Product
                    img={data.productImg[0]}
                    name={data.productName}
                    price={data.productPrice}
                    viewProductHandler={() => navigate(`/products/${data._id}`)}
                    addToCart={() => addToCartHandler(data.productID)}
                  ></Product>
                </StyledGridCol>
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
