import React, { useEffect } from 'react';
import { Center, Loader } from '@mantine/core';
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
        <h1>Logging out &nbsp;</h1>
        <Loader color="yellow" />
      </Center>
    </main>
  );
};
