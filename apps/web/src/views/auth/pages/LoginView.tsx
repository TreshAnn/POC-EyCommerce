import { notifications } from '@mantine/notifications';
import React from 'react';

import { LoginForm } from '../../../components/auth/LoginForm';

export const LoginView = () => {
  return (
    <section style={{ height: '100vh' }}>
      <main>
        <LoginForm
          onSuccess={() => {
            notifications.show({
              message: 'Login Success!',
            });
            return;
          }}
        />
      </main>
    </section>
  );
};
