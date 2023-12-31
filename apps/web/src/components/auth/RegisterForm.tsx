import {
  Anchor,
  Alert,
  Button,
  Checkbox,
  Group,
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

import { useRegister } from '../../lib/auth';
import { StyledContainer } from './styles';

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  region: z.string(),
  zipcode: z.string(),
  country: z.string(),
});

const countryCodes = [
  { value: '+63', label: '+63 (Philippines)' },
  { value: '+1', label: '+1 (United States)' },
  { value: '+44', label: '+44 (United Kingdom)' },
  { value: '+91', label: '+91 (India)' },
];

const schema = z
  .object({
    userType: z.string(),
    username: z
      .string()
      .min(2, { message: 'Merchant Name must be at least 2 characters long.' })
      .regex(/^(?! )(?=.*[A-Za-z])([A-Za-z0-9]+)(?<![ ])$/, {
        message:
          'Username must contain only alphanumeric characters, cannot have leading or trailing spaces, and should not be numbers-only.',
      }),
    merchantName: z
      .string()
      .min(2, { message: 'Merchant Name must be at least 2 characters long.' })
      .regex(/^(?! )(?!.* $)(?=.*[A-Za-z])^[A-Za-z0-9 ]+$/, {
        message:
          'Merchant Name must contain only alphanumeric characters, cannot have leading or trailing spaces, and should not be numbers-only.',
      })
      .optional(),
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
      .max(10, { message: 'Phone Number exceeds 10 digits' })
      .regex(/^\d{7,10}$/, {
        message: 'Invalid phone number format (e.g., 1234567890)',
      }),
    password: z
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Password must be at least 8 characters long and include at least one letter, one digit, and one special character.',
      }),
    confirm: z.string(),
  })
  .refine(
    ({ userType, merchantName }) => {
      if (userType === 'merchant') {
        return (
          merchantName !== undefined &&
          merchantName !== null &&
          merchantName !== ''
        );
      }
      return true;
    },
    {
      message:
        'Merchant Name is required for merchants and must meet validation conditions.',
      path: ['merchantName'],
    },
  )
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
  merchantName: string;
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
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null,
  );
  const [data] = useState([
    { value: 'consumer', label: 'Consumer' },
    { value: 'merchant', label: 'Merchant' },
  ]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleOnSubmit = async (values) => {
    if (!isTermsAccepted) {
      setIsAlertVisible(true);
      return;
    }

    values.phoneNumber = selectedCountryCode + values.phoneNumber;

    values.address.zipcode = parseInt(values.address.zipcode, 10);
    try {
      await register.mutateAsync(values);
      onSuccess();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Registration error:', error);
    }
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
                    setSelectedUserType(selectedValue);
                    setValue('userType', selectedValue);
                  }}
                  error={formState.errors['userType']?.message}
                />
                {selectedUserType === 'merchant' && (
                  <TextInput
                    label="Merchant Name"
                    placeholder="Enter Merchant Name..."
                    required
                    error={formState.errors['merchantName']?.message}
                    {...register('merchantName')}
                  />
                )}
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
                <Group>
                  <Select
                    label="Country Code"
                    data={countryCodes}
                    placeholder="Select Country Code"
                    required
                    onChange={(selectedValue: string) => {
                      setSelectedCountryCode(selectedValue);
                    }}
                  />
                  <TextInput
                    label="Phone Number"
                    placeholder="Enter your Phone Number"
                    required
                    error={
                      formState.errors['phoneNumber']
                        ? `Invalid phone number format (e.g., ${selectedCountryCode}1234567890)`
                        : null
                    }
                    {...register('phoneNumber')}
                  />
                </Group>
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
                  checked={isTermsAccepted}
                  onChange={() => {
                    setIsTermsAccepted(!isTermsAccepted);
                    setIsAlertVisible(false);
                  }}
                  error={formState.errors['terms']?.message}
                />
                {isAlertVisible && (
                  <Alert color="red" title="Terms and Conditions">
                    You must accept the Terms and Conditions to register.
                  </Alert>
                )}
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
