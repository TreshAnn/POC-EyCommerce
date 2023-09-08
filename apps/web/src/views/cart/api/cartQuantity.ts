import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { queryClient, QueryConfig } from '../../../lib/react-query';
import { Cart, UpdateCart } from '../types';

// export type CreateProductDTO = Omit<Product, '__v' | '_id' | 'isActive'>;

export const createProduct = ({
  productId,
  quantity,
}: UpdateCart): Promise<UpdateCart> => {
  return axios.put('/api/cart', {
    productId,
    quantity,
  });
};

type QueryFnType = typeof createProduct;

type UseCreateProductOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useCartQuantity = ({ config }: UseCreateProductOption) => {
  return useMutation({
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries(['cart']);
      const previousProducts = queryClient.getQueriesData<Cart[]>(['cart']);

      queryClient.setQueryData(
        ['cart'],
        [...(previousProducts || []), newProduct.data],
      );
      return { previousProducts };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['cart'], context.previousProducts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      notifications.show({
        message: 'Cart updated',
      });
    },
    mutationFn: createProduct,
    ...config,
  });
};
