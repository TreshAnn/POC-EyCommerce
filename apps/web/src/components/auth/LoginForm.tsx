import {
  Anchor,
  Button,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { Form } from "ui";
import * as z from "zod";

import { StyledContainer } from "./styles";

const schema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(8, "Minimum Password is 8"),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  return (
    <StyledContainer>
      <Paper radius="md" p="xl" withBorder>
        <Form<LoginValues, typeof schema>
          onSubmit={async () => {
            onSuccess();
          }}
          schema={schema}
        >
          {({ formState }) => (
            <>
              <Stack>
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  required
                />
                <Button color="yellow" variant="filled" type="submit">
                  Login
                </Button>
                <Flex direction="column">
                  <Text>
                    Don't have an account yet?{" "}
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
