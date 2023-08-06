import { axios } from '../../../lib/axios';
import { TLoginResponse } from '../types';

export type TLoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithUsernameAndPassword = (
  data: TLoginCredentialsDTO,
): Promise<TLoginResponse> => {
  return axios.post('/api/auth/login', data);
};
