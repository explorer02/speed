// lib
import * as React from 'react';
import { useLocation, useMeasure } from 'react-use';
import Head from 'next/head';

// components
import { Box, Stack, useTheme } from '@mui/material';
import { Header } from 'components/app';

// constants
import { expandXY } from 'styles/styleObjects';
import { HOME_PATH, PAGE_TITLE } from 'constants/paths';

const HEADER_HEIGHT = 68;
const GAP = 2;

export const Layout = ({ children }: { children?: any }): JSX.Element => {
  const [ref, { height }] = useMeasure();
  const theme = useTheme();

  const { pathname } = useLocation();

  return (
    <>
      <Head>
        <title>{PAGE_TITLE[pathname ?? HOME_PATH]}</title>
      </Head>
      <Stack
        {...expandXY}
        id="layout"
        ref={ref as React.Ref<unknown>}
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
    </>
  );
};
