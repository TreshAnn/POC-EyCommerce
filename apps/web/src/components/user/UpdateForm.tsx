import React, { useEffect, ChangeEvent, useState } from 'react';
import {
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Flex,
  TextInput,
  Title,
  Divider,
} from '@mantine/core';
import { StyledContainer } from '../auth/styles';
import { useUpdateUser } from '../../views/user/api/updateUser';
import { useGetOneUser } from '../../views/user/api/getUser';
import { useParams } from 'react-router-dom';

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
  address: TUserAddress;
  phoneNumber: string;
  auth: TauthData;
};

export type TauthData = {
  _id: string;
  email: string;
  userType: string;
  username: string;
  password: string;
};

type IUserUpdateFormProps = {
  onSuccess: () => void;
};

export const UpdateForm = ({ onSuccess }: IUserUpdateFormProps) => {
  const { id } = useParams<{ id?: string }>();
  const { data, isLoading } = useGetOneUser({}, id || '');
  const updateUser = useUpdateUser({}, id || '');
  const resUserData = {
    _id: data?._id || '',
    auth: {
      _id: data?.auth._id || '',
      username: data?.auth.username || '',
      userType: data?.auth.userType || '',
      email: data?.auth.email || '',
      password: data?.auth.password || '',
    },
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    address: {
      street: data?.address.street || '',
      city: data?.address.city || '',
      region: data?.address.region || '',
      zipcode: data?.address.zipcode || '',
      country: data?.address.country || '',
    },
    phoneNumber: data?.phoneNumber || '',
  };
  const [userData, setUserData] = useState<TuserData>(resUserData);

  const handleOnSubmit = () => {
    const formatPayload = {
      _id: userData._id,
      userType: userData.auth.userType,
      username: userData.auth.username,
      email: userData.auth.email,
      password: userData.auth.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: {
        street: userData.address.street,
        city: userData.address.city,
        country: userData.address.country,
        region: userData.address.region,
        zipcode: parseInt(userData.address.zipcode),
      },
      phoneNumber: userData.phoneNumber,
    };
    // eslint-disable-next-line no-console
    console.log('Payload: ', formatPayload);
    updateUser.mutate(formatPayload);
  };

  const handleOnChange = (
    property: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.currentTarget.value.trim();

    // Split the property string into segments
    const segments = property.split('.');

    // Update the nested property using functional updates
    setUserData((prevUserData) => {
      const updatedUserData: TuserData = { ...prevUserData };
      let currentLevel: any = updatedUserData;

      for (const segment of segments) {
        if (currentLevel && typeof currentLevel === 'object') {
          if (segment in currentLevel) {
            if (segments[segments.length - 1] === segment) {
              currentLevel[segment] = newValue;
            } else {
              currentLevel = currentLevel[segment];
            }
          } else {
            // eslint-disable-next-line no-console
            console.warn(`Segment '${segment}' not found in data structure.`);
            break;
          }
        } else {
          // eslint-disable-next-line no-console
          console.warn('Invalid segment path in data structure.');
          break;
        }
      }

      return updatedUserData;
    });
  };

  useEffect(() => {
    // Get User Information via token
    if (!isLoading && data) {
      setUserData(resUserData);
    }
  }, [isLoading, data]);

  return (
    <>
      <StyledContainer>
        <Paper shadow="xl" p="md">
          <Stack spacing={10}>
            <Stack spacing={0} style={{ padding: '20px 20px' }}>
              <Title>My Profile</Title>
              <Text>
                Empowering You: Mastering Account Security and Protection
              </Text>
            </Stack>
            <Divider />
            <Flex
              gap="sm"
              justify="center"
              align="stretch"
              direction="column"
              style={{ padding: '0px 40px' }}
            >
              <TextInput
                label="User Name"
                placeholder="Enter your User Name..."
                required
                value={userData?.auth.username}
                onChange={(event) => handleOnChange('auth.username', event)}
              />
              <Group grow>
                <TextInput
                  label="First Name"
                  placeholder="Enter your First Name"
                  required
                  value={userData?.firstName}
                  onChange={(event) => handleOnChange('firstName', event)}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Enter your Last Name"
                  required
                  value={userData?.lastName}
                  onChange={(event) => handleOnChange('lastName', event)}
                />
              </Group>
              <TextInput
                label="Phone Number"
                placeholder="Enter your Number"
                required
                value={userData?.phoneNumber}
                onChange={(event) => handleOnChange('phoneNumber', event)}
              />
              <TextInput
                label="Address"
                placeholder="House No. / Street / Barangay "
                required
                value={userData?.address.street}
                onChange={(event) => handleOnChange('address.street', event)}
              />
              <TextInput
                label="City"
                placeholder="Enter your City"
                required
                value={userData?.address.city}
                onChange={(event) => handleOnChange('address.city', event)}
              />
              <Group grow>
                <TextInput
                  label="Region"
                  placeholder="Enter your Region"
                  required
                  value={userData?.address.region}
                  onChange={(event) => handleOnChange('address.region', event)}
                />
                <TextInput
                  label="Zip Code"
                  placeholder="Enter your Zip Code"
                  required
                  type="number"
                  value={userData?.address.zipcode}
                  onChange={(event) => handleOnChange('address.zipcode', event)}
                />
                <TextInput
                  label="Country"
                  placeholder="Enter your Country"
                  required
                  value={userData?.address.country}
                  onChange={(event) => handleOnChange('address.country', event)}
                />
              </Group>
              <Group position="right">
                <Button
                  onClick={handleOnSubmit}
                  color="yellow"
                  variant="filled"
                  type="submit"
                  style={{ width: '100px' }}
                >
                  Save
                </Button>
              </Group>
            </Flex>
          </Stack>
        </Paper>
      </StyledContainer>
    </>
  );
};
