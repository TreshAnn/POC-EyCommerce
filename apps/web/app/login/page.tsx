"use client";

import {
  PasswordInput,
  TextInput,
  Text,
  Button,
  Group,
  Flex,
  Container,
  Image,
  Box,
  Anchor,
} from "@mantine/core";
import { useState } from "react";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Box className="login-section">
        <Container className="login-container">
          <Flex direction="column" align="center" justify="center" gap={20}>
            {" "}
            {/* Add grow prop here */}
            <TextInput
              className="login-width"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />
            <PasswordInput
              className="login-width"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              required
            />
            <Button
              className="login-width"
              color="yellow"
              variant="filled"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Flex direction="column">
              <Text>
                Don't have an account yet? <Anchor href="#">Register</Anchor>
              </Text>
              <Anchor>Forgot Password?</Anchor>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
