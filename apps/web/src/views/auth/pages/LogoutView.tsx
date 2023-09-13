import React, { useEffect } from 'react';
import { Center } from '@mantine/core';
import { useLogout } from '../../../lib/auth';
import { useNavigate } from 'react-router-dom';

export const LogoutView = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    logout.mutate({});
  }, [logout]);

  return (
    <main>
      <Center>
        <h1>Logging out...</h1>
      </Center>
    </main>
  );
};
