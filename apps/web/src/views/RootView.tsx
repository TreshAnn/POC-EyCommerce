import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './AuthProvider';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from 'ui/nav/Footer';
import { HeaderNavBar } from 'ui/nav/Header';

import theme from '../styles/theme';
import { LoginView } from './auth/pages/LoginView';
import { RegisterView } from './auth/pages/RegisterView';
import { NotFoundView } from './NotFoundView';
import {
  ProductDetailView,
  ProductsView,
  MerchantProducts,
} from './products/pages';
import { SampleView } from './SampleView';
import { CartView } from './CartView';
import { StyledContainer } from './styles/styles';
import { ProtectedRoute } from './ProtectedRoute';
import { UnauthorizedView } from './UnauthorizedView';

export const RootView = () => {
  const [queryClient] = React.useState(() => new QueryClient());
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Notifications />

        <StyledContainer>
          <BrowserRouter>
            <HeaderNavBar />
            <Routes>
              <Route path="/" element={<SampleView />} />

              <Route path="*" element={<NotFoundView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/products" element={<ProductsView />} />
              <Route
                path="/products/:productID"
                element={<ProductDetailView />}
              />
              <Route path="/unauthorized" element={<UnauthorizedView />} />
              <Route element={<ProtectedRoute roleRequired="merchant" />}>
                <Route
                  index
                  path="/my-products"
                  element={<MerchantProducts />}
                />
              </Route>

              <Route element={<ProtectedRoute roleRequired="consumer" />}>
                <Route path="/cart" element={<CartView />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </StyledContainer>
        <Footer />
      </MantineProvider>
    </QueryClientProvider>
  );
};
