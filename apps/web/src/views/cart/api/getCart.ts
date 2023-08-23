import { useQuery } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { Cart } from '../types';

export const getCart = (): Promise<Cart> => {
  return axios.get('/api/cart');
};

type QueryFnType = typeof getCart;

type UseGetCartOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetCart = ({ config }: UseGetCartOption) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['cart'],
    queryFn: () => getCart(),
    ...config,
  });
};
