import React from 'react';

import { RatingComponent } from '../../../../packages/ui/rating/rating';

export const SampleView = () => {
  return (
    <main>
      {/* Section height is for demo purposes only; please position the footer at the bottom instead of the middle */}
      <section style={{ height: '100vh' }}>
        <div>
          <br />
          <RatingComponent />
        </div>
      </section>
    </main>
  );
};
