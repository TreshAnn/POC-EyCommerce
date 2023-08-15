import styled from 'styled-components';

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SquareButton = styled.div`
  cursor: pointer;
  border-radius: 0px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;
`;

export const Count = styled.div`
  ${SquareButton}
  margin: 0;
  padding: 0;
`;
