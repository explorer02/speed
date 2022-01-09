// lib
import * as React from 'react';

// styles
import 'styles/globals.css';
import 'fontsource-roboto';

// components
import { Layout } from 'containers/Layout';
import { ProtectRoute } from 'containers/ProtectRoute';

// providers
import { LoginProvider } from 'contexts/LoginContext';
import { ProfileProvider } from 'contexts/ProfileContext';
import { AppThemeProvider } from 'contexts/AppThemeProvider';

// types
import { AppProps } from 'next/app';
import { NextPage } from 'next';

const MyApp = ({ Component, pageProps }: AppProps): NextPage =>
  (
    <AppThemeProvider>
      <LoginProvider>
        <ProfileProvider>
          <ProtectRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectRoute>
        </ProfileProvider>
      </LoginProvider>
    </AppThemeProvider>
  ) as unknown as NextPage;

export default MyApp;
