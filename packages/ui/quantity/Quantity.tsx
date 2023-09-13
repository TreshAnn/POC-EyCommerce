import React from 'react';

import { InputStyled, QuantityWrapper, StyledButton } from './style';

interface IQuantityProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  maxQty: number;
}

export function Quantity({
  quantity,
  onQuantityChange,
  maxQty,
}: IQuantityProps) {
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numeric characters and specific keys like Backspace, Delete, and arrow keys
    if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQty) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;

    if (!isNaN(newValue) && newValue >= 0 && newValue <= maxQty) {
      onQuantityChange(parseInt(newValue));
    } else if (newValue === '') {
      onQuantityChange(1);
    }
  };

  return (
    <QuantityWrapper>
      <StyledButton onClick={handleDecrease}>-</StyledButton>
      <InputStyled
        value={quantity.toString()}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        type="number"
        min={1}
        max={maxQty}
      />
      <StyledButton onClick={handleIncrease}>+</StyledButton>
    </QuantityWrapper>
  );
}
