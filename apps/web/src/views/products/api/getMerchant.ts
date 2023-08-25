import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Merchant } from '../types';

export const getMerchant = (merchantID): Promise<Merchant[]> => {
  return axios.get(`/api/merchant/${merchantID}`);
};

type QueryFnType = typeof getMerchant;

type UseGetMerchantOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetMerchant = (
  { config }: UseGetMerchantOption,
  merchantID: string | undefined,
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['merchant'],
    queryFn: () => getMerchant(merchantID),
    ...config,
  });
};
