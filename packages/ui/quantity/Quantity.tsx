import { Group, Input, TextInput } from '@mantine/core';
import React from 'react';

import { InputStyled, QuantityWrapper, StyledButton } from './style';

export function Quantity() {
  const [count, setCount] = React.useState(1);
  const [inputValue, setInputValue] = React.useState(count.toString());
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numeric characters and specific keys like Backspace, Delete, and arrow keys
    if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      setInputValue((count - 1).toString());
    }
  };

  const handleIncrease = () => {
    if (count < 100) {
      setCount(count + 1);
      setInputValue((count + 1).toString());
    }
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;

    if (!isNaN(newValue) && newValue >= 1 && newValue <= 100) {
      setInputValue(newValue);
      setCount(parseInt(newValue));
    } else if (newValue === '') {
      setInputValue('');
      setCount(1);
    }
  };

  return (
    <QuantityWrapper>
      <StyledButton onClick={handleDecrease}>-</StyledButton>
      <InputStyled
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        type="number"
        min={1}
        max={100}
      />
      <StyledButton onClick={handleIncrease}>+</StyledButton>
    </QuantityWrapper>
  );
}
