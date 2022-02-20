// lib
import * as React from 'react';

// constants
import { columnsConfig } from './stockTableConfig';

// types
import { Item } from 'types/store';
import { Table } from 'reusable/table';

export const StockTable = ({ items }: { items: Item[] }): JSX.Element => (
  <Table columnConfig={columnsConfig} items={items} sx={{ padding: '20px 80px' }} />
);
