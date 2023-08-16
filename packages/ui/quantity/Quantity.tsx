import { useCounter } from '@mantine/hooks';

import {
  BsDashStyled,
  BsPlusStyled,
  Count,
  QuantityWrapper,
  SquareButton,
} from './style';

export function Quantity() {
  const [count, handlers] = useCounter(0, { min: 1, max: 100 });

  return (
    <QuantityWrapper>
      <SquareButton onClick={handlers.decrement}>
        <BsDashStyled />
      </SquareButton>
      <SquareButton>
        <Count>{count}</Count>
      </SquareButton>
      <SquareButton onClick={handlers.increment}>
        <BsPlusStyled />
      </SquareButton>
    </QuantityWrapper>
  );
}
