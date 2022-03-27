// lib
import * as React from 'react';

// components
import { Stack, Box } from '@mui/material';
import { MapRenderer, StoreList } from 'components/locate';
import { CommonPageLayout, SLOT_NAMES } from 'containers/CommonPageLayout';

// helpers
import { getStaticPropsForStoreList } from 'helper/staticPropsGetter';

// types
import { Store } from 'types/store';

const Locate = ({ stores }: { stores: Store[] }): JSX.Element => {
  const [store, setStore] = React.useState<Store>();

  return (
    <CommonPageLayout title="Locate Us">
      <CommonPageLayout.Slot name={SLOT_NAMES.MAIN}>
        <Stack gap={3} p={4}>
          <Box height={700} width="100%">
            <MapRenderer markerData={stores} center={store?.location} onMarkerClick={setStore} />
          </Box>
          <Box width="100%">
            <StoreList stores={stores.slice(0)} selectedStore={store} onClick={setStore} />
          </Box>
        </Stack>
      </CommonPageLayout.Slot>
    </CommonPageLayout>
  );
};

export const getStaticProps = getStaticPropsForStoreList;

export default Locate;
