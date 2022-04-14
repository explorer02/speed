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
import { SnackbarProvider } from 'contexts/snackbarContext';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <AppThemeProvider>
    <SnackbarProvider>
      <LoginProvider>
        <AdminProvider>
          <ProtectRoute>
            <SelectedOrderProvider>
              <Component {...pageProps} />
            </SelectedOrderProvider>
          </ProtectRoute>
        </AdminProvider>
      </LoginProvider>
    </SnackbarProvider>
  </AppThemeProvider>
);

export default MyApp;
