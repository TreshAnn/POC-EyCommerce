import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Group,
  Title,
  Select,
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
  const [data] = useState([
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
                  label="Street Address"
                  placeholder="Enter your Street"
                  required
                />
                <Group grow>
                  <TextInput
                    label="Region"
                    placeholder="Enter your Region"
                    required
                  />
                  <TextInput
                    label="ZipCode"
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
                <Button color="yellow" variant="filled" type="submit">
                  Register
                </Button>
                <Text>
                  Already have an account? <Anchor href="#"></Anchor>
                </Text>
              </Stack>
            </>
          )}
        </Form>
      </Paper>
    </StyledContainer>
  );
};
