import { useQuery } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { TuserData } from '../types';

export const getOneUserData = (): Promise<TuserData> => {
  return axios.get(`/api/user/`);
};

type QueryFnType = typeof getOneUserData;

type UseGetUserData = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetOneUser = ({ config }: UseGetUserData) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['user'],
    queryFn: () => getOneUserData(),
    ...config,
  });
};
