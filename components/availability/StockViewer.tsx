// lib
import * as React from 'react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

// components
import { Box, IconButton, Stack } from '@mui/material';
import { StockTable } from './table';
import { StoreSelector } from './StoreSelector';

// icons
import RefreshIcon from '@mui/icons-material/Refresh';

// hooks
import { useRefreshTimer } from './useRefreshTimer';

// helpers
import { getQueryForStoreItems } from 'helper/query';

// constants
import { EMPTY_ARRAY } from 'constants/empty';
import { expandXY } from 'styles/styleObjects';
import { STOCK_COLLECTION_ITEM } from 'constants/collections';

// types
import { Item, Store } from 'types/store';

const REFRESH_INTERVAL = 10000;

export const StockViewer = ({ stores }: { stores: Store[] }): React.ReactElement => {
  const [selectedStore, setSelectedStore] = React.useState(stores[0]);

  const timerDeps = React.useMemo(() => [selectedStore.id], [selectedStore.id]);
  const { resetTimer, isRefreshActive } = useRefreshTimer(REFRESH_INTERVAL, timerDeps);

  const query = React.useMemo(() => getQueryForStoreItems(selectedStore.id), [selectedStore.id]);

  const {
    data = EMPTY_ARRAY,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useFirestoreQueryData<Item>([STOCK_COLLECTION_ITEM, selectedStore.id], query);

  const refetchData = React.useCallback(async () => {
    resetTimer();
    await refetch();
  }, [refetch, resetTimer]);

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
        <StockTable data={data} loading={isLoading} error={error as Error} />
      </Box>
      <IconButton
        sx={{ position: 'absolute', top: 0, right: 80 }}
        color="primary"
        size="large"
        disabled={isLoading || isRefetching || !isRefreshActive}
        onClick={refetchData}
      >
        <RefreshIcon />
      </IconButton>
    </Stack>
  );
};
