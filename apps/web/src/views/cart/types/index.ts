export interface Cart {
  _id: string;
  userID: string;
  orderedItems: OrderedItems[];
  totalAmount: number;
  __v: number;
}

export interface OrderedItems {
  productID: string;
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

export interface UpdateCart {
  productID: string;
  quantity: number;
}
