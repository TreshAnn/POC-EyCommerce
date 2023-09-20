import { OrderedItems } from '../../../web/src/views/cart/types';

export function calculateSubTotal(
  quantity: number,
  productPrice: number,
): number {
  return quantity * productPrice;
}

export function calculateTotal(orderedItems: OrderedItems[]): number {
  return orderedItems.reduce((total, item) => total + item.subTotalPrice, 0);
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function calculateTotalItems(cartItems: OrderedItems[]): number {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
