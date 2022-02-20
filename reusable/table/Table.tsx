// lib
import * as React from 'react';

// componnents
import {
  Paper,
  Stack,
  TableContainer,
  TableHead,
  Typography,
  Table as BaseTable,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

// constanta
import { centerHorizontally, expandXY } from 'styles/styleObjects';

// types
import { StringAnyMap } from 'types/generic';
import { ColumnsConfig } from './Config';

type BaseEntityType = { id: string } & StringAnyMap;

type Props<T extends BaseEntityType> = {
  title?: string;
  caption?: string;
  subCaption?: string;
  columnConfig: ColumnsConfig<T>;
  items: T[];
  preEntityRows?: JSX.Element;
  postEntityRows?: JSX.Element;
};

const Title = <T extends BaseEntityType>({ title }: Pick<Props<T>, 'title'>): JSX.Element | null =>
  title ? (
    <Typography {...centerHorizontally} variant="h5">
      {title}
    </Typography>
  ) : null;

const Caption = <T extends BaseEntityType>({
  caption,
  subCaption,
}: Pick<Props<T>, 'caption' | 'subCaption'>): JSX.Element | null =>
  caption || subCaption ? (
    <Stack>
      {caption ? <Typography variant="body1">{caption}</Typography> : null}
      {subCaption ? <Typography variant="body2">{subCaption}</Typography> : null}
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
        <col width={`${(column.fluidWidth / totalFluidWidth) * 100}%`} />
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
}: Pick<Props<T>, 'columnConfig' | 'items' | 'preEntityRows' | 'postEntityRows'>): JSX.Element => (
  <TableBody>
    {preEntityRows}
    {items.map((item, rowIndex) => (
      <TableRow key={item.id}>
        {columnConfig.map((column) => {
          const { renderer: Renderer, rendererProps } = column;
          const value = column.valueGetter?.(item) ?? item[column.id];
          return (
            <TableCell key={`${item.id}${column.id}`}>
              {Renderer ? (
                <Renderer
                  key={`${item.id}${column.id}`}
                  rowIndex={rowIndex}
                  entity={item}
                  value={value}
                  {...rendererProps}
                />
              ) : (
                value
              )}
            </TableCell>
          );
        })}
      </TableRow>
    ))}
    {postEntityRows}
  </TableBody>
);

export const Table = <T extends BaseEntityType>({
  title,
  caption,
  subCaption,
  columnConfig,
  items,
  preEntityRows,
  postEntityRows,
}: Props<T>): JSX.Element => (
  <Stack gap={4} {...expandXY}>
    <Title title={title} />
    <Caption caption={caption} subCaption={subCaption} />

    <TableContainer component={Paper}>
      <BaseTable stickyHeader sx={{ width: '100%', overflow: 'hidden' }}>
        <ColumnGroup columnConfig={columnConfig} />
        <Header columnConfig={columnConfig} />
        <Body
          columnConfig={columnConfig}
          items={items}
          preEntityRows={preEntityRows}
          postEntityRows={postEntityRows}
        />
      </BaseTable>
    </TableContainer>
  </Stack>
);
