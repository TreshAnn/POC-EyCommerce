import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { queryClient, QueryConfig } from '../../../lib/react-query';
import { Cart, OrderedItems } from '../types';

export type AddToCartDTO = Pick<OrderedItems, 'productID' | 'quantity'>;

export const addToCart = ({
  productID,
  quantity,
}: AddToCartDTO): Promise<Cart> => {
  return axios.post(`/api/cart`, {
    productID,
    quantity,
  });
};

type QueryFnType = typeof addToCart;

type UseAddToCartOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useAddToCart = ({ config }: UseAddToCartOption) => {
  return useMutation({
    onMutate: async (addProductToCart) => {
      await queryClient.cancelQueries(['cart']);

      const previousCart = queryClient.getQueriesData<Cart>(['cart']);

      queryClient.setQueryData(
        ['cart'],
        [...(previousCart || []), addProductToCart.data],
      );
      return { previousCart };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      notifications.show({
        message: 'Added to Cart!',
      });
    },
    mutationFn: addToCart,
    ...config,
  });
};
