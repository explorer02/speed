// lib
import * as React from 'react';

// components
import { Box, Stack } from '@mui/material';
import { Tab, Tabs } from 'reusable/tabs';

// constants
import { expandXY } from 'styles/styleObjects';
import { useRouter } from 'next/router';

type Props = {
  children: (props: { selectedTab: number }) => JSX.Element;
  tabs: Tab[];
};

export const TabbedLayout = ({ children, tabs }: Props): JSX.Element => {
  const { query, push, pathname } = useRouter();

  const tabId = Number(query.tabId ?? 0);
  const [selectedTab, setSelectedTab] = React.useState(tabId);

  const onTabChange = React.useCallback(
    (newTabId: number) => {
      push(pathname, { query: { ...query, tabId: newTabId } }).then(() => setSelectedTab(newTabId));
    },
    [pathname, push, query],
  );

  React.useEffect(() => {
    const tab = Number(query.tabId);

    if (!Number.isNaN(tab) && tab !== selectedTab) {
      onTabChange(tab);
    }
  }, [onTabChange, query.tabId, selectedTab]);

  return (
    <Stack {...expandXY} gap={4}>
      <Tabs tabList={tabs} selectedTab={selectedTab} onTabChange={onTabChange} />
      <Box px={4} py={2}>
        {children({ selectedTab })}
      </Box>
    </Stack>
  );
};
