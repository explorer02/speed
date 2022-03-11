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
