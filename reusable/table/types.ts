// types
import { StackProps } from '@mui/material';
import { StringAnyMap } from 'types/generic';

export type ColumnRendererProps<T> = {
  rowIndex: number;
  entity: T;
  value: any;
};

export type Column<T> = {
  id: string;
  label: string;
  fluidWidth: number;
  valueGetter?: (item: T, index: number) => string | number;
  renderer?: (props: ColumnRendererProps<T> & any) => JSX.Element | null;
  rendererProps?: StringAnyMap;
};

export type ColumnsConfig<T> = Column<T>[];

export type Props<T = StringAnyMap> = {
  getId: (entity: T) => string;
  title?: React.ReactNode;
  caption?: React.ReactNode;
  subCaption?: React.ReactNode;
  columnConfig: ColumnsConfig<T>;
  items: T[];
  selectedItems?: Set<string>;
  preEntityRows?: JSX.Element;
  postEntityRows?: JSX.Element;
  children?: JSX.Element;
  isLoading?: boolean;
  onRowClick?: (id: string) => void;
  emptyRowContent?: string;
} & Pick<StackProps, 'sx'>;
