import { axios } from '../../../lib/axios';
import { QueryConfig, queryClient } from '../../../lib/react-query';
import { TuserPayload } from '../types';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

export const updateUserAPI = (data: TuserPayload) => {
  return axios.put(`/api/user/update/${data._id}`, data);
};

export type UpdateUserDTO = Omit<TuserPayload, '__v' | 'isActive'>;

type QueryFnType = typeof updateUserAPI;

type UseUpdateUserOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useUpdateUser = ({ config }: UseUpdateUserOption, id: string) => {
  return useMutation({
    onMutate: async (user) => {
      await queryClient.cancelQueries(['update-user']);

      const previousUserData = queryClient.getQueriesData<TuserPayload[]>([
        'update-user',
      ]);

      queryClient.setQueryData(
        ['update-user'],
        [...(previousUserData || []), user.data],
      );
      return { previousUserData };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUserData) {
        queryClient.setQueryData(['update-user'], context.previousUserData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['update-user']);
      notifications.show({
        message: 'User Profile updated',
      });
    },
    mutationFn: (newUserData: UpdateUserDTO) => updateUserAPI(newUserData),
    ...config,
  });
};
