// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { StockViewer } from 'components/availability';

// helpers
import { getStaticPropsForStoreList } from 'helper/staticPropsGetter';

// constants
import { expandXY } from 'styles/styleObjects';

// types
import { Store } from 'types/store';

const Availability = ({ stores }: { stores: Store[] }): JSX.Element => (
  <Box {...expandXY}>
    <StockViewer stores={stores} />
  </Box>
);

export const getStaticProps = getStaticPropsForStoreList;

export default Availability;
