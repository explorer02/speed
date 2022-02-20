// lib
import * as React from 'react';

// components
import { ActionBar } from './ActionBar';

// constants
import { columnsConfig } from './stockTableConfig';

// types
import { Item } from 'types/store';
import { Table } from 'reusable/table';
import { ActionState, OnAction } from '../types';

export const StockTable = ({
  items,
  actionState,
  onAction,
}: {
  items: Item[];
  actionState: ActionState;
  onAction: OnAction;
}): JSX.Element => (
  <Table columnConfig={columnsConfig} items={items} sx={{ padding: '20px 80px' }}>
    <Table.Slot name="action_bar">
      <ActionBar actionState={actionState} onAction={onAction} />
    </Table.Slot>
  </Table>
);
