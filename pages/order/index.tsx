// lib
import * as React from 'react';

// components
import { TabPanel } from 'reusable/tabs';
import { CreateOrder } from 'components/order/createOrder';
import { ViewOrder } from 'components/order/viewOrder';

// helpers
import { getStaticPropsForStoreList } from 'helper/staticPropsGetter';

// constants
import { TABS_LIST } from 'components/order/tabsConfig';

// types
import { Store } from 'types/store';
import { TabbedLayout } from 'reusable/tabbedLayout';

const Order = ({ stores }: { stores: Store[] }): JSX.Element => (
  <TabbedLayout tabs={TABS_LIST}>
    {({ selectedTab }): JSX.Element => (
      <>
        <TabPanel value={selectedTab} index={0}>
          <CreateOrder stores={stores} />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <ViewOrder />
        </TabPanel>
      </>
    )}
  </TabbedLayout>
);

export default Order;

export const getStaticProps = getStaticPropsForStoreList;
