import { notifications } from '@mantine/notifications';
import Axios, { AxiosRequestConfig } from 'axios';

import storage from '../utils/storage';

async function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.headers!.authorization = `${token}`;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  config.headers!.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    notifications.show({
      id: 'login-id',
      withCloseButton: true,
      autoClose: 3000,
      message: message,
      color: 'yellow',
    });
    return Promise.reject(error);
  },
);
