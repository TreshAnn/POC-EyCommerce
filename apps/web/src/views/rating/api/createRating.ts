import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axios } from '../../../lib/axios';
import { QueryConfig } from '../../../lib/react-query';
import { Rating } from '../types';

export type CreateRatingDTO = { newRating: Rating; orderId: string };

export const createRating = ({
  newRating,
  orderId,
}: CreateRatingDTO): Promise<Rating> => {
  const { productId, rating, title, description } = newRating;

  return axios.post(`/api/rating/${orderId}`, {
    productId,
    rating,
    title,
    description,
  });
};

export const useCreateRating = () => {
  return useMutation({
    onError: () => {
      notifications.show({
        message: 'Error creating rating',
        color: 'red',
      });
    },
    onSuccess: () => {
      notifications.show({
        message: 'Rating created!',
      });
    },
    mutationFn: createRating,
  });
};
