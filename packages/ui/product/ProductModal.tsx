import React, { useState } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';

interface ProductModalProps {
  onSave: (data: ProductData) => void;
  isOpen: boolean; // Controlled visibility
  onClose: () => void; // Controlled close
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
  onSave,
  isOpen,
  onClose,
}) => {
  const [productData, setProductData] = useState<ProductData>({
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
  });

  const handleSave = () => {
    onSave(productData);
    onClose(); // Close the modal
  };

  return (
    <Modal opened={isOpen} onClose={onClose}>
      <Modal.Title>Product Details</Modal.Title>
      <Modal.Body>
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

      <Button onClick={handleSave}>Save</Button>
    </Modal>
  );
};

export default ProductModal;
