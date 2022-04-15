// components
import { Typography } from '@mui/material';
import { AdminComponentLayout, SLOT_NAMES } from 'components/admin/container/AdminComponentLayout';
import { UpdateBaseItem } from './UpdateBaseItem';

// hooks

export const UpdateBaseItemContainer = (): JSX.Element => (
  <AdminComponentLayout>
    <AdminComponentLayout.Slot name={SLOT_NAMES.HEADER}>
      <Typography variant="body1">Update Item</Typography>
    </AdminComponentLayout.Slot>
    <AdminComponentLayout.Slot name={SLOT_NAMES.MAIN}>
      <UpdateBaseItem />
    </AdminComponentLayout.Slot>
  </AdminComponentLayout>
);
