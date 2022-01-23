// lib
import * as React from 'react';

// components
import { Box, IconButton, Stack } from '@mui/material';
import { StockTable } from './table';
import { StoreSelector } from './StoreSelector';

// icons
import RefreshIcon from '@mui/icons-material/Refresh';

// hooks
import { useFireStoreQuery } from 'hooks/firebase';

// helpers
import { getQueryForStoreItems } from 'helper/query';

// constants
import { EMPTY_ARRAY } from 'constants/empty';
import { expandXY } from 'styles/styleObjects';

// types
import { Item, Store } from 'types/store';

// TODO: Add refresh functionality
export const StockViewer = ({ stores }: { stores: Store[] }): React.ReactElement => {
  const [selectedStore, setSelectedStore] = React.useState(stores[0]);

  const query = React.useMemo(() => getQueryForStoreItems(selectedStore.id), [selectedStore.id]);
  const { data = EMPTY_ARRAY, loading, error } = useFireStoreQuery<Item>(query);

  return (
    <Stack gap={4} py={2} {...expandXY} sx={{ position: 'relative' }}>
      <Box flexShrink={0}>
        <StoreSelector
          stores={stores}
          selectedStore={selectedStore}
          onStoreChange={setSelectedStore}
        />
      </Box>
      <Box flexGrow={1}>
        <StockTable data={data} loading={loading} error={error} />
      </Box>
      <IconButton sx={{ position: 'absolute', top: 0, right: 80 }} color="primary" size="large">
        <RefreshIcon />
      </IconButton>
    </Stack>
  );
};
