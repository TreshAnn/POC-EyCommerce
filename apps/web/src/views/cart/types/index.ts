export interface Cart {
  _id: string;
  userID: string;
  orderedItems: OrderedItems[];
  totalAmount: number;
  __v: number;
}

export interface OrderedItems {
  productId: string;
  productImg: ProductImg;
  productName: string;
  productPrice: number;
  quantity: number;
  subTotalPrice: number;
}

export interface ProductImg {
  ImgURL: string;
  ImgAttch: string;
  _id: string;
}
