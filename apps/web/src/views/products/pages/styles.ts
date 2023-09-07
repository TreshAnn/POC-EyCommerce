import { Grid, Container, DEFAULT_THEME } from '@mantine/core';
import styled from 'styled-components';

export const StyledContainer = styled(Container)`
  padding: 50px 30px;

  @media (max-width: ${DEFAULT_THEME.breakpoints.sm}) {
  }
`;

export const StyledGridCol = styled(Grid.Col)`
  @media (max-width: ${DEFAULT_THEME.breakpoints.sm}) {
    display: flex;
    justify-content: center;
  }
`;

export const StyledDiv = styled.div`
  @media (max-width: ${DEFAULT_THEME.breakpoints.sm}) {
    display: flex;
    justify-content: center;
  }
`;
