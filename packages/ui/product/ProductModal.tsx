import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Button,
  Modal,
  TextInput,
  Image,
  Checkbox,
  Group,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface ProductModalProps {
  onSave: (data: ProductData) => void;
  onConfirm?: (id: string) => void;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  isAddingProduct: boolean;
  editProduct?: ProductData;
  id: string;
}

interface ProductData {
  productID: string;
  productImg: string[];
  productName: string;
  productInfo: string;
  productPrice: number;
  productInventory: number;
  productCategory: string[];
  isActive: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  id,
  onSave,
  onConfirm,
  isOpen,
  isLoading,
  onClose,
  isAddingProduct,
  editProduct,
}) => {
  const addProduct = {
    productID: '',
    productImg: [''],
    productName: '',
    productInfo: '',
    productPrice: 0,
    productInventory: 0,
    productCategory: ['sample1'],
    isActive: true,
  };

  const [opened, { open, close }] = useDisclosure(false);
  const [productData, setProductData] = useState<ProductData>(
    editProduct || addProduct,
  );

  useEffect(() => {
    if (editProduct) {
      setProductData(editProduct);
    } else if (isAddingProduct) {
      setProductData(addProduct);
    }
  }, [isAddingProduct, editProduct]);

  const handleCheck = () => {
    open();
    onClose();
  };

  const handleSave = async () => {
    onSave(productData);
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      onConfirm(id);
      close();
    }
  };

  const handleDataChange = (
    property: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.currentTarget.value;
    if (property === 'productPrice') {
      const parsedValue = parseFloat(newValue);
      setProductData({
        ...productData,
        [property]: parsedValue,
      });
    } else if (property === 'productInventory') {
      const parsedValue = parseInt(newValue);
      setProductData({
        ...productData,
        [property]: parsedValue,
      });
    } else if (property === 'productImg') {
      const newProductImg = [...productData.productImg];
      newProductImg[0] = newValue;
      setProductData({
        ...productData,
        productImg: newProductImg,
      });
    } else {
      setProductData({
        ...productData,
        [property]: newValue,
      });
    }
  };
  const handleBlur = (
    property: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.currentTarget.value.trim();
    setProductData({
      ...productData,
      [property]: newValue,
    });
  };

  return (
    <>
      <Modal size="xs" opened={opened} onClose={close} centered>
        <Title order={4} align="center">
          Do you want to{productData.isActive ? ' hide ' : ' show '}this
          product?
        </Title>
        <Group position="center">
          <Button onClick={handleConfirm}>Yes</Button>
          <Button onClick={close}>No</Button>
        </Group>
      </Modal>
      <Modal
        opened={isOpen}
        onClose={onClose}
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Modal.Title>
          {isAddingProduct ? 'New Product' : 'Edit Product'}
        </Modal.Title>
        <Modal.Body>
          {isAddingProduct ? (
            <>
              <TextInput
                label="Product ID"
                placeholder="product00000"
                value={productData.productID}
                onChange={(event) => handleDataChange('productID', event)}
                onBlur={(event) => handleBlur('productID', event)}
                withAsterisk
              />
            </>
          ) : (
            <>
              <TextInput
                label="Product ID"
                placeholder="product00000"
                value={editProduct?.productID}
                onChange={(event) => handleDataChange('productID', event)}
                disabled
              />
            </>
          )}
          <TextInput
            label="Product Image URL"
            placeholder="Insert image URL"
            value={productData.productImg[0]}
            onChange={(event) => handleDataChange('productImg', event)}
          />
          {productData.productImg && (
            <Image
              src={
                productData.productImg[0]
                  ? productData.productImg[0]
                  : 'https://placehold.co/540x540.png'
              }
              alt="Product Image"
            />
          )}
          <TextInput
            label="Product Name"
            placeholder="Store Item"
            value={productData.productName}
            onChange={(event) => handleDataChange('productName', event)}
            onBlur={(event) => handleBlur('productName', event)}
            withAsterisk
          />
          <TextInput
            label="Product Info"
            placeholder="Enter item information"
            value={productData.productInfo}
            onChange={(event) => handleDataChange('productInfo', event)}
            onBlur={(event) => handleBlur('productInfo', event)}
            withAsterisk
          />
          <TextInput
            label="Product Price"
            type="number"
            value={productData.productPrice.toString()}
            onChange={(event) => handleDataChange('productPrice', event)}
            withAsterisk
          />
          <TextInput
            label="Product Inventory"
            type="number"
            value={productData.productInventory.toString()}
            onChange={(event) => handleDataChange('productInventory', event)}
            withAsterisk
          />
          {!isAddingProduct ? (
            <Checkbox
              pt={20}
              label="Display product"
              defaultChecked={productData.isActive}
              onClick={handleCheck}
            />
          ) : null}
        </Modal.Body>

        <Button
          loading={isLoading}
          onClick={handleSave}
          loaderPosition="center"
        >
          Save
        </Button>
      </Modal>
    </>
  );
};

export default ProductModal;
