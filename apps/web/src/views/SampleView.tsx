import React from 'react';
import { RatingModule } from 'ui/rating/RatingModule';
import { testData } from 'ui/rating/user-review/test-data';

export const SampleView = () => {
  return (
    <main>
      <RatingModule reviews={testData} ratingValue={5} reviewCount={3423} />
    </main>
  );
};
