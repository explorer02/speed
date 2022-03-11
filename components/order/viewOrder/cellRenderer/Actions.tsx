// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RepeatIcon from '@mui/icons-material/Repeat';

// types
import { Order } from 'types/order';
import { ColumnRendererProps } from 'reusable/table';
import { IconButtonWithTooltip } from 'reusable/iconButtonWithTooltip';
import { ORDER_STATUS } from 'constants/order';
import { ACTION_TYPES } from '../hooks/constants';
import { OnAction } from '../hooks/types';
import { ValueOf } from 'types/generic';

export const Actions = ({
  entity: order,
  onAction,
}: ColumnRendererProps<Order> & { onAction: OnAction }): JSX.Element => {
  const onClick = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      const actionType = ev.currentTarget.dataset.id;
      onAction({ type: actionType as ValueOf<typeof ACTION_TYPES>, payload: { order } });
    },
    [onAction, order],
  );

  return (
    <Box display="flex" gap={1}>
      <IconButtonWithTooltip
        title="Cancel Order"
        color="primary"
        disabled={
          order.status === ORDER_STATUS.CANCELLED || order.status === ORDER_STATUS.COLLECTED
        }
        data-id={ACTION_TYPES.CANCEL_ORDER}
        onClick={onClick}
      >
        <CancelIcon />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip
        title="View Receipt"
        color="info"
        data-id={ACTION_TYPES.VIEW_RECEIPT}
        onClick={onClick}
      >
        <ReceiptLongIcon />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip
        title="Repeat Order"
        color="warning"
        data-id={ACTION_TYPES.REPEAT_ORDER}
        onClick={onClick}
      >
        <RepeatIcon />
      </IconButtonWithTooltip>
    </Box>
  );
};
