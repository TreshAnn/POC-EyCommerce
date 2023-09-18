import { notifications } from '@mantine/notifications';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../../components/auth/LoginForm';

export const LoginView = () => {
  const navigate = useNavigate();
  return (
    <main>
      <LoginForm
        onSuccess={() => {
          notifications.show({
            message: 'Login Success!',
          });

          window.location.href = '/products';
        }}
      />
    </main>
  );
};
