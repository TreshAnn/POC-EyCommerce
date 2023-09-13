import React from 'react';

import { notifications } from '@mantine/notifications';
import { UpdateForm } from '../../../components/user/UpdateForm';

export const UserProfile = () => {
  return (
    <main>
      <UpdateForm
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
