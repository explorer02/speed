// lib
import * as React from 'react';

// components
import { TableCell, TableRow } from '@mui/material';
import { Table } from 'reusable/table';

// helpers
import { priceFormatter } from 'helper/formatter';
import { getColumnConfig } from './summaryTableConfig';

import { Item, Store } from 'types/store';
import { OnAction } from './types';

type Props = {
  store: Store;
  items: Item[];
  onAction: OnAction;
};

export const OrderSummary = ({ store, items, onAction }: Props): JSX.Element => {
  const totalAmount = priceFormatter(100);

  const columnsConfig = React.useMemo(() => getColumnConfig(onAction), [onAction]);

  return (
    <Table<Item>
      columnConfig={columnsConfig}
      items={items}
      title="Order Summary"
      caption={store.name}
      subCaption={store.address}
      postEntityRows={
        <TableRow>
          <TableCell rowSpan={3} />
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>{totalAmount}</TableCell>
        </TableRow>
      }
    />
  );
};
