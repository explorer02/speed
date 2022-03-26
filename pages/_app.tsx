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

// types
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <AppThemeProvider>
    <LoginProvider>
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
    </LoginProvider>
  </AppThemeProvider>
);

export default MyApp;
