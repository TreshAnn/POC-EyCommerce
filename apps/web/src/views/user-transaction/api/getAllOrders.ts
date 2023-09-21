import { useQuery } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { IOrder } from '../types';

export const getAllOrders = (): Promise<IOrder[]> => {
  return axios.get('/api/order/get-all');
};

type QueryFnType = typeof getAllOrders;

type UseGetAllOrdersOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAllOrders = ({ config }: UseGetAllOrdersOption) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['all-orders'],
    queryFn: () => getAllOrders(),
    ...config,
  });
};
