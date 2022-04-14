// lib
import dayjs from 'dayjs';
import { useCallback } from 'react';

// components
import { Box, BoxProps } from '@mui/material';
import { DateTimePicker } from 'reusable/dateTimePicker';
import { AutoComplete, AutoCompleteProps } from 'reusable/autoComplete';
import { LoadingButton } from 'reusable/loadingButton';
import { MultiSelect } from 'reusable/multiSelect';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// hooks
import { useStoreList } from 'contexts/StoreListContext';

// constants
import { ORDER_STATUS_LIST } from 'constants/order';
import { ACTION_TYPES } from '../constants';

// types
import { ActionState, OnAction } from '../types';
import { Store } from 'types/store';
import { IconButtonWithTooltip } from 'reusable/iconButtonWithTooltip';

type Props = { state: ActionState; onAction: OnAction; loading: boolean } & Pick<BoxProps, 'sx'>;

const AUTOCOMPLETE_OVERRIDES = {
  Label: { component: (): null => null },
  Input: {
    props: {
      variant: 'outlined',
      label: 'Store',
    },
  },
};

export const ActionBar = ({ state, onAction, loading, sx }: Props): JSX.Element => {
  const onStartTimeChange = useCallback(
    (date: number) => {
      onAction({
        type: ACTION_TYPES.CHANGE_START_TIME,
        payload: { date },
      });
    },
    [onAction],
  );
  const onEndTimeChange = useCallback(
    (date: number) => {
      onAction({
        type: ACTION_TYPES.CHANGE_END_TIME,
        payload: { date },
      });
    },
    [onAction],
  );

  const onStoreChange = useCallback(
    (store: Store) => {
      onAction({
        type: ACTION_TYPES.CHANGE_STORE,
        payload: { store },
      });
    },
    [onAction],
  );

  const onStatusChange = useCallback(
    (value) => {
      onAction({
        type: ACTION_TYPES.CHANGE_STATUS,
        payload: { statuses: value },
      });
    },
    [onAction],
  );

  const onSubmit = useCallback(() => {
    onAction({
      type: ACTION_TYPES.SUBMIT,
    });
  }, [onAction]);

  const onReset = useCallback(() => {
    onAction({
      type: ACTION_TYPES.RESET,
    });
  }, [onAction]);

  const { storeList } = useStoreList();

  return (
    <Box display="flex" gap={4} pr={4} alignItems="center" sx={sx}>
      <AutoComplete
        options={storeList}
        selectedOptions={state.selectedStore}
        onOptionChange={onStoreChange as AutoCompleteProps<Store>['onOptionChange']}
        idKey="_id"
        labelKey="name"
        label="Select Store"
        filterSelectedOptions
        secondaryTextKey="address"
        inputWidth={250}
        overrides={AUTOCOMPLETE_OVERRIDES}
      />
      <Box display="flex" gap={2}>
        <DateTimePicker
          label="From"
          value={dayjs(state.startTime).toDate()}
          onChange={onStartTimeChange}
        />
        <DateTimePicker
          label="To"
          value={dayjs(state.endTime).toDate()}
          onChange={onEndTimeChange}
        />
      </Box>
      <MultiSelect
        id="view-order-status-picker"
        options={ORDER_STATUS_LIST}
        valueKey="id"
        labelKey="label"
        onChange={onStatusChange}
        title="Status"
        selectedValues={state.statuses}
      />
      <LoadingButton loading={loading} variant="outlined" sx={{ width: 100 }} onClick={onSubmit}>
        Submit
      </LoadingButton>
      <IconButtonWithTooltip title="Reset" color="primary" onClick={onReset}>
        <RestartAltIcon />
      </IconButtonWithTooltip>
    </Box>
  );
};
