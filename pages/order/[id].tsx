// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { ViewSingleOrder } from 'components/order/viewSingleOrder';

// config
import { API_CLIENT } from 'config/apollo';

// queries
import { FETCH_ONE_ORDER } from 'queries/order';

// constants
import { expandXY } from 'styles/styleObjects';

// types
import { GetServerSideProps } from 'next';
import { Order } from 'types/order';

const OrderPreview = ({ order }: { order: Order }): JSX.Element => (
  <Box {...expandXY} py={4} px={10}>
    <ViewSingleOrder order={order} />
  </Box>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const orderId = query.id;
  const { data, error } = await API_CLIENT.query<{ order: Order }>({
    query: FETCH_ONE_ORDER,
    variables: {
      query: {
        _id: orderId,
      },
    },
  });
  if (error)
    return {
      notFound: true,
    };
  return { props: { order: data.order } };
};

export default OrderPreview;
