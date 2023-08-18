import styled from 'styled-components';
import { Menu } from '@mantine/core';

export const StyledMenuDropdown = styled(Menu.Dropdown)`
  max-height: 575px;
  overflow-y: auto;
`;

export const StyledMenuLabel = styled(Menu.Label)`
  background: #fff;
  z-index: 2;
  padding: 10px 5px;
`;
