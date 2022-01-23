// lib
import * as React from 'react';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// components
import { Description } from './cellRenderer/Description';

// types
import { Item } from 'types/store';

export const COLUMNS = {
  LABEL: 'label',
  PRICE: 'price',
  QUANTITY: 'quantity',
  DESCRIPTION: 'description',
} as const;

export const columnsConfig: GridColDef[] = [
  {
    field: COLUMNS.LABEL,
    headerName: 'Name',
    align: 'left',
    flex: 1,
  },
  {
    field: COLUMNS.PRICE,
    headerName: 'Price',
    flex: 1,
    valueGetter: (params: GridValueGetterParams<Item>): string => `Rs ${params.row.price}/-`,
    align: 'left',
    sortComparator: (v1, v2): number =>
      Number(v1?.toString().slice(3, -2) ?? 0) - Number(v2?.toString().slice(3, -2) ?? 0),
  },
  {
    field: COLUMNS.QUANTITY,
    headerName: 'Quantity',
    flex: 1,
    align: 'left',
    valueGetter: (params: GridValueGetterParams<Item>): string =>
      `${params.row.quantity} ${params.row.unit}`,
    sortComparator: (v1, v2): number =>
      parseInt(v1?.toString() ?? '0', 10) - parseInt(v2?.toString() ?? '0', 10),
  },
  {
    field: COLUMNS.DESCRIPTION,
    headerName: 'Description',
    align: 'left',
    renderCell: (props): React.ReactElement => <Description {...props} />,
    flex: 3,
    sortable: false,
  },
];
