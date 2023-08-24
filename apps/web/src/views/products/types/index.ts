export interface Product {
  _id: string;
  productID: string;
  productImg: string[];
  productName: string;
  productInfo: string;
  productPrice: number;
  productInventory: number;
  productCategory: string[];
  isActive: boolean;
}

// export interface ProductImg {
//   _id?: string;
//   ImgURL: string;
// }
