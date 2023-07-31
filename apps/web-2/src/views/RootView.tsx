import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFoundView } from './NotFoundView';
import { SampleView } from './SampleView';

export const RootView = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SampleView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
};
