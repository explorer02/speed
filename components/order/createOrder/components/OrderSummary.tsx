// lib
import * as React from 'react';

// components
import { TableCell, TableRow } from '@mui/material';
import { ColumnsConfig, Table, Props as TableProps } from 'reusable/table';

// helpers
import { priceFormatter } from 'helper/formatter';
import { getItemId } from 'helper/getter';
import { getTotalAmount } from '../helper';

// types
import { Item, Store } from 'types/store';

type Props = {
  store: Store;
  items: Item[];
  columnsConfig: ColumnsConfig<Item>;
  tableProps?: Partial<TableProps<Item>>;
};

export const OrderSummary = ({ store, items, columnsConfig, tableProps }: Props): JSX.Element => {
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
      {...tableProps}
    />
  );
};
