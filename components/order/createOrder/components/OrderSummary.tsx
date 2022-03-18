// lib
import * as React from 'react';

// components
import { TableCell, TableRow } from '@mui/material';
import { Table } from 'reusable/table';

// helpers
import { priceFormatter } from 'helper/formatter';
import { getColumnConfig } from './summaryTableConfig';
import { getItemId } from 'helper/getter';
import { getTotalAmount } from '../helper';

import { Item, Store } from 'types/store';
import { OnAction } from '../hooks/types';

type Props = {
  store: Store;
  items: Item[];
  onAction: OnAction;
};

export const OrderSummary = ({ store, items, onAction }: Props): JSX.Element => {
  const columnsConfig = React.useMemo(() => getColumnConfig(onAction), [onAction]);
  const totalAmount = React.useMemo(() => getTotalAmount(items), [items]);
  return (
    <Table<Item>
      getId={getItemId}
      columnConfig={columnsConfig}
      items={items}
      title="Order Summary"
      caption={store.name}
      subCaption={store.address}
      postEntityRows={
        <TableRow>
          <TableCell rowSpan={3} />
          <TableCell colSpan={2}>Total Amount</TableCell>
          <TableCell>{priceFormatter(totalAmount)}</TableCell>
        </TableRow>
      }
    />
  );
};
