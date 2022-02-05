// lib
import * as React from 'react';

// components
import { Box } from '@mui/material';
import { TabPanel, Tabs } from 'reusable/tabs';

// constants
import { TABS_LIST } from 'components/order/tabsConfig';
import { expandXY } from 'styles/styleObjects';

// types
import { NextPage } from 'next';
import { CreateOrderForm } from 'components/order/createOrder';

const Order: NextPage = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <Box {...expandXY}>
      <Tabs tabList={TABS_LIST} selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <Box padding={4}>
        <TabPanel value={selectedTab} index={0}>
          <CreateOrderForm />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <p>No</p>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Order;
