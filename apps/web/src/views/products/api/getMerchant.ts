import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Merchant } from '../types';

export const getMerchant = (merchantID): Promise<Merchant[]> => {
  return axios.get(`/api/merchant/${merchantID}`);
};

type QueryFnType = typeof getMerchant;

type UseGetAllProductsOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetMerchant = (
  { config }: UseGetAllProductsOption,
  merchantID: string | undefined,
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['merchant'],
    queryFn: () => getMerchant(merchantID),
    ...config,
  });
};

// const { data, isLoading, isError } = useQuery<any>( //TO DO - resolve promise
//   ['merchant', merchantID],
//   () => axios.get(`/api/merchant/${merchantID}`),
// );
// console.log(data);
