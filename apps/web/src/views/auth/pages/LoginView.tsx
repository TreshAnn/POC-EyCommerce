import { notifications } from '@mantine/notifications';
import React from 'react';

import { LoginForm } from '../../../components/auth/LoginForm';

export const LoginView = () => {
  return (
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
  );
};
