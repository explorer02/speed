// lib
import { useMemo, useCallback, Suspense, memo, useState } from 'react';

// components
import { Box, IconButton, Typography } from '@mui/material';
import { AdminComponentLayout, SLOT_NAMES } from 'components/admin/container/AdminComponentLayout';
import { useStoreList } from 'contexts/StoreListContext';
import { useViewOrder } from './useViewOrder';
import { AutoComplete, AutoCompleteProps } from 'reusable/autoComplete';
import { useLocalStorage } from 'react-use';
import { Store } from 'types/store';
import { DateTimePicker } from 'reusable/dateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { IconButtonWithTooltip } from 'reusable/iconButtonWithTooltip';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { LoadingButton } from 'reusable/loadingButton';
import { ActionBar } from './ActionBar';
// hooks

// helpers

// constants

// types

type Props = { abc: string };

export const ViewOrder = (): JSX.Element => {
  const { onAction, actionState } = useViewOrder();

  return (
    <AdminComponentLayout>
      <AdminComponentLayout.Slot name={SLOT_NAMES.HEADER}>
        <Typography variant="body1">View Order</Typography>
      </AdminComponentLayout.Slot>
      <AdminComponentLayout.Slot name={SLOT_NAMES.MAIN}>
        <ActionBar onAction={onAction} state={actionState} />
      </AdminComponentLayout.Slot>
    </AdminComponentLayout>
  );
};
