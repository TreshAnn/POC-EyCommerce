import React from 'react';

import CartTable from '../../../../packages/ui/cart/CartTable';
export const CartView = () => {
  return (
    <main>
      {/* Section height is for demo purposes only; please position the footer at the bottom instead of the middle */}
      <section style={{ height: '100vh', background: 'lightgray' }}>
        <div>
          <br />
          <CartTable />
        </div>
      </section>
    </main>
  );
};

export default CartView;
