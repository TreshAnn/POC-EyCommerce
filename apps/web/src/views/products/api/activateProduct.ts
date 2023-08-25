import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Merchant } from '../types';

export const activateProduct = (id): Promise<Merchant[]> => {
  return axios.put(`/api/products/activateProduct/${id}`);
};

type QueryFnType = typeof activateProduct;

type ActivateProductOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useActivateProduct = (
  { config }: ActivateProductOption,
  id: string | undefined,
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['activate-product'],
    queryFn: () => activateProduct(id),
    ...config,
    enabled: false,
  });
};
