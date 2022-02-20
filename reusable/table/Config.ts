// types
import { StringAnyMap, ValueOf } from 'types/generic';

export type ColumnRendererProps<T> = {
  rowIndex: number;
  value: ValueOf<T>;
  entity: T;
} & StringAnyMap;

export type Column<T> = {
  id: string;
  label: string;
  fluidWidth: number;
  valueGetter?: (item: T) => string;
  renderer?: (props: ColumnRendererProps<T>) => JSX.Element;
  rendererProps?: StringAnyMap;
};

export type ColumnsConfig<T> = Column<T>[];
