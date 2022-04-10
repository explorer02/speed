// components
import { Typography } from '@mui/material';
import { AdminComponentLayout, SLOT_NAMES } from 'components/admin/container/AdminComponentLayout';
import { ActionBar } from './components/ActionBar';
import { OrderTable } from './components/orderTable';

// hooks
import { useViewOrder } from './hooks/useViewOrder';

export const ViewOrder = (): JSX.Element => {
  const { onAction, actionState, orders, loading } = useViewOrder();

  return (
    <AdminComponentLayout>
      <AdminComponentLayout.Slot name={SLOT_NAMES.HEADER}>
        <Typography variant="body1">View Order</Typography>
      </AdminComponentLayout.Slot>
      <AdminComponentLayout.Slot name={SLOT_NAMES.MAIN}>
        <ActionBar onAction={onAction} state={actionState} loading={loading} sx={{ mb: 6 }} />
        <OrderTable orders={orders} loading={loading} onAction={onAction} />
      </AdminComponentLayout.Slot>
    </AdminComponentLayout>
  );
};
