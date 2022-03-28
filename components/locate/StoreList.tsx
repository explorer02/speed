// lib
import { memo } from 'react';

// components
import { Box, Typography } from '@mui/material';
import { StoreListItem } from './StoreListItem';

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
  <Box>
    <Typography variant="h6">Stores</Typography>
    <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
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

const MemoizedStoreList = memo(StoreList);
export { MemoizedStoreList as StoreList };
