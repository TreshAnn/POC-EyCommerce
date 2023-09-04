export type TUserAddress = {
  street: string;
  city: string;
  region: string;
  zipcode: string;
  country: string;
};

export type TuserData = {
  _id: string;
  firstName: string;
  lastName: string;
  auth: TuserAuth;
  address: TUserAddress;
  phoneNumber: string;
};

export type TuserAuth = {
  _id: string;
  userType: string;
  username: string;
  email: string;
  password: string;
};

export type TuserPayload = {
  _id: string;
  firstName: string;
  lastName: string;
  address: TuserPayloadAddress;
  phoneNumber: string;
  userType: string;
  username: string;
  email: string;
  password: string;
};

export type TuserPayloadAddress = {
  street: string;
  city: string;
  region: string;
  zipcode: number;
  country: string;
};
