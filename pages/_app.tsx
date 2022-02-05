// lib
import * as React from 'react';

// styles
import 'styles/globals.css';
import 'fontsource-roboto';

// components
import { Layout } from 'containers/Layout';
import { ProtectRoute } from 'containers/ProtectRoute';

// providers
import { QueryClient, QueryClientProvider } from 'react-query';
import { LoginProvider } from 'contexts/LoginContext';
import { AppThemeProvider } from 'contexts/AppThemeProvider';

// types
import { AppProps } from 'next/app';
import { NextPage } from 'next';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, refetchOnMount: false } },
});

const MyApp = ({ Component, pageProps }: AppProps): NextPage =>
  (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <LoginProvider>
          <ProtectRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectRoute>
        </LoginProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  ) as unknown as NextPage;

export default MyApp;
