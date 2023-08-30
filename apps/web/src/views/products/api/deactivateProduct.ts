import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Merchant } from '../types';

export const deactivateProduct = (id): Promise<Merchant[]> => {
  return axios.put(`/api/products/deactivateProduct/${id}`);
};

type QueryFnType = typeof deactivateProduct;

type DeacProductOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useDeactivateProduct = (
  { config }: DeacProductOption,
  id: string | undefined,
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['deac-product'],
    queryFn: () => deactivateProduct(id),
    ...config,
    enabled: false,
  });
};
