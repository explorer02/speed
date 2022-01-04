// lib
import * as React from 'react';
import { useMeasure } from 'react-use';

// components
import { Box } from '@mui/material';
import { Header } from 'components/app';

// constants
import { centerAll, expandXY } from 'styles/styleObjects';

const HEADER_HEIGHT = 80;
const GAP = 2;

export const Layout = ({ children }: { children?: any }): React.ReactElement => {
  const [ref, { height }] = useMeasure();

  return (
    <Box
      {...expandXY}
      id="layout"
      ref={ref}
      overflow="hidden"
      display="flex"
      flexDirection="column"
      gap={GAP}
    >
      <Box height={HEADER_HEIGHT}>
        <Header />
      </Box>
      <Box
        id="layout-item"
        maxHeight={height - HEADER_HEIGHT - GAP * 8}
        flexGrow={1}
        overflow="auto"
        {...centerAll}
      >
        {children}
      </Box>
    </Box>
  );
};
