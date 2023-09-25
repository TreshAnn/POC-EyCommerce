import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { QueryConfig } from '../../../lib/react-query';
import { Rating } from '../types';

export type CreateRatingDTO = Rating;

export const createRating = ({
  productId,
  rating,
  title,
  description,
}: CreateRatingDTO): Promise<Rating> => {
  return axios.post('/api/rating/', {
    productId,
    rating,
    title,
    description,
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
