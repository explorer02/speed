// lib
import * as React from 'react';

// components
import {
  IconButton,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

// constants
import { centerVertically } from 'styles/styleObjects';
import { ACTION_TYPES, SORT_FIELDS } from '../constants';

// types
import { ActionState, OnAction } from '../types';

export const ActionBar = ({
  actionState,
  onAction,
}: {
  actionState: ActionState;
  onAction: OnAction;
}): JSX.Element => {
  const {
    searchInput,
    sortBy: { field, order },
  } = actionState;

  const onSortFieldChange = React.useCallback(
    (ev: SelectChangeEvent) => {
      onAction({
        type: ACTION_TYPES.SORT_FIELD_CHANGE,
        payload: {
          field: ev.target.value,
        },
      });
    },
    [onAction],
  );

  const onSortOrderChange = React.useCallback(() => {
    onAction({
      type: ACTION_TYPES.SORT_ORDER_CHANGE,
    });
  }, [onAction]);

  const onSearchInputChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onAction({
        type: ACTION_TYPES.SEARCH_INPUT_CHANGE,
        payload: {
          searchInput: ev.target.value,
        },
      });
    },
    [onAction],
  );

  return (
    <Stack direction="row" gap={8}>
      <Input value={searchInput} placeholder="Search" onChange={onSearchInputChange} />
      <Stack direction="row" gap={2}>
        <Typography {...centerVertically}>Sort By</Typography>
        <Select
          label=""
          value={field}
          variant="standard"
          sx={{ paddingX: 1, width: 150 }}
          onChange={onSortFieldChange}
        >
          {Object.entries(SORT_FIELDS).map(([key, value]) => (
            <MenuItem key={key} value={value.sortKey}>
              {value.label}
            </MenuItem>
          ))}
        </Select>
        <IconButton
          size="small"
          color={order === 'asc' ? 'primary' : 'default'}
          onClick={onSortOrderChange}
        >
          <SortIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
