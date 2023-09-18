import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { QueryConfig } from '../../../lib/react-query';
import { Cart, OrderedItems } from '../types';

export type DeleteItemDTO = Pick<OrderedItems, 'productId'>;

export const deleteProduct = (productId): Promise<Cart> => {
  return axios.delete(`/api/cart/`, { data: { productId } });
};

type QueryFnType = typeof deleteProduct;

type UseDeleteItemOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useDeleteItem = ({ config }: UseDeleteItemOption) => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: async (deletedProductId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData<Cart>(['cart']);
      if (previousCart && Array.isArray(previousCart.orderedItems)) {
        const updatedOrderedItems = previousCart.orderedItems.filter(
          (cartItem) => cartItem.productId !== deletedProductId,
        );

        const updatedCart = {
          ...previousCart,
          orderedItems: updatedOrderedItems,
        };

        queryClient.setQueryData(['cart'], updatedCart);
        return { previousCart };
      }
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
  });
};
