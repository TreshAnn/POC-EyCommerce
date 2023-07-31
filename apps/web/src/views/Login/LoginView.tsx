import React from 'react';

import { LoginForm } from '../../components/auth/LoginForm';

export const LoginView = () => {
  return (
    <main>
      <LoginForm
        onSuccess={() => {
          // eslint-disable-next-line no-console
          console.log('Success!');
          return;
        }}
      />
    </main>
  );
};
