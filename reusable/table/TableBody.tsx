// components
import { TableBody as BaseTableBody, TableCell, TableRow, Typography } from '@mui/material';

// constants
import { grey } from '@mui/material/colors';
import { centerHorizontally } from 'styles/styleObjects';

// types
import { StringAnyMap } from 'types/generic';
import { Props } from './types';

const Row = <T extends StringAnyMap>({
  columnConfig,
  selectedItems,
  onRowClick,
  rowId,
  item,
  rowIndex,
}: Pick<Props<T>, 'columnConfig' | 'selectedItems' | 'onRowClick'> & {
  rowId: string;
  item: T;
  rowIndex: number;
}): JSX.Element => (
  <TableRow
    key={rowId}
    onClick={(): void => onRowClick?.(rowId)}
    sx={{
      background: selectedItems?.has(rowId) ? grey[400] : undefined,
      cursor: onRowClick ? 'pointer' : undefined,
    }}
  >
    {columnConfig.map((column) => {
      const { renderer: Renderer, rendererProps } = column;
      const value = column.valueGetter?.(item, rowIndex) ?? item[column.id];
      return (
        <TableCell key={`${rowId}${column.id}`} color="primary">
          {Renderer ? (
            <Renderer rowIndex={rowIndex} entity={item} value={value} {...rendererProps} />
          ) : (
            value
          )}
        </TableCell>
      );
    })}
  </TableRow>
);

const EmptyRow = <T,>({
  columnConfig,
  emptyRowContent,
}: Pick<Props<T>, 'columnConfig' | 'emptyRowContent'>): JSX.Element => (
  <TableRow>
    <TableCell colSpan={columnConfig.length}>
      <Typography {...centerHorizontally}>{emptyRowContent ?? 'No items to show'}</Typography>
    </TableCell>
  </TableRow>
);

export const TableBody = <T extends StringAnyMap>({
  items,
  columnConfig,
  preEntityRows,
  postEntityRows,
  selectedItems,
  onRowClick,
  getId,
  emptyRowContent,
}: Pick<
  Props<T>,
  | 'columnConfig'
  | 'items'
  | 'preEntityRows'
  | 'postEntityRows'
  | 'selectedItems'
  | 'onRowClick'
  | 'getId'
  | 'emptyRowContent'
>): JSX.Element => {
  const rowItems = items.map((item, rowIndex) => {
    const rowId = getId(item);
    return (
      <Row
        key={rowId}
        rowId={rowId}
        item={item}
        rowIndex={rowIndex}
        columnConfig={columnConfig}
        selectedItems={selectedItems}
        onRowClick={onRowClick}
      />
    );
  });
  return (
    <BaseTableBody>
      {preEntityRows}
      {rowItems.length ? (
        rowItems
      ) : (
        <EmptyRow columnConfig={columnConfig} emptyRowContent={emptyRowContent} />
      )}
      {postEntityRows}
    </BaseTableBody>
  );
};
