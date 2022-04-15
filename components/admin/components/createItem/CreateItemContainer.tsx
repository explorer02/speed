// components
import { Typography } from '@mui/material';
import { AdminComponentLayout, SLOT_NAMES } from 'components/admin/container/AdminComponentLayout';
import { CreateItem } from './CreateItem';

// hooks

export const CreateItemContainer = (): JSX.Element => (
  <AdminComponentLayout>
    <AdminComponentLayout.Slot name={SLOT_NAMES.HEADER}>
      <Typography variant="body1">Create Item</Typography>
    </AdminComponentLayout.Slot>
    <AdminComponentLayout.Slot name={SLOT_NAMES.MAIN}>
      <CreateItem />
    </AdminComponentLayout.Slot>
  </AdminComponentLayout>
);
