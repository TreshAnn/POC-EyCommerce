import React from 'react';

import { RegisterForm } from '../../components/auth/RegisterForm';

export const RegisterView = () => {
  return (
    <main>
      <RegisterForm
        onSuccess={() => {
          // eslint-disable-next-line no-console
          console.log('Success!');
          return;
        }}
      />
    </main>
  );
};
