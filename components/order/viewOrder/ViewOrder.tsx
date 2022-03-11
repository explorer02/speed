// lib
import * as React from 'react';

// components
import { Table } from 'reusable/table';

// helpers
import { getColumnsConfig } from './tableConfig';

// types
import { useViewOrder } from './hooks/useViewOrder';

export const ViewOrder = (): JSX.Element => {
  const { data, isLoading, onAction } = useViewOrder();

  const columnConfig = React.useMemo(() => getColumnsConfig({ onAction }), [onAction]);

  return <Table columnConfig={columnConfig} items={data} isLoading={isLoading} />;
};
