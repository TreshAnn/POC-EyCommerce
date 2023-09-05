import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { queryClient, QueryConfig } from '../../../lib/react-query';
import { Product } from '../types';

export type UpdateProductDTO = Omit<
  Product,
  '__v' | '_id' | 'isActive' | 'merchantID' | 'productID'
>;

export const updateProduct = (
  {
    productImg,
    productInfo,
    productInventory,
    productName,
    productPrice,
    productCategory,
  }: UpdateProductDTO,
  id: string,
): Promise<Product> => {
  return axios.put(`/api/products/update/${id}`, {
    productImg,
    productInfo,
    productInventory,
    productName,
    productPrice,
    productCategory,
  });
};

type QueryFnType = typeof updateProduct;

type UseUpdateProductOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useUpdateProduct = (
  { config }: UseUpdateProductOption,
  id: string,
) => {
  return useMutation({
    onMutate: async (product) => {
      await queryClient.cancelQueries(['update-product']);

      const previousProducts = queryClient.getQueriesData<Product[]>([
        'update-product',
      ]);

      queryClient.setQueryData(
        ['update-product'],
        [...(previousProducts || []), product.data],
      );
      return { previousProducts };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['update-product'], context.previousProducts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['update-product']);
      notifications.show({
        message: 'Product updated',
      });
    },
    mutationFn: (newProductData: UpdateProductDTO) =>
      updateProduct(newProductData, id),
    ...config,
  });
};
