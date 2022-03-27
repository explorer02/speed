// lib
import * as React from 'react';

// components
import { ViewOrder } from 'components/order/viewOrder';

// types
import { CommonPageLayout, SLOT_NAMES } from 'containers/CommonPageLayout';

const Order = (): JSX.Element => (
  <CommonPageLayout title="My Orders">
    <CommonPageLayout.Slot name={SLOT_NAMES.MAIN} sx={{ paddingX: 4, paddingTop: 8 }}>
      <ViewOrder />
    </CommonPageLayout.Slot>
  </CommonPageLayout>
);

export default Order;
