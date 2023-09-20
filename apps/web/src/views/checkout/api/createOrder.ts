import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { Order } from '../types';

export type CreateOrderDTO = Order;

export const createOrder = ({
  productId,
  shippingFee,
  status,
  paymentMethod,
}: CreateOrderDTO) => {
  // eslint-disable-next-line no-console
  console.log(productId, shippingFee, status, paymentMethod);
  return axios.post('/api/order/checkout', {
    productId,
    shippingFee,
    status,
    paymentMethod,
  });
};

export const useCreateOrder = () => {
  //const queryClient = useQueryClient();
  return useMutation({
    onError: () => {
      null;
    },
    onSuccess: () => {
      notifications.show({
        message: 'Order placed!',
      });
    },
    mutationFn: createOrder,
  });
};
