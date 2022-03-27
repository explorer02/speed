// lib
import * as React from 'react';

// components
import { Table } from 'reusable/table';
import { SnackBarOverlay } from 'reusable/snackbarOverlay';

// hooks
import { useViewOrder } from './hooks/useViewOrder';

// helpers
import { getColumnsConfig } from './tableConfig';
import { getOrderId } from 'helper/getter';

export const ViewOrder = (): JSX.Element => {
  const { data, isLoading, onAction, snackbarState } = useViewOrder();

  const columnConfig = React.useMemo(() => getColumnsConfig({ onAction }), [onAction]);

  return (
    <>
      <SnackBarOverlay {...snackbarState} />
      <Table getId={getOrderId} columnConfig={columnConfig} items={data} isLoading={isLoading} />
    </>
  );
};
