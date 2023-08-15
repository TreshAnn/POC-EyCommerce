import { useCounter } from '@mantine/hooks';
import { BsDash, BsPlus } from 'react-icons/bs';

import { Count, QuantityWrapper, SquareButton } from './style';

export function Quantity() {
  const [count, handlers] = useCounter(0, { min: 0, max: 100 });

  return (
    <QuantityWrapper>
      <SquareButton onClick={handlers.decrement}>
        <BsDash style={{ margin: '0', padding: '0' }} />
      </SquareButton>
      <SquareButton>
        <Count>{count}</Count>
      </SquareButton>
      <SquareButton onClick={handlers.increment}>
        <BsPlus style={{ margin: '0', padding: '0' }} />
      </SquareButton>
    </QuantityWrapper>
  );
}
