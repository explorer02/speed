// lib
import * as React from 'react';

// components
import { Box, Typography } from '@mui/material';
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
  <Box {...expandXY} {...centerAll} flexDirection="column">
    <Typography variant="h5">Stores</Typography>
    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      {stores.map((store) => (
        <StoreListItem
          key={store._id}
          store={store}
          onClick={onClick}
          selected={selectedStore?._id === store._id}
        />
      ))}
    </Box>
  </Box>
);

const MemoizedStoreList = React.memo(StoreList);
export { MemoizedStoreList as StoreList };
