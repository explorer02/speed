// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { MapRenderer, StoreList } from 'components/locate';

// converters
import { storeConverter } from 'converters/store';

// styles
import { centerVertically, expandXY } from 'styles/styleObjects';

// types
import { GetStaticProps } from 'next';
import { getQueryForStoreData } from 'helper/query';
import { Store } from 'types/store';
import { getDocs } from 'firebase/firestore';

const Locate = ({ stores }: { stores: Store[] }): React.ReactElement => {
  const [store, setStore] = React.useState<Store>();
  return (
    <Box {...centerVertically} {...expandXY} padding={4}>
      <Box flexGrow={1} height="100%">
        <MapRenderer markerData={stores} center={store?.location} onMarkerClick={setStore as any} />
      </Box>
      <Box maxWidth={400} height="100%" ml={2}>
        <StoreList stores={stores} selectedStore={store} onClick={setStore} />
      </Box>
    </Box>
  );
};

const STORE_QUERY = getQueryForStoreData().withConverter(storeConverter);

export const getStaticProps: GetStaticProps = async () => {
  const res = await getDocs(STORE_QUERY);
  return {
    props: {
      stores: res.docs.map((doc) => doc.data()),
    },
  };
};

export default Locate;
