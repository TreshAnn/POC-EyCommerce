import { configureAuth } from 'react-query-auth';

import storage from '../utils/storage';
import {
  createUserApi,
  loginWithUsernameAndPassword,
  TLoginCredentialsDTO,
  TLoginResponse,
  TRegisterData,
} from '../views/auth';

async function handleUserResponse(data: TLoginResponse) {
  const { access_token } = data;
  storage.setToken(access_token);
  return;
}

async function loginFn(data: TLoginCredentialsDTO) {
  const response = await loginWithUsernameAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: TRegisterData) {
  await createUserApi(data);
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    loginFn: loginFn,
    logoutFn: logoutFn,
    userFn: function () {
      throw new Error('Function not implemented.');
    },
    registerFn: registerFn,
  });
