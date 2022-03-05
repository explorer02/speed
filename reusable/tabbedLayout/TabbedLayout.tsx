// lib
import * as React from 'react';

// components
import { Box, Stack } from '@mui/material';
import { Tab, Tabs } from 'reusable/tabs';

// constants
import { expandXY } from 'styles/styleObjects';

type Props = {
  children: (props: { selectedTab: number }) => JSX.Element;
  tabs: Tab[];
};

export const TabbedLayout = ({ children, tabs }: Props): JSX.Element => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  return (
    <Stack {...expandXY} gap={4}>
      <Tabs tabList={tabs} selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <Box px={4} py={2}>
        {children({ selectedTab })}
      </Box>
    </Stack>
  );
};
