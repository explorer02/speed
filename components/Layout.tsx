// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { Header } from './Header';

// constants
import { expandXY, centerAll } from 'utils/commonProps';

export const Layout = ({ children }: { children?: any }) => (
  <Box display="flex" flexDirection="column" {...expandXY} id="layout">
    <Header containerStyles={{ height: 80, flexShrink: 0 }} />
    <Box sx={{ flexGrow: 1 }} id="layout-item" {...centerAll}>
      {children}
    </Box>
  </Box>
);
