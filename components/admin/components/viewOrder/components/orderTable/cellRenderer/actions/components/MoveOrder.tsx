// lib
import { useCallback, useRef } from 'react';

// components
import { Status } from 'reusable/cellRenderers/Status';
import { Box, IconButton, Popover } from '@mui/material';
import MoveUpIcon from '@mui/icons-material/MoveUp';

// hooks
import { useToggle } from 'hooks/useToggle';

// constants
import { ORDER_STATUS, ORDER_STATUS_LIST } from 'constants/order';
import { ACTION_TYPES } from '../constants';

// types
import { Order } from 'types/order';
import { OnAction } from '../types';
import { ValueOf } from 'types/generic';

const ORDER_STATUS_LIST_MOD = ORDER_STATUS_LIST.filter(({ id }) => id !== ORDER_STATUS.CANCELLED);

type Props = { order: Order; onAction: OnAction };

export const MoveOrder = ({ order, onAction }: Props): JSX.Element => {
  const ref = useRef<HTMLAnchorElement>(null);

  const { value: open, set, unset } = useToggle(false);

  const onMoveOrder = useCallback(
    (status: ValueOf<typeof ORDER_STATUS>) => {
      onAction({
        type: ACTION_TYPES.MOVE_ORDER,
        payload: {
          status,
        },
      });
      unset();
    },
    [onAction, unset],
  );

  return (
    <>
      <IconButton
        color="primary"
        disabled={order.status === ORDER_STATUS.CANCELLED}
        onClick={set}
        // FIXME: type
        ref={ref as any}
      >
        <MoveUpIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={ref.current as any}
        onClose={unset}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          {ORDER_STATUS_LIST_MOD.map(({ id }) => (
            <Status
              rowIndex={0}
              entity={order}
              value={id}
              disabled={id === order._id}
              onClick={id === order._id ? undefined : (): void => onMoveOrder(id)}
            />
          ))}
        </Box>
      </Popover>
    </>
  );
};
