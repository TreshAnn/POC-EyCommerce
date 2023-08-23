import { Grid } from '@mantine/core';
import React from 'react';
import Product from 'ui/product/Product';

// Import the useGetCart hook
import { useGetCart } from '../api/getCart';
import { StyledContainer } from './styles';

export const CartView = () => {
  // Use the useGetCart hook to fetch cart data
  const cartQuery = useGetCart({});

  if (cartQuery.isLoading) {
    return <h1>Loading, Please Wait.</h1>;
  }

  if (!cartQuery?.data?.orderedItems?.length) {
    return <h1>No Cart item.</h1>;
  }

  if (cartQuery.isError) return <h1>error</h1>;

  const handleOnClick = () => {
    // eslint-disable-next-line no-console
    console.log(cartQuery.data);
    // console.log(Object.values(cartQuery.data));
    // console.log(cartQuery.data.orderedItems[0].productImg.ImgURL);
  };

  return (
    <main>
      <StyledContainer fluid>
        <Grid>
          {cartQuery.data.orderedItems.map((item, index) => {
            return (
              <Grid.Col sm={4} md={3} lg={12} key={index}>
                <Product
                  img={item.productImg.ImgURL} // Assuming you want the first item's image
                  name={item.productName} // Assuming you want the first item's name
                  price={item.productPrice} // Assuming you want the first item's price
                />
              </Grid.Col>
            );
          })}
        </Grid>

        <button onClick={handleOnClick}>Test</button>
      </StyledContainer>
    </main>
  );
};

// cartQuery.data.orderedItems - holds the data
