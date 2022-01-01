// lib
import * as React from 'react';

// styles
import 'styles/globals.css';
import 'fontsource-roboto';

// components
import { Layout } from 'components/Layout';
import { ProtectRoute } from 'components/app/ProtectRoute';

// providers
import { LoginProvider } from 'contexts/LoginContext';

// types
import { AppProps } from 'next/app';
import { NextPage } from 'next';

const MyApp = ({ Component, pageProps }: AppProps): NextPage =>
  (
    <LoginProvider>
      <ProtectRoute>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProtectRoute>
    </LoginProvider>
  ) as unknown as NextPage;

export default MyApp;
