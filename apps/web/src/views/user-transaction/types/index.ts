export interface IOrder {
  _id: string;
  length: number;
  map(arg0: unknown): unknown;
  userId: string;
  firstName: string;
  lastName: string;
  status: string;
  address: Address;
  paymentMethod: string;
  timestamp: Timestamp;
  orderedItems: OrderedItem[];
  shippingFee: number;
  totalAmount: number;
  phoneNumber: string;
  merchantName: string;
  merchantId: string;
}

export interface Address {
  address: string;
  street: string;
  city: string;
  region: string;
  zipcode: string;
  country: string;
}

export interface Timestamp {
  orderedAt: string;
  processedAt: string;
  shippedAt: string;
  deliveredAt: string;
  cancelledAt: string;
}

export interface OrderedItem {
  productId: string;
  productName: string;
  productImg: string;
  price: number;
  quantity: number;
  subtotal: number;
}
