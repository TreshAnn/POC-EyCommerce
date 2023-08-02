import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { StyledAnchor, StyledBox } from './style';

export const Footer = () => {
  return (
    <StyledBox>
      <Container size="100%">
        <Stack align="stretch" justify="center">
          <Title align="center">EY-Commerce</Title>
          <Group position="center">
            <StyledAnchor href="#">Home</StyledAnchor>
            <StyledAnchor href="#">About Us</StyledAnchor>
            <StyledAnchor href="#">Services</StyledAnchor>
            <StyledAnchor href="#">Contact Us</StyledAnchor>
            <StyledAnchor href="#">FAQ</StyledAnchor>
          </Group>
          <Divider my="sm" />
          <Group position="apart" grow>
            <Text>@2019 All Rights Reserved</Text>
            <Group position="right">
              <StyledAnchor href="#">Terms</StyledAnchor>
              <StyledAnchor href="#">Privacy</StyledAnchor>
              <StyledAnchor href="#">Cookies</StyledAnchor>
            </Group>
          </Group>
        </Stack>
      </Container>
    </StyledBox>
  );
};
