// lib
import * as React from 'react';
// components
import { TabPanel } from 'reusable/tabs';
import { CreateOrder } from 'components/order/createOrder';
import { ViewOrder } from 'components/order/viewOrder';

// constants
import { TABS_LIST } from 'components/order/tabsConfig';

// types
import { Store } from 'types/store';
import { TabbedLayout } from 'reusable/tabbedLayout';
import { GetServerSideProps } from 'next';

const OrderPreview = (): JSX.Element => <h1>yo</h1>;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const orderId = query.id;
  const phone = query.phone;

  return { props: {} };
};

export default OrderPreview;
