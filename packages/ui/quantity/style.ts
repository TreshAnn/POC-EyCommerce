import styled from 'styled-components';
import { DEFAULT_THEME } from '@mantine/core';

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.div`
  cursor: pointer;
  border-radius: 0px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;

  @media (max-width: ${DEFAULT_THEME.breakpoints.sm}) {
    width: 14px;
    height: 20px;
  }
`;
export const InputStyled = styled.input`
  text-align: center;
  width: 30px;
  height: 30px;
  font-size: 12px;
  border: 1px solid #ccc;
  /* Hide the spinner buttons */
  -webkit-appearance: none;
  -moz-appearance: textfield; /* Firefox - revert default style */
  appearance: none;

  /* Hide the webkit inner spin button */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: ${DEFAULT_THEME.breakpoints.sm}) {
    font-size: 10px;
    width: 16px;
    height: 20px;
  }
`;
