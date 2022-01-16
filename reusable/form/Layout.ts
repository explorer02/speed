// types
import { GridProps } from '@mui/material';

export const ITEM_TYPE = {
  COLUMN: 'COLUMN',
  ROW: 'ROW',
  ROW_GROUP: 'ROW_GROUP',
  COLUMN_GROUP: 'COLUMN_GROUP',
} as const;

type ItemProps = {
  style?: GridProps;
};

export type Column = ItemProps & {
  id: string;
  type: typeof ITEM_TYPE.COLUMN;
};
export type ColumnGroup = ItemProps & {
  type: typeof ITEM_TYPE.COLUMN_GROUP;
  children: (Column | RowGroup)[];
  label?: string;
};

export type Row = ItemProps & {
  id: string;
  type: typeof ITEM_TYPE.ROW;
};
export type RowGroup = ItemProps & {
  type: typeof ITEM_TYPE.ROW_GROUP;
  children: (Row | ColumnGroup)[];
  label?: string;
};

export type Item = Row | Column | ColumnGroup | RowGroup;

export type Layout = {
  children: Item[];
  style?: GridProps;
};
