// lib
import * as React from 'react';

// components
import { ActionBar } from './ActionBar';

// helpers
import { getItemId } from 'helper/getter';

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
  isLoading,
  selectedItems,
  onRowClick,
}: {
  items: Item[];
  actionState: ActionState;
  onAction: OnAction;
  isLoading?: boolean;
  selectedItems: Set<string>;
  onRowClick: (id: string) => void;
}): JSX.Element => (
  <Table
    getId={getItemId}
    columnConfig={columnsConfig}
    items={items}
    sx={{ padding: '20px 80px' }}
    isLoading={isLoading}
    selectedItems={selectedItems}
    onRowClick={onRowClick}
  >
    <Table.Slot name="action_bar">
      <ActionBar
        actionState={actionState}
        onAction={onAction}
        selectedItemsCount={selectedItems.size}
      />
    </Table.Slot>
  </Table>
);
