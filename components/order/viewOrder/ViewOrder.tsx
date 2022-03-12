// lib
import * as React from 'react';

// components
import { Table } from 'reusable/table';

// helpers
import { getColumnsConfig } from './tableConfig';

// types
import { useViewOrder } from './hooks/useViewOrder';
import { SnackBarOverlay } from 'reusable/snackbarOverlay';

export const ViewOrder = (): JSX.Element => {
  const { data, isLoading, onAction, snackbarState } = useViewOrder();

  const columnConfig = React.useMemo(() => getColumnsConfig({ onAction }), [onAction]);

  return (
    <>
      <SnackBarOverlay {...snackbarState} />
      <Table columnConfig={columnConfig} items={data} isLoading={isLoading} />;
    </>
  );
};
