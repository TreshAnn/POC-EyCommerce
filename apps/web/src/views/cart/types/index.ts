export interface Cart {
  reduce(arg0: (acc: any, item: any) => any, arg1: number): unknown;
  filter(arg0: (cartItem: any) => boolean): unknown;
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

export interface UpdateCart {
  productID: string;
  quantity: number;
}
