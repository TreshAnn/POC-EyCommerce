import { useQuery } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { TuserData } from '../types';

export const getOneUserData = (props: TuserData['_id']): Promise<TuserData> => {
  return axios.get(`/api/user/${props}`);
};

type QueryFnType = typeof getOneUserData;

type UseGetUserData = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetOneUser = (
  { config }: UseGetUserData,
  userID: TuserData['_id'],
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['users'],
    queryFn: () => getOneUserData(userID),
    ...config,
  });
};
