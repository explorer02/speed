// components
import { Typography } from '@mui/material';
import { AdminComponentLayout, SLOT_NAMES } from 'components/admin/container/AdminComponentLayout';
import { CreateBaseItem } from './CreateBaseItem';

export const CreateBaseItemContainer = (): JSX.Element => (
  <AdminComponentLayout>
    <AdminComponentLayout.Slot name={SLOT_NAMES.HEADER}>
      <Typography variant="body1">Create Base Item</Typography>
    </AdminComponentLayout.Slot>
    <AdminComponentLayout.Slot name={SLOT_NAMES.MAIN}>
      <CreateBaseItem />
    </AdminComponentLayout.Slot>
  </AdminComponentLayout>
);
