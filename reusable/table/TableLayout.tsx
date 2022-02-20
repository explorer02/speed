// lib
import * as React from 'react';

// components
import { Paper, Stack, TableContainer, Table as BaseTable, StackProps } from '@mui/material';

// constants
import { expandXY } from 'styles/styleObjects';

// types
import { ValueOf } from 'types/generic';

const SLOT_NAMES = {
  TITLE: 'title',
  CAPTION: 'caption',
  ACTION_BAR: 'action_bar',
  COLUMN_GROUP: 'column_group',
  HEADER: 'header',
  BODY: 'body',
} as const;

export const TableLayout = ({
  children,
  sx,
}: {
  children?: React.ReactNode;
  sx?: StackProps['sx'];
}): JSX.Element => {
  const childrenArr = React.Children.toArray(children) as JSX.Element[];
  const titleSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.TITLE);
  const captionSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.CAPTION);
  const actionBarSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.ACTION_BAR);
  const columnGroupSlot = childrenArr.find(
    (child) => child?.props?.name === SLOT_NAMES.COLUMN_GROUP,
  );
  const headerSlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.HEADER);
  const bodySlot = childrenArr.find((child) => child?.props?.name === SLOT_NAMES.BODY);

  return (
    <Stack gap={4} {...expandXY} sx={sx}>
      {titleSlot?.props?.children}
      {captionSlot?.props?.children}
      {actionBarSlot?.props?.children}

      <TableContainer component={Paper}>
        <BaseTable stickyHeader sx={{ width: '100%' }}>
          {columnGroupSlot?.props?.children}
          {headerSlot?.props?.children}
          {bodySlot?.props?.children}
        </BaseTable>
      </TableContainer>
    </Stack>
  );
};

type SlotType = (props: { name: ValueOf<typeof SLOT_NAMES>; children?: JSX.Element }) => null;

const Slot: SlotType = ((): null => null) as SlotType;

TableLayout.Slot = Slot;
