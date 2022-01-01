// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { Header } from './Header';

// constants
import { expandXY, centerAll } from 'styles/styleObjects';

export const Layout = ({ children }: { children?: any }): React.ReactElement => (
  <Box display="flex" flexDirection="column" {...expandXY} id="layout" gap="20px">
    <Box top={0} height={80} flexShrink={0}>
      <Header />
    </Box>
    <Box sx={{ flexGrow: 1 }} id="layout-item" {...centerAll}>
      {children}
    </Box>
  </Box>
);
