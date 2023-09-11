import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { QueryConfig } from '../../../lib/react-query';
import { Product } from '../types';

export type CreateProductDTO = Omit<
  Product,
  '__v' | '_id' | 'isActive' | 'merchantID'
>;

export const createProduct = ({
  productID,
  productImg,
  productInfo,
  productInventory,
  productName,
  productPrice,
  productCategory,
}: CreateProductDTO): Promise<Product> => {
  return axios.post('/api/products/create', {
    productID,
    productImg,
    productInfo,
    productInventory,
    productName,
    productPrice,
    productCategory,
  });
};

type QueryFnType = typeof createProduct;

type UseCreateProductOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useCreateProduct = ({ config }: UseCreateProductOption) => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ['merchant-products'] });

      const previousProducts = queryClient.getQueryData<Product[]>([
        'merchant-products',
      ]);
      if (previousProducts) {
        queryClient.setQueryData(
          ['merchant-products'],
          [...previousProducts, newProduct],
        );
      }
      return { previousProducts };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ['merchant-products'],
          context.previousProducts,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['merchant-products']);
      notifications.show({
        message: 'Added Product!',
      });
    },
    mutationFn: createProduct,
  });
};
