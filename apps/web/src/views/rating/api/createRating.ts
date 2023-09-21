import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { QueryConfig } from '../../../lib/react-query';
import { Rating } from '../types';

export type CreateRatingDTO = Pick<Rating, 'rating'>;

export const createRating = ({ rating }: CreateRatingDTO): Promise<Rating> => {
  return axios.post('/api/rating/', {
    rating,
  });
};

type QueryFnType = typeof createRating;

type UseCreateRatingOption = {
  config?: QueryConfig<QueryFnType>;
};

export const useCreateRating = ({ config }: UseCreateRatingOption) => {
  //   const queryClient = useQueryClient();
  return useMutation({
    onError: () => {
      null;
    },
    onSuccess: () => {
      notifications.show({
        message: 'Rating created!',
      });
    },
    mutationFn: createRating,
  });
};
