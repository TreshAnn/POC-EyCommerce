import { axios } from '../../../lib/axios';

export type TAddress = {
  street: string;
  city: string;
  region: string;
  zipcode: string;
  country: string;
};

export type TRegisterData = {
  userType: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: TAddress;
  phoneNumber: string;
};

export type TMerchantRegisterData = {
  userType: string;
  username: string;
  merchantName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: TAddress;
  phoneNumber: string;
};

export type TMerchantAddress = {
  street: string;
  city: string;
  region: string;
  zipcode: string;
  country: string;
};

export const createUserApi = (data: TRegisterData) => {
  return axios.post('/api/user/create', data);
};

export const createMerchantApi = (data: TMerchantRegisterData) => {
  return axios.post('/api/merchant/create', data);
};
