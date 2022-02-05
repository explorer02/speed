// lib
import * as React from 'react';
import { useMeasure } from 'react-use';

// components
import { Box, Stack, useTheme } from '@mui/material';
import { Header } from 'components/app';

// constants
import { expandXY } from 'styles/styleObjects';

const HEADER_HEIGHT = 80;
const GAP = 2;

export const Layout = ({ children }: { children?: any }): JSX.Element => {
  const [ref, { height }] = useMeasure();
  const theme = useTheme();

  return (
    <Stack
      {...expandXY}
      id="layout"
      ref={ref}
      spacing={GAP}
      bgcolor={theme.palette.background.default}
    >
      <Box height={HEADER_HEIGHT}>
        <Header />
      </Box>
      <Box id="layout-item" height={height - HEADER_HEIGHT - GAP * 8} overflow="auto">
        {children}
      </Box>
    </Stack>
  );
};
