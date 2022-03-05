// lib
import * as React from 'react';

// components
import { TabPanel } from 'reusable/tabs';
import { CreateOrder } from 'components/order/createOrder';

// helpers
import { getStaticPropsForStoreList } from 'helper/staticPropsGetter';

// constants
import { TABS_LIST } from 'components/order/tabsConfig';

// types
import { Store } from 'types/store';
import { TabbedLayout } from 'reusable/tabbedLayout';
import { useRouter } from 'next/router';

const Order = ({ stores }: { stores: Store[] }): JSX.Element => {
 
  
  const { query } = useRouter();
  console.log(query);
  console.log(1);
  return (
    <TabbedLayout tabs={TABS_LIST}>
      {({ selectedTab }): JSX.Element => (
        <>
          <TabPanel value={selectedTab} index={0}>
            <CreateOrder stores={stores} />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <p>No</p>
          </TabPanel>
        </>
      )}
    </TabbedLayout>
  );
};

export default Order;

export const getStaticProps = getStaticPropsForStoreList;
