// lib
import * as React from 'react';

// styles
import 'styles/globals.css';
import '@fontsource/roboto';

// components
import { ProtectRoute } from 'containers/ProtectRoute';

// providers
import { LoginProvider } from 'contexts/LoginContext';
import { AppThemeProvider } from 'contexts/AppThemeProvider';
import { SelectedOrderProvider } from 'contexts/SelectedOrderContext';
import { AdminProvider } from 'contexts/AdminContext';

// types
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <AppThemeProvider>
    <LoginProvider>
      <AdminProvider>
        <ProtectRoute>
          <SelectedOrderProvider>
            <Component {...pageProps} />
          </SelectedOrderProvider>
        </ProtectRoute>
      </AdminProvider>
    </LoginProvider>
  </AppThemeProvider>
);

export default MyApp;
