// lib
import * as React from 'react';

// components
import { Box, Chip } from '@mui/material';

// types
import { Order } from 'types/order';
import { ColumnRendererProps } from 'reusable/table';
import { Item } from 'types/store';

export const Items = ({ value }: ColumnRendererProps<Order>): JSX.Element => {
  const items = value as Item[];

  return (
    <Box display="flex" gap={1} flexWrap="wrap">
      {items.map((item) => (
        <Chip key={item.id} color="info" label={item.label} />
      ))}
    </Box>
  );
};
