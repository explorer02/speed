// lib
import * as React from 'react';

// components
import { Stack } from '@mui/material';
import { StockTable } from './StockTable';
import { StoreSelector } from './StoreSelector';

// types
import { Store } from 'types/store';

export const StockViewer = ({ stores }: { stores: Store[] }): React.ReactElement => {
  const [selectedStore] = React.useState(stores[0]);

  return (
    <Stack gap={2}>
      <StoreSelector stores={stores} selectedStore={selectedStore} />
      <StockTable selectedStore={selectedStore} />
    </Stack>
  );
};
