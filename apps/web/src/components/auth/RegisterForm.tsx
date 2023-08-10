import {
  Anchor,
  Button,
  Checkbox,
  Group,
  MantineProvider,
  Paper,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useState } from 'react';
import { Form } from 'ui';
import * as z from 'zod';

import { StyledContainer } from './styles';
import { useRegister } from '../../lib/auth';

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  region: z.string(),
  zipcode: z.string(),
  country: z.string(),
});

const schema = z
  .object({
    userType: z.string(),
    username: z.string().regex(/^[a-zA-Z0-9_]*$/, {
      message:
        'Username must contain only alphanumeric characters and no spaces.',
    }),
    firstName: z
      .string()
      .min(2, { message: 'First Name must be at least 2 characters long.' }),
    lastName: z
      .string()
      .min(2, { message: 'Last Name must be at least 2 characters long.' }),
    email: z.string().email({
      message:
        'Invalid email format. Please provide a valid email address (example@example.com).',
    }),
    address: addressSchema,
    phoneNumber: z
      .string()
      .max(13, { message: 'Phone Number exceeds 10' })
      .includes('+63', {
        message: 'Include Country Code (ex. +639123456789)',
      }),
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Password must be at least 8 characters long and include at least one letter, one digit, and one special character.',
      }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Password doesnt match',
    path: ['confirm'],
  });

type TRegisterAddress = {
  street: string;
  city: string;
  region: string;
  zipcode: string;
  country: string;
};

type TRegisterValues = {
  userType: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: TRegisterAddress;
  phoneNumber: string;
  password: string;
  confirm: string;
};

type IRegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: IRegisterFormProps) => {
  const register = useRegister();
  const [data] = useState([
    { value: 'consumer', label: 'Consumer' },
    { value: 'merchant', label: 'Merchant' },
  ]);

  const handleOnSubmit = (values) => {
    values.address.zipcode = parseInt(values.address.zipcode, 10);
    register.mutate(values, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <StyledContainer>
      <Paper radius="md" p="xl" withBorder>
        <Form<TRegisterValues, typeof schema>
          onSubmit={(values) => handleOnSubmit(values)}
          schema={schema}
        >
          {({ formState, register, setValue }) => (
            <>
              <Stack>
                <Title order={1}>Register</Title>
                <Select
                  label="User Type"
                  data={data}
                  placeholder="Select User Type"
                  required
                  onChange={(selectedValue: string) => {
                    setValue('userType', selectedValue);
                  }}
                  error={formState.errors['userType']?.message}
                />
                <TextInput
                  label="User Name"
                  placeholder="Enter your User Name..."
                  required
                  error={formState.errors['username']?.message}
                  {...register('username')}
                />
                <Group grow>
                  <TextInput
                    label="First Name"
                    placeholder="Enter your First Name"
                    required
                    error={formState.errors['firstName']?.message}
                    {...register('firstName')}
                  />
                  <TextInput
                    label="Last Name"
                    placeholder="Enter your Last Name"
                    required
                    error={formState.errors['lastName']?.message}
                    {...register('lastName')}
                  />
                </Group>
                <TextInput
                  label="Email"
                  placeholder="Enter your Email"
                  required
                  error={formState.errors['email']?.message}
                  {...register('email')}
                />
                <TextInput
                  label="Phone Number"
                  placeholder="Enter your Number"
                  required
                  error={formState.errors['phoneNumber']?.message}
                  {...register('phoneNumber')}
                />
                <TextInput
                  label="Address"
                  placeholder="House No. / Street / Barangay / City / Province"
                  required
                  error={formState.errors['address.street']?.message}
                  {...register('address.street')}
                />
                <Group grow>
                  <TextInput
                    label="City"
                    placeholder="Enter your City"
                    required
                    error={formState.errors['address.city']?.message}
                    {...register('address.city')}
                  />
                  <TextInput
                    label="Region"
                    placeholder="Enter your Region"
                    required
                    error={formState.errors['address.region']?.message}
                    {...register('address.region')}
                  />
                </Group>
                <Group grow>
                  <TextInput
                    label="Zip Code"
                    placeholder="Enter your Zip Code"
                    required
                    error={formState.errors['address.zipcode']?.message}
                    {...register('address.zipcode')}
                  />
                  <TextInput
                    label="Country"
                    placeholder="Enter your Country"
                    required
                    error={formState.errors['address.country']?.message}
                    {...register('address.country')}
                  />
                </Group>
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  required
                  error={formState.errors['password']?.message}
                  {...register('password')}
                />
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  required
                  error={formState.errors['confirm']?.message}
                  {...register('confirm')}
                />
                <Checkbox
                  label={
                    <>
                      I agree to the{' '}
                      <Anchor href="https://mantine.dev" target="_blank">
                        Terms and Conditions
                      </Anchor>
                    </>
                  }
                />
                <Button
                  variant="filled"
                  type="submit"
                  style={{ backgroundColor: '#FFD500', color: '#333333' }}
                >
                  Register
                </Button>
                <Text>
                  Already have an account? <Anchor href="#">Login</Anchor>
                </Text>
              </Stack>
            </>
          )}
        </Form>
      </Paper>
    </StyledContainer>
  );
};
