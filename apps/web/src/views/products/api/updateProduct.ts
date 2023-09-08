import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { QueryConfig } from '../../../lib/react-query';
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
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ['merchant-products'] });

      const previousProducts =
        queryClient.getQueryData<Product[]>(['merchant-products']) || [];

      const productIndex = previousProducts.findIndex(
        (product) => product._id === id,
      );

      if (productIndex !== -1) {
        const updatedProducts = [...previousProducts];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          ...newProduct,
        };

        queryClient.setQueryData(['merchant-products'], updatedProducts);

        return { previousProducts };
      }
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
        message: 'Product updated',
      });
    },
    mutationFn: (newProductData: UpdateProductDTO) =>
      updateProduct(newProductData, id),
  });
};
