import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { queryClient, QueryConfig } from '../../../lib/react-query';
import { Cart, OrderedItems } from '../types';

export type DeleteItemDTO = Pick<OrderedItems, 'productID'>;

export const deleteProduct = (productID): Promise<Cart> => {
  return axios.delete(`/api/cart/`, { data: { productID } });
};

type QueryFnType = typeof deleteProduct;

type UseDeleteItemOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useDeleteItem = ({ config }: UseDeleteItemOption) => {
  return useMutation({
    onMutate: async (deletedProductId) => {
      await queryClient.cancelQueries(['cart']);

      const previousCart = queryClient.getQueriesData<Cart>(['cart']);

      queryClient.setQueryData(
        ['cart'],
        (oldCartItem: OrderedItems[] | undefined) => {
          if (oldCartItem) {
            return oldCartItem.filter(
              (cartItem) => cartItem.productID !== deletedProductId,
            );
          }
          return [];
        },
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
        message: 'Item Deleted',
      });
    },
    mutationFn: deleteProduct,
    ...config,
  });
};
