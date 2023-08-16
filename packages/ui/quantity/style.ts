import styled from 'styled-components';

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledButton = styled.div`
  cursor: pointer;
  border-radius: 0px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;
`;
export const InputStyled = styled.input`
  text-align: center;
  width: 25px;
  height: 25px;
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
`;
