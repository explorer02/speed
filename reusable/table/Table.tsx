// lib
import * as React from 'react';

// components
import {
  Stack,
  TableHead,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  StackProps,
} from '@mui/material';
import { TableLayout } from './TableLayout';
import { TombStone } from './Tombstone';

// constants
import { centerHorizontally } from 'styles/styleObjects';
import { grey } from '@mui/material/colors';

// types
import { StringAnyMap } from 'types/generic';
import { ColumnsConfig } from './Config';

type BaseEntityType = StringAnyMap;

export type Props<T extends BaseEntityType> = {
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
} & Pick<StackProps, 'sx'>;

const Title = <T extends BaseEntityType>({ title }: Pick<Props<T>, 'title'>): JSX.Element | null =>
  title ? (
    <Typography component="div" {...centerHorizontally} variant="h5">
      {title}
    </Typography>
  ) : null;

const Caption = <T extends BaseEntityType>({
  caption,
  subCaption,
}: Pick<Props<T>, 'caption' | 'subCaption'>): JSX.Element | null =>
  caption || subCaption ? (
    <Stack>
      {caption ? (
        <Typography component="div" variant="body1">
          {caption}
        </Typography>
      ) : null}
      {subCaption ? (
        <Typography component="div" variant="body2">
          {subCaption}
        </Typography>
      ) : null}
    </Stack>
  ) : null;

const ColumnGroup = <T extends BaseEntityType>({
  columnConfig,
}: Pick<Props<T>, 'columnConfig'>): JSX.Element => {
  const totalFluidWidth = React.useMemo(
    () => columnConfig.reduce((sum, column) => sum + column.fluidWidth ?? 0, 0),
    [columnConfig],
  );

  return (
    <colgroup>
      {columnConfig.map((column) => (
        <col key={column.id} width={`${(column.fluidWidth / totalFluidWidth) * 100}%`} />
      ))}
    </colgroup>
  );
};

const Header = <T extends BaseEntityType>({
  columnConfig,
}: Pick<Props<T>, 'columnConfig'>): JSX.Element => (
  <TableHead>
    <TableRow>
      {columnConfig.map((column) => (
        <TableCell key={column.id}>{column.label}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const Body = <T extends BaseEntityType>({
  items,
  columnConfig,
  preEntityRows,
  postEntityRows,
  selectedItems,
  onRowClick,
  getId,
}: Pick<
  Props<T>,
  | 'columnConfig'
  | 'items'
  | 'preEntityRows'
  | 'postEntityRows'
  | 'selectedItems'
  | 'onRowClick'
  | 'getId'
>): JSX.Element => (
  <TableBody>
    {preEntityRows}
    {items.map((item, rowIndex) => {
      const rowId = getId(item);
      return (
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
    })}
    {postEntityRows}
  </TableBody>
);

export const Table = <T extends BaseEntityType>({
  title,
  caption,
  subCaption,
  columnConfig,
  items,
  selectedItems,
  onRowClick,
  preEntityRows,
  postEntityRows,
  sx,
  children,
  isLoading,
  getId,
}: Props<T>): JSX.Element => (
  <TableLayout sx={sx}>
    {children}
    <TableLayout.Slot name="title">
      <Title title={title} />
    </TableLayout.Slot>

    <TableLayout.Slot name="caption">
      <Caption caption={caption} subCaption={subCaption} />
    </TableLayout.Slot>

    <TableLayout.Slot name="column_group">
      <ColumnGroup columnConfig={columnConfig} />
    </TableLayout.Slot>

    <TableLayout.Slot name="header">
      <Header columnConfig={columnConfig} />
    </TableLayout.Slot>

    <TableLayout.Slot name="body">
      {isLoading ? (
        <TombStone columnConfig={columnConfig} />
      ) : (
        <Body
          columnConfig={columnConfig}
          items={items}
          selectedItems={selectedItems}
          preEntityRows={preEntityRows}
          postEntityRows={postEntityRows}
          onRowClick={onRowClick}
          getId={getId}
        />
      )}
    </TableLayout.Slot>
  </TableLayout>
);

Table.Slot = TableLayout.Slot;
