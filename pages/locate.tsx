// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { MapRenderer, StoreList } from 'components/locate';

// styles
import { centerVertically, expandXY } from 'styles/styleObjects';

// types
import { NextPage } from 'next';

const Locate: NextPage = () => (
  <Box {...centerVertically} {...expandXY}>
    <Box flexGrow={3}>
      <MapRenderer />
    </Box>
    <Box flexGrow={1}>
      <StoreList />
    </Box>
  </Box>
);

export default Locate;
