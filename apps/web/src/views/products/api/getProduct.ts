import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Product } from '../types';

export const getProduct = (productID): Promise<Product[]> => {
  return axios.get(`/api/products/${productID}`);
};

type QueryFnType = typeof getProduct;

type UseGetProductOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetProduct = (
  { config }: UseGetProductOption,
  productID: string | undefined,
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['get-product'],
    queryFn: () => getProduct(productID),
    enabled: false,
    ...config,
  });
};
