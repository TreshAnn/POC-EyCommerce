import React from 'react';

import { RegisterForm } from '../../../components/auth/RegisterForm';
import { notifications } from '@mantine/notifications';

export const RegisterView = () => {
  return (
    <main>
      <RegisterForm
        onSuccess={() => {
          notifications.show({
            message: 'Register Success!',
          });
          return;
        }}
      />
    </main>
  );
};
