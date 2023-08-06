import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from 'ui/nav/Footer';
import { HeaderNavBar } from 'ui/nav/Header';

import { LoginView } from './auth/pages/LoginView';
import { NotFoundView } from './NotFoundView';
import { RegisterView } from './Register/RegisterView';
import { SampleView } from './SampleView';

export const RootView = () => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <HeaderNavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SampleView />} />
            <Route path="*" element={<NotFoundView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </MantineProvider>
    </QueryClientProvider>
  );
};
