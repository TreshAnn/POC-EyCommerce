export interface Product {
  _id: string;
  productID: string;
  productImg: string[];
  productName: string;
  productInfo: string;
  productPrice: number;
  productInventory: number;
  productCategory: string[];
  merchantID: string;
  isActive: boolean;
}

export interface Merchant {
  _id: string;
  merchantName: string;
  auth: { _id: string };
  firstName: string;
  lastName: string;
  address: object;
  phoneNumber: number;
}
