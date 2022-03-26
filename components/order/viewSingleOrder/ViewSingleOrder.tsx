// components
import { OrderSummary } from '../createOrder/components/OrderSummary';
import { Status } from '../viewOrder/cellRenderer/Status';

// constants
import { COLUMN_CONFIG } from './tableConfig';

// types
import { Order } from 'types/order';
import { Box } from '@mui/material';

type Props = { order: Order };

const Caption = ({ order }: { order: Order }): JSX.Element => (
  <Box width="100%" display="flex" justifyContent="space-between">
    <Box>{order.store.name}</Box>
    <Box>
      <span style={{ marginRight: 20 }}>Status:</span>
      <Status value={order.status} rowIndex={0} entity={order} />
    </Box>
  </Box>
);

export const ViewSingleOrder = ({ order }: Props): JSX.Element => (
  <OrderSummary
    items={order.items}
    store={order.store}
    columnsConfig={COLUMN_CONFIG}
    tableProps={{
      caption: <Caption order={order} />,
    }}
  />
);
