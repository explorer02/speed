// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { CommonPageLayout, SLOT_NAMES } from 'containers/CommonPageLayout';

// types
import { NextPage } from 'next';

const Home: NextPage = () => (
  <CommonPageLayout title="Home">
    <CommonPageLayout.Slot name={SLOT_NAMES.MAIN}>
      <Box>Home</Box>
    </CommonPageLayout.Slot>
  </CommonPageLayout>
);

export default Home;
