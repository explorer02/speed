// lib
import dayjs from 'dayjs';

// components
import { OrderSummary } from '../createOrder/components/OrderSummary';
import { Status } from '../viewOrder/cellRenderer/Status';
import { Box, Typography } from '@mui/material';

// constants
import { COLUMN_CONFIG } from './tableConfig';

// types
import { Order } from 'types/order';

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

const Title = ({ order }: { order: Order }): JSX.Element => (
  <Box mb={3}>
    <Typography display="flex" variant="h6">
      <span>Order Id: </span>
      <Typography ml={2} color="secondary" variant="h6">
        #{order._id}
      </Typography>
    </Typography>
    <Typography display="flex" variant="body2" mt={2}>
      <span>Date: </span>
      <Typography ml={2} variant="body2">
        {dayjs(order.createdOn).format('ddd DD-MM-YYYY hh:mm A')}
      </Typography>
    </Typography>
  </Box>
);

export const ViewSingleOrder = ({ order }: Props): JSX.Element => (
  <OrderSummary
    items={order.items}
    store={order.store}
    columnsConfig={COLUMN_CONFIG}
    tableProps={{
      caption: <Caption order={order} />,
      title: <Title order={order} />,
    }}
  />
);
