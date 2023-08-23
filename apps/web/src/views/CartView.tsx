import React from 'react';

import CartTable from '../../../../packages/ui/cart/CartTable';
import { useGetCart } from './cart/api/getCart';
export const CartView = () => {
  const { data, isLoading, isError, error } = useGetCart({});

  return (
    <main>
      {/* Section height is for demo purposes only; please position the footer at the bottom instead of the middle */}
      <section style={{ height: '100vh', background: 'lightgray' }}>
        <div>
          <br />
          {!isLoading && !isError ? (
            <CartTable data={data} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default CartView;
