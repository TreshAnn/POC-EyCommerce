import { Container, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { StyledAnchor, StyledBox } from './style';
import { useMediaQuery } from '@mantine/hooks';

export const Footer = () => {
  const isMobile = useMediaQuery('(max-width: 588px)');

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
          {!isMobile ? (
            <Group position="apart" grow>
              <Text>@2019 All Rights Reserved</Text>
              <Group position="right">
                <StyledAnchor href="#">Terms</StyledAnchor>
                <StyledAnchor href="#">Privacy</StyledAnchor>
                <StyledAnchor href="#">Cookies</StyledAnchor>
              </Group>
            </Group>
          ) : (
            <Text align="center">@2019 All Rights Reserved</Text>
          )}
        </Stack>
      </Container>
    </StyledBox>
  );
};
