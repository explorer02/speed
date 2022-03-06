// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButtonWithTooltip } from 'reusable/iconButtonWithTooltip';

// constants
import { ACTION_TYPES } from '../../hooks/constants';
import { centerVertically } from 'styles/styleObjects';

// types
import { ColumnRendererProps } from 'reusable/table';
import { Item } from 'types/store';
import { OnAction } from '../../hooks/types';

export const TotalPrice = ({
  value,
  onAction,
  entity: item,
}: ColumnRendererProps<Item> & {
  onAction?: OnAction;
}): JSX.Element => {
  const handleRemove = React.useCallback(() => {
    onAction?.({
      type: ACTION_TYPES.REMOVE_ITEM,
      payload: {
        item,
      },
    });
  }, [item, onAction]);
  return (
    <Box {...centerVertically} gap={1}>
      {value}
      <IconButtonWithTooltip
        title="Remove Item"
        color="primary"
        sx={{ marginLeft: '16px' }}
        onClick={handleRemove}
        size="small"
      >
        <RemoveCircleOutlineIcon fontSize="small" />
      </IconButtonWithTooltip>
    </Box>
  );
};
