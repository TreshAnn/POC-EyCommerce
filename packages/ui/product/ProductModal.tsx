import React, { useState, useEffect } from 'react';
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
  isLoading?: boolean;
  onClose: () => void;
  isAddingProduct: boolean;
  editProduct?: ProductData;
  id: string;
}

interface ProductData {
  productID: string;
  productImg: {
    ImgAttch: string;
    ImgURL: string;
  };
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
    productImg: {
      ImgAttch: 'base64encodedimage',
      ImgURL: '',
    },
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
    } else {
      setProductData(addProduct);
    }
  }, [id, editProduct]);

  const handleCheck = () => {
    open();
    onClose();
  };

  const handleSave = async () => {
    onSave(productData);
    onClose();
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      onConfirm(id);
      close();
    }
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
                value={productData.productID}
                onChange={(event) =>
                  setProductData({
                    ...productData,
                    productID: event.currentTarget.value,
                  })
                }
                withAsterisk
              />
            </>
          ) : (
            <>
              <TextInput
                label="Product ID"
                value={editProduct?.productID}
                onChange={(event) =>
                  setProductData({
                    ...productData,
                    productID: event.currentTarget.value,
                  })
                }
                disabled
              />
            </>
          )}
          <TextInput
            label="Product Image URL"
            value={productData.productImg.ImgURL}
            onChange={(event) =>
              setProductData({
                ...productData,
                productImg: {
                  ...productData.productImg,
                  ImgURL: event.currentTarget.value,
                },
              })
            }
          />
          {productData.productImg.ImgURL && (
            <Image src={productData.productImg.ImgURL} alt="Image" />
          )}
          <TextInput
            label="Product Name"
            value={productData.productName}
            onChange={(event) =>
              setProductData({
                ...productData,
                productName: event.currentTarget.value,
              })
            }
            withAsterisk
          />
          <TextInput
            label="Product Info"
            value={productData.productInfo}
            onChange={(event) =>
              setProductData({
                ...productData,
                productInfo: event.currentTarget.value,
              })
            }
            withAsterisk
          />
          <TextInput
            label="Product Price"
            type="number"
            value={productData.productPrice.toString()}
            onChange={(event) =>
              setProductData({
                ...productData,
                productPrice: parseFloat(event.currentTarget.value),
              })
            }
            withAsterisk
          />
          <TextInput
            label="Product Inventory"
            type="number"
            value={productData.productInventory.toString()}
            onChange={(event) =>
              setProductData({
                ...productData,
                productInventory: parseInt(event.currentTarget.value),
              })
            }
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
