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

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(8, 'Minimum Password is 8'),
});

type TRegisterValues = {
  usertype: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  street: string;
  region: string;
  zipcode: number;
  country: string;
  password: string;
  confirmpassword: string;
};

type IRegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: IRegisterFormProps) => {
  const [data, setData] = useState([
    { value: 'consumer', label: 'Consumer' },
    { value: 'merchant', label: 'Merchant' },
  ]);

  return (
    <StyledContainer>
      <Paper radius="md" p="xl" withBorder>
        <Form<TRegisterValues, typeof schema>
          onSubmit={async () => {
            onSuccess();
          }}
          schema={schema}
        >
          {({ formState }) => (
            <>
              <Stack>
                <Title order={1}>Register</Title>
                <Select
                  label="User Type"
                  data={data}
                  placeholder="Select items"
                  nothingFound="Nothing found"
                  searchable
                />
                <TextInput
                  label="User Name"
                  placeholder="Enter your User Name..."
                  required
                />
                <Group grow>
                  <TextInput
                    label="First Name"
                    placeholder="Enter your First Name"
                    required
                  />
                  <TextInput
                    label="Last Name"
                    placeholder="Enter your Last Name"
                    required
                  />
                </Group>
                <TextInput
                  label="Email"
                  placeholder="Enter your Email"
                  required
                />
                <TextInput
                  label="Address"
                  placeholder="House No. / Street / Barangay / City / Province"
                  required
                />
                <Group grow>
                  <TextInput
                    label="Region"
                    placeholder="Enter your Region"
                    required
                  />
                  <TextInput
                    label="Zip Code"
                    placeholder="Enter your ZipCode"
                    required
                  />
                  <TextInput
                    label="Country"
                    placeholder="Enter your Country"
                    required
                  />
                </Group>
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  required
                />
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  required
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
