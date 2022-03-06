// lib
import * as React from 'react';

// components
import { Typography } from '@mui/material';

// hooks
import { useStores } from 'contexts/StoresContext';

// types
import { Order } from 'types/order';
import { ColumnRendererProps } from 'reusable/table';

export const Store = ({ value }: ColumnRendererProps<Order>): JSX.Element => {
  const storeId = value;
  const stores = useStores();

  const currentStore = React.useMemo(
    () => stores.find((store) => store.id === storeId),
    [storeId, stores],
  );
  return (
    <Typography variant="body2" maxWidth="100%">
      {currentStore?.name}
    </Typography>
  );
};
