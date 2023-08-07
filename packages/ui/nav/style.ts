import styled from 'styled-components';
import { Box } from '@mantine/core';

export const StyledBox = styled(Box)`
  background: #ffc815;
  padding: 50px 40px;
`;

export const StyledAnchor = styled('a')`
  text-decoration: none;
  color: #000;
  font-size: 1.25rem;
`;

export const AvatarContainer = styled.div`
  justify-content: flex-start;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 8px;
  padding-top: 2px;
`;

export const CartTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
