export interface Product {
  _id: string;
  productID: string;
  productImg: ProductImg;
  productName: string;
  productInfo: string;
  productPrice: number;
  productInventory: number;
  productCategory: string[];
  merchantID: string;
  isActive: boolean;
}

export interface ProductImg {
  _id?: string;
  ImgURL: string;
  ImgAttch: string;
}
