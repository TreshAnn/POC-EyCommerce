import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { queryClient, QueryConfig } from '../../../lib/react-query';
import { Cart, UpdateCart } from '../types';

// export type CreateProductDTO = Omit<Product, '__v' | '_id' | 'isActive'>;

export const createProduct = ({
  productID,
  quantity,
}: UpdateCart): Promise<UpdateCart> => {
  return axios.put('/api/cart', {
    productID,
    quantity,
  });
};

type QueryFnType = typeof createProduct;

type UseCreateProductOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useCreateProduct = ({ config }: UseCreateProductOption) => {
  return useMutation({
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries(['cart']);
      // eslint-disable-next-line no-console
      console.log(newProduct);
      const previousProducts = queryClient.getQueriesData<Cart[]>(['cart']);

      queryClient.setQueryData(
        ['cart'],
        [...(previousProducts || []), newProduct.data],
      );
      return { previousProducts };
    },
    onError: (_, __, context: any) => {
      // eslint-disable-next-line no-console
      console.log('theres an error');
      if (context?.previousProducts) {
        queryClient.setQueryData(['cart'], context.previousProducts);
      }
    },
    onSuccess: () => {
      // eslint-disable-next-line no-console
      console.log('success naman');
      queryClient.invalidateQueries(['cart']);
      notifications.show({
        message: 'Added to cart!',
      });
    },
    mutationFn: createProduct,
    ...config,
  });
};
