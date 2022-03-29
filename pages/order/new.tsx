// components
import { CreateOrder } from 'components/order/createOrder';
import { CommonPageLayout, SLOT_NAMES } from 'containers/CommonPageLayout';

// helpers
import { getStaticPropsForStoreList } from 'helper/staticPropsGetter';

// types
import { Store } from 'types/store';

const CreateOrderPage = ({ stores }: { stores: Store[] }): JSX.Element => (
  <CommonPageLayout title="Create Order">
    <CommonPageLayout.Slot name={SLOT_NAMES.MAIN} sx={{ padding: 2 }}>
      <CreateOrder stores={stores} />
    </CommonPageLayout.Slot>
  </CommonPageLayout>
);

export const getStaticProps = getStaticPropsForStoreList;

export default CreateOrderPage;
