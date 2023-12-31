import { Button, Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';
import MerchantProduct from 'ui/product/MerchantProduct';
import ProductModal from 'ui/product/ProductModal';

import {
  useActivateProduct,
  useDeactivateProduct,
  useGetMerchantProducts,
} from '../api';
import { CreateProductDTO, useCreateProduct } from '../api/addProduct';
import { UpdateProductDTO, useUpdateProduct } from '../api/updateProduct';
import { useGetAll } from '../api/getAllMerchant';
import { StyledContainer, StyledGridCol } from './styles';

export const MerchantProducts: React.FC = () => {
  //API
  const { user } = useAuth();
  const merchantQuery = useGetAll({}) || [];

  const merchantProductsQuery = useGetMerchantProducts({});
  const merchantProducts = merchantProductsQuery.data || [];
  const reversedData = [...merchantProducts].reverse();
  const createProductMutation = useCreateProduct({});

  //Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const deactivateProductQuery = useDeactivateProduct({}, selectedProductId);
  const activateProductQuery = useActivateProduct({}, selectedProductId);
  const updateProductMutation = useUpdateProduct({}, selectedProductId || '');
  const merchant =
    merchantQuery.data &&
    merchantQuery.data.find((merchant) => merchant.auth._id === user.sub);

  useEffect(() => {
    if (updateProductMutation.isSuccess) {
      setIsModalOpen(false);
    }
    if (createProductMutation.isSuccess) {
      handleCloseModal();
    }
  }, [createProductMutation.isSuccess, updateProductMutation.isSuccess]);

  useEffect(() => {
    if (updateProductMutation.isError) {
      setIsModalOpen(true);
    }
    if (createProductMutation.isError) {
      setIsModalOpen(true);
    }
  }, [createProductMutation.isError, updateProductMutation.isError]);

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
    setIsAddingProduct(false);
  };

  const handleDeactivateProduct = () => {
    deactivateProductQuery.refetch();
  };

  const handleActivateProduct = () => {
    activateProductQuery.refetch();
  };

  const handleAddProduct = (newProductData: CreateProductDTO) => {
    createProductMutation.mutate({ ...newProductData });
  };

  const handleUpdateProduct = async (newProductData: UpdateProductDTO) => {
    updateProductMutation.mutate({ ...newProductData });
  };

  if (merchantQuery.isLoading || merchantProductsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (merchantQuery.isError || !merchantProductsQuery.data) {
    return <div>Error loading store data</div>;
  }

  return (
    <main>
      <StyledContainer fluid>
        <div>
          <ProductModal
            onSave={isAddingProduct ? handleAddProduct : handleUpdateProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={
              selectedProduct?.isActive
                ? handleDeactivateProduct
                : handleActivateProduct
            }
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
            {merchant ? merchant.merchantName : 'Loading...'} Products
          </Title>
        </div>
        {!merchantProductsQuery?.data?.length ? (
          <>
            <Button
              loading={createProductMutation.isLoading}
              onClick={handleNewProduct}
              style={{ color: 'black' }}
            >
              Add Product
            </Button>
            <h1>No Product</h1>
          </>
        ) : (
          <>
            <Button
              loading={createProductMutation.isLoading}
              onClick={handleNewProduct}
              style={{ color: 'black' }}
            >
              Add Product
            </Button>
            <Grid>
              {reversedData.map((data) => {
                if (data.isActive) {
                  return (
                    <StyledGridCol xs={6} sm={4} md={3} lg={2.4}>
                      <MerchantProduct
                        id={data._id}
                        img={data.productImg[0]}
                        name={data.productName}
                        info={data.productInfo}
                        stock={data.productInventory}
                        price={data.productPrice}
                        onEdit={(selectedProductId) =>
                          handleEditProduct(selectedProductId)
                        }
                        isLoading={
                          updateProductMutation.isLoading ||
                          createProductMutation.isLoading
                        }
                      ></MerchantProduct>
                    </StyledGridCol>
                  );
                }
              })}
            </Grid>
            <Title order={4} pt={20}>
              Hidden products
            </Title>
            {reversedData.some((data) => !data.isActive) ? (
              <Grid>
                {reversedData.map((data) => {
                  if (!data.isActive) {
                    return (
                      <StyledGridCol xs={6} sm={4} md={3} lg={2.4}>
                        <MerchantProduct
                          id={data._id}
                          img={data.productImg[0]}
                          name={data.productName}
                          info={data.productInfo}
                          stock={data.productInventory}
                          price={data.productPrice}
                          onEdit={(selectedProductId) =>
                            handleEditProduct(selectedProductId)
                          }
                          isLoading={
                            updateProductMutation.isLoading ||
                            createProductMutation.isLoading
                          }
                        ></MerchantProduct>
                      </StyledGridCol>
                    );
                  } else {
                    return null;
                  }
                })}
              </Grid>
            ) : (
              <div>
                <br />
                No hidden products
              </div>
            )}
          </>
        )}
      </StyledContainer>
    </main>
  );
};

export default MerchantProducts;
