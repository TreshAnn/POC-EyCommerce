import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Product } from '../types';

export const getMerchantProducts = (): Promise<Product[]> => {
  return axios.get('/api/products/get-merchant-products');
};

type QueryFnType = typeof getMerchantProducts;

type UseGetMerchantProductsOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetMerchantProducts = ({
  config,
}: UseGetMerchantProductsOption) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['merchant-products'],
    queryFn: () => getMerchantProducts(),
    ...config,
  });
};
