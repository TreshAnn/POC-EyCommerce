import {
  Anchor,
  Button,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import React, { useState } from 'react';
import { Form } from 'ui';
import * as z from 'zod';

import { useLogin } from '../../lib/auth';
import { StyledContainer } from './styles';

const schema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(8, 'Minimum Password is 8'),
});

type TLoginValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin();
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    const newValue = event.target.value.replace(/\s/g, ''); // Remove spaces using regex
    setInputValue(newValue);
  };

  return (
    <StyledContainer>
      <Paper radius="md" p="xl" withBorder>
        <Form<TLoginValues, typeof schema>
          onSubmit={(values) => {
            login.mutate(values, {
              onSuccess: () => {
                onSuccess();
              },
            });
          }}
          schema={schema}
        >
          {({ formState, register }) => (
            <>
              <Stack>
                <TextInput
                  value={inputValue}
                  onInput={handleInputChange}
                  label="Username"
                  placeholder="Enter your username"
                  required
                  type="text"
                  error={formState.errors['username']?.message}
                  {...register('username')}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  required
                  error={formState.errors['password']?.message}
                  {...register('password')}
                />
                <Button color="yellow" variant="filled" type="submit">
                  Login
                </Button>
                <Flex direction="column">
                  <Text>
                    Don't have an account yet?{' '}
                    <Anchor href="#">Register</Anchor>
                  </Text>
                  <Anchor>Forgot Password?</Anchor>
                </Flex>
              </Stack>
            </>
          )}
        </Form>
      </Paper>
    </StyledContainer>
  );
};
