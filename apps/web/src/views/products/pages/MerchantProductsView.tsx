import { useParams } from 'react-router-dom';
import { useGetMerchant, useGetMerchantProducts } from '../api';
import { CreateProductDTO, useCreateProduct } from '../api/addProduct';
import { UpdateProductDTO, useUpdateProduct } from '../api/updateProduct';
import MerchantProduct from 'ui/product/MerchantProduct';
import ProductModal from 'ui/product/ProductModal';
import { StyledContainer } from './styles';
import { Button, Grid, Title } from '@mantine/core';

import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const MerchantProducts: React.FC = () => {
  //API
  const { merchantID } = useParams<{ merchantID: string }>();
  const merchantQuery = useGetMerchant({}, merchantID);
  const merchantProductsQuery = useGetMerchantProducts({});
  const merchantProducts = merchantProductsQuery.data || [];
  const createProductMutation = useCreateProduct({});

  //Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const updateProductMutation = useUpdateProduct({}, selectedProductId || '');

  //Conditionally execute useGetProduct
  const selectedProduct = merchantProducts.find(
    (product) => product._id === selectedProductId,
  );

  const handleEditProduct = (productId: string) => {
    setSelectedProductId(productId);
    setIsAddingProduct(false); // Set to false to indicate editing
    setIsModalOpen(true); // Open the modal
  };

  const handleNewProduct = () => {
    setSelectedProductId('');
    setIsAddingProduct(true); // Set to true to indicate adding
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    // setSelectedProductId('');
    setIsAddingProduct(false);
  };

  const handleAddProduct = (newProductData: CreateProductDTO) => {
    createProductMutation.mutate({ ...newProductData });
  };

  const handleUpdateProduct = (newProductData: UpdateProductDTO) => {
    updateProductMutation.mutate({ ...newProductData });
  };

  if (merchantQuery.isLoading || merchantProductsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (merchantQuery.isError || !merchantProductsQuery.data) {
    return <div>Error loading store data</div>;
  }

  if (!merchantProductsQuery?.data?.length) {
    return <h1>No Product</h1>;
  }

  return (
    <main>
      <StyledContainer fluid>
        <div>
          <ProductModal
            onSave={isAddingProduct ? handleAddProduct : handleUpdateProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            id={selectedProductId}
            editProduct={selectedProduct}
            isAddingProduct={isAddingProduct}
            isLoading={
              isAddingProduct
                ? createProductMutation.isLoading
                : updateProductMutation.isLoading
            }
          />
          <Title order={1} align="center">
            {merchantQuery.data?.merchantName} Products
          </Title>
        </div>

        <Button
          loading={createProductMutation.isLoading}
          onClick={handleNewProduct}
          style={{ color: 'black' }}
        >
          Add Product
        </Button>
        <Grid>
          {merchantProductsQuery.data.map((data) => {
            return (
              <Grid.Col sm={4} md={3} lg={2.4}>
                <MerchantProduct
                  id={data._id}
                  img={data.productImg.ImgURL}
                  name={data.productName}
                  info={data.productInfo}
                  stock={data.productInventory}
                  price={data.productPrice}
                  onEdit={(selectedProductId) =>
                    handleEditProduct(selectedProductId)
                  }
                ></MerchantProduct>
              </Grid.Col>
            );
          })}
        </Grid>
      </StyledContainer>
    </main>
  );
};

export default MerchantProducts;
