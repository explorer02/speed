// lib
import * as React from 'react';

// components
import { Box, Stack } from '@mui/material';
import { TabPanel, Tabs } from 'reusable/tabs';
import { CreateOrder } from 'components/order/createOrder';

// helpers
import { getStaticPropsForStoreList } from 'helper/staticPropsGetter';

// constants
import { TABS_LIST } from 'components/order/tabsConfig';
import { expandXY } from 'styles/styleObjects';

// types
import { Store } from 'types/store';

const Order = ({ stores }: { stores: Store[] }): JSX.Element => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <Stack {...expandXY} gap={4}>
      <Tabs tabList={TABS_LIST} selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <Box px={4} py={2}>
        <TabPanel value={selectedTab} index={0}>
          <CreateOrder stores={stores} />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <p>No</p>
        </TabPanel>
      </Box>
    </Stack>
  );
};

export default Order;

export const getStaticProps = getStaticPropsForStoreList;
