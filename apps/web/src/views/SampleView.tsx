import React from 'react';
import { Product } from 'ui/product/Product';

export const SampleView = () => {
  return (
    <main>
      <section>
        <h1>Hello world!</h1>
        <h1>Ey React App Boilerplate made by DanDalanDone! TEST HERE</h1>
        <div>
          <Product ratingValue={3} />
          <br />
        </div>
      </section>
    </main>
  );
};
