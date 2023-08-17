import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from 'ui/nav/Footer';
import { HeaderNavBar } from 'ui/nav/Header';

import theme from '../styles/theme';
import { LoginView } from './auth/pages/LoginView';
import { RegisterView } from './auth/pages/RegisterView';
import { NotFoundView } from './NotFoundView';
import { SampleView } from './SampleView';
import { CartView } from './CartView';

export const RootView = () => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Notifications />
        <HeaderNavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SampleView />} />
            <Route path="/cart" element={<CartView />} />
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
