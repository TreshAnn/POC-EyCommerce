import React, { useState, useEffect } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';

interface ProductModalProps {
  onSave: (data: ProductData) => void;
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
}

const ProductModal: React.FC<ProductModalProps> = ({
  id,
  onSave,
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
    productCategory: ['shoes'],
  };
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

  const handleSave = async () => {
    onSave(productData);
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose}>
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
        <TextInput
          label="Product Name"
          value={productData.productName}
          onChange={(event) =>
            setProductData({
              ...productData,
              productName: event.currentTarget.value,
            })
          }
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
        />
      </Modal.Body>
      <Button loading={isLoading} onClick={handleSave} loaderPosition="center">
        Save
      </Button>
    </Modal>
  );
};

export default ProductModal;
