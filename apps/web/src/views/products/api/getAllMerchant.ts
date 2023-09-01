import { useQuery } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Merchant } from '../types';

export const getAllMerchants = (): Promise<Merchant[]> => {
  return axios.get('/api/merchant/get-all-merchant');
};

type QueryFnType = typeof getAllMerchants;

type UseGetAllProductsOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAll = ({ config }: UseGetAllProductsOption) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['merchants'],
    queryFn: () => getAllMerchants(),
    ...config,
  });
};
