import React from 'react';
import { Checkout } from '../components/auth/Checkout';

export const SampleView = () => {
  return (
    <main>
      <section style={{ height: '100vh' }}>
        <div>
          <Checkout />
        </div>
      </section>
    </main>
  );
};
