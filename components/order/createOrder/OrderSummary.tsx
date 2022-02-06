// lib
import * as React from 'react';

// components
import {
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// helpers
import { priceFormatter } from 'helper/formatter';

// constants
import { centerHorizontally, expandXY } from 'styles/styleObjects';
import { columnsConfig } from './summaryTableConfig';

// types
import { Item, Store } from 'types/store';
import { StringAnyMap } from 'types/generic';

type Props = {
  store: Store;
  items: Item[];
};

export const OrderSummary = ({ store, items }: Props): JSX.Element => {
  const totalAmount = priceFormatter(100);
  return (
    <Stack gap={4} {...expandXY}>
      <Typography {...centerHorizontally} variant="h5">
        Order Summary
      </Typography>
      <Stack>
        <Typography variant="body1">{store.name}</Typography>
        <Typography variant="body2">{store.address}</Typography>
      </Stack>

      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ width: '100%', overflow: 'hidden' }}>
          <TableHead>
            <TableRow>
              {columnsConfig.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                {columnsConfig.map((column) => (
                  <TableCell key={`${item.id}${column.id}`}>
                    {column.valueGetter?.(item) ?? (item as StringAnyMap)[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>{totalAmount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
