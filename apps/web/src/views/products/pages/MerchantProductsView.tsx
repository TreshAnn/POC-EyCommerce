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

  const handleProductSave = (productData: CreateProductDTO) => {
    // Do something with the product data, such as saving it to state
    setSavedProductData(productData);
    console.log(productData);
    close(); // Close the modal after saving
  };

  const handleAddProduct = (newProductData: CreateProductDTO) => {
    // const rq: CreateProductDTO = {
    //   productID: 'product10011',
    //   productImg: {
    //     ImgAttch: 'base64encodedimage',
    //     ImgURL:
    //       'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/250b948a-4cc6-48d2-8cb8-a5bcdfe36992/kd-trey-5-x-basketball-shoes-cNfPMN.png',
    //   },
    //   productName: 'KD Trey 5',
    //   productInfo: 'Kevin Durant Signature Shoes',
    //   productPrice: 7500,
    //   productInventory: 10,
    //   productCategory: ['sample1'],
    // };
    // console.log(rq);
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
        {/* Display other user information */}
      </div>
      <StyledContainer fluid>
        {/* <Button
          loading={createProductMutation.isLoading}
          onClick={handleAddProduct}
        >
          Add Product
        </Button> */}
        <Button onClick={open}>Add Product</Button>
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
