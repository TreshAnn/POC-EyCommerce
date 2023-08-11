import React from 'react';

import { Product } from '../../../../packages/ui/product/Product';
import { Searchbar } from '../../../../packages/ui/searchbar/searchbar';

export const SampleView = () => {
  return (
    <main>
      {/* Section height is for demo purposes only; please position the footer at the bottom instead of the middle */}
      <section style={{ height: '100vh' }}>
        <div>
          <br />
          <Searchbar />
          <Product />
        </div>
      </section>
    </main>
  );
};
