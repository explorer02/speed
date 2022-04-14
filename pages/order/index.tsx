// components
import { ViewOrder } from 'components/order/viewOrder';
import Link from 'next/link';
import { Button } from '@mui/material';
import { CommonPageLayout, SLOT_NAMES } from 'containers/pageLayout/CommonPageLayout';

// constants
import { CREATE_ORDER_PATH } from 'constants/paths';

const Order = (): JSX.Element => (
  <CommonPageLayout title="My Orders">
    <CommonPageLayout.Slot name={SLOT_NAMES.ACTION} sx={{ paddingLeft: 4, paddingTop: 2 }}>
      <Link href={CREATE_ORDER_PATH}>
        <Button variant="contained">Create Order</Button>
      </Link>
    </CommonPageLayout.Slot>
    <CommonPageLayout.Slot name={SLOT_NAMES.MAIN} sx={{ paddingX: 4, paddingTop: 4 }}>
      <ViewOrder />
    </CommonPageLayout.Slot>
  </CommonPageLayout>
);

export default Order;
