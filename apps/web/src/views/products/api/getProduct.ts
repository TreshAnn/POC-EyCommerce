import { useQuery } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Product } from '../types';

export const getProductById = (productID: string): Promise<Product> => {
  return axios.get(`/api/products/${productID}`);
};

type QueryFnType = typeof getProductById;

type UseGetProductByIdOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetProductById = (
  productID: string,
  { config }: UseGetProductByIdOption,
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['product', productID],
    queryFn: () => getProductById(productID),
    ...config,
  });
};
