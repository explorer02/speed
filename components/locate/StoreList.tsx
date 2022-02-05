// lib
import * as React from 'react';

// components
import { Box, List, Typography } from '@mui/material';
import { StoreListItem } from './StoreListItem';

// constants
import { centerAll, expandXY } from 'styles/styleObjects';

// type
import { Store } from 'types/store';

const StoreList = ({
  stores,
  selectedStore,
  onClick,
}: {
  stores: Store[];
  selectedStore?: Store;
  onClick?: (store: Store) => void;
}): JSX.Element => (
  <Box {...expandXY} {...centerAll} flexDirection="column" overflow="auto">
    <Typography variant="h4">Stores</Typography>
    <List>
      {stores.map((store) => (
        <StoreListItem
          key={store.id}
          store={store}
          onClick={onClick}
          selected={selectedStore?.id === store.id}
        />
      ))}
    </List>
  </Box>
);

const MemoizedStoreList = React.memo(StoreList);
export { MemoizedStoreList as StoreList };
