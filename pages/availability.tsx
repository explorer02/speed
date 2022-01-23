// lib
import * as React from 'react';
import { GetStaticProps } from 'next';
import { getDocs } from 'firebase/firestore';

// components
import { Box } from '@mui/material';
import { StockViewer } from 'components/availability';

// helpers
import { getQueryForStoreList } from 'helper/query';

// constants
import { expandXY } from 'styles/styleObjects';

// types
import { Store } from 'types/store';

const Availability = ({ stores }: { stores: Store[] }): React.ReactElement => (
  <Box {...expandXY}>
    <StockViewer stores={stores} />
  </Box>
);

const STORE_QUERY = getQueryForStoreList();

export const getStaticProps: GetStaticProps = async () => {
    const res = await getDocs(STORE_QUERY);
  return {
    props: {
      stores: res.docs.map((doc) => doc.data()),
    },
  };
};

export default Availability;
