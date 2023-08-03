import { MantineProvider } from '@mantine/core';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderNavBar } from 'ui';

import { LoginView } from './Login/LoginView';
import { NotFoundView } from './NotFoundView';
import { SampleView } from './SampleView';

export const RootView = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <HeaderNavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SampleView />} />
          <Route path="*" element={<NotFoundView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};
