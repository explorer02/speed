// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { MoveOrder } from './components/MoveOrder';
import { SnackBarOverlay } from 'reusable/snackbarOverlay';

// hooks
import { useOrderActions } from './hooks/useOrderActions';

// types
import { Order } from 'types/order';
import { ColumnRendererProps } from 'reusable/table';

export const Actions = ({ entity: order }: ColumnRendererProps<Order>): JSX.Element => {
  const { onAction, snackbarState } = useOrderActions({ order });

  return (
    <>
      <SnackBarOverlay {...snackbarState} />
      <Box display="flex" gap={1}>
        <MoveOrder order={order} onAction={onAction} />
      </Box>
    </>
  );
};
