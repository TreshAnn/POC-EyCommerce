import { Text } from '@mantine/core';
import styled from 'styled-components';

export const StyledMenuItemsCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledMenuItemsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;

  & ${Text} {
    width: 100%;
  }
`;
