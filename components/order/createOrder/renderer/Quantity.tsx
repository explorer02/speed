// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IconButtonWithTooltip } from 'reusable/iconButtonWithTooltip';

// constants
import { ACTION_TYPES } from '../constants';
import { centerVertically } from 'styles/styleObjects';

// types
import { ColumnRendererProps } from 'reusable/table';
import { Item } from 'types/store';
import { OnAction } from '../types';

export const Quantity = ({
  rowIndex,
  value,
  onAction,
}: ColumnRendererProps<Item> & {
  onAction?: OnAction;
}): JSX.Element => {
  const handleMinus = React.useCallback(() => {
    onAction?.({
      type: ACTION_TYPES.DECREASE_ITEM_QUANTITY,
      payload: {
        index: rowIndex,
      },
    });
  }, [onAction, rowIndex]);

  const handlePlus = React.useCallback(() => {
    onAction?.({
      type: ACTION_TYPES.INCREASE_ITEM_QUANTITY,
      payload: {
        index: rowIndex,
      },
    });
  }, [onAction, rowIndex]);

  return (
    <Box {...centerVertically} gap={1}>
      {value}
      <IconButtonWithTooltip
        title="Decrease Quantity"
        color="primary"
        size="small"
        onClick={handleMinus}
      >
        <RemoveIcon fontSize="small" />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip
        title="Increase Quantity"
        color="primary"
        size="small"
        onClick={handlePlus}
      >
        <AddIcon fontSize="small" />
      </IconButtonWithTooltip>
    </Box>
  );
};
