// lib
import * as React from 'react';

// styles
import 'styles/globals.css';
import '@fontsource/roboto';

// components
import { Layout } from 'containers/Layout';
import { ProtectRoute } from 'containers/ProtectRoute';

// providers
import { QueryClient, QueryClientProvider } from 'react-query';
import { LoginProvider } from 'contexts/LoginContext';
import { AppThemeProvider } from 'contexts/AppThemeProvider';
import { ApolloProvider } from '@apollo/client';

// config
import { client } from 'config/apollo';

// types
import { AppProps } from 'next/app';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ApolloProvider client={client as any}>
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
  </ApolloProvider>
);

export default MyApp;
