// components
import { TableLayout } from './TableLayout';
import { TombStone } from './Tombstone';
import { Caption, Title } from './Title';
import { ColumnGroup } from './ColumnGroup';
import { Header } from './Header';
import { TableBody } from './TableBody';

// types
import { StringAnyMap } from 'types/generic';
import { Props } from './types';

export const Table = <T extends StringAnyMap>({
  sx,
  children,
  isLoading,
  columnConfig,
  ...rest
}: Props<T>): JSX.Element => (
  <TableLayout sx={sx}>
    {children}
    <TableLayout.Slot name="title">
      <Title {...rest} />
    </TableLayout.Slot>

    <TableLayout.Slot name="caption">
      <Caption {...rest} />
    </TableLayout.Slot>

    <TableLayout.Slot name="column_group">
      <ColumnGroup {...rest} columnConfig={columnConfig} />
    </TableLayout.Slot>

    <TableLayout.Slot name="header">
      <Header {...rest} columnConfig={columnConfig} />
    </TableLayout.Slot>

    <TableLayout.Slot name="body">
      {isLoading ? (
        <TombStone columnConfig={columnConfig} />
      ) : (
        <TableBody {...rest} columnConfig={columnConfig} />
      )}
    </TableLayout.Slot>
  </TableLayout>
);

Table.Slot = TableLayout.Slot;
