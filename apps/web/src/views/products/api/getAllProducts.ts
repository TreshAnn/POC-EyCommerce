import { useQuery } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Product } from '../types';

export const getAllProducts = (): Promise<Product[]> => {
  return axios.get('/api/products/get-all-product');
};

type QueryFnType = typeof getAllProducts;

type UseGetAllProductsOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAllProducts = ({ config }: UseGetAllProductsOption) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
    ...config,
  });
};
