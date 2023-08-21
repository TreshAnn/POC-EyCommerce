import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { queryClient, QueryConfig } from '../../../lib/react-query';
import { Product } from '../types';

export type CreateProductDTO = Omit<Product, '__v' | '_id' | 'isActive'>;

export const createProduct = ({
  productCategory,
  productID,
  productImg,
  productInfo,
  productInventory,
  productName,
  productPrice,
}: CreateProductDTO): Promise<Product> => {
  return axios.post('/api/products/create', {
    productCategory,
    productID,
    productImg,
    productInfo,
    productInventory,
    productName,
    productPrice,
  });
};

type QueryFnType = typeof createProduct;

type UseCreateProductOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useCreateProduct = ({ config }: UseCreateProductOption) => {
  return useMutation({
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries(['products']);

      const previousProducts = queryClient.getQueriesData<Product[]>([
        'products',
      ]);

      queryClient.setQueryData(
        ['products'],
        [...(previousProducts || []), newProduct.data],
      );
      return { previousProducts };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      notifications.show({
        message: 'Added Product!',
      });
    },
    mutationFn: createProduct,
    ...config,
  });
};
