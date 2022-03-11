// lib
import * as React from 'react';

// components
import { Chip, ChipProps } from '@mui/material';

// constants
import { ORDER_STATUS, ORDER_STATUS_LABELS } from 'constants/order';

// types
import { Order } from 'types/order';
import { ColumnRendererProps } from 'reusable/table';
import { ValueOf } from 'types/generic';

export const Status = ({ value }: ColumnRendererProps<Order>): JSX.Element => {
  const orderStatus = value as ValueOf<typeof ORDER_STATUS>;

  let color: ChipProps['color'] = 'default';
  switch (orderStatus) {
    case ORDER_STATUS.PROCESSING:
      color = 'info';
      break;
    case ORDER_STATUS.READY:
      color = 'primary';
      break;
    case ORDER_STATUS.COLLECTED:
      color = 'success';
      break;
    case ORDER_STATUS.CANCELLED:
      color = 'error';
      break;
    default:
      break;
  }

  return <Chip color={color} label={ORDER_STATUS_LABELS[orderStatus]} />;
};
