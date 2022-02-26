// lib
import * as React from 'react';

// components
import { Tab, Tabs as BaseTabs } from '@mui/material';

// types
import { Tab as TabType } from './types';

type Props = {
  tabList: TabType[];
  selectedTab: number;
  onTabChange: (tab: number) => void;
};

export const Tabs = ({ tabList, selectedTab, onTabChange }: Props): JSX.Element => {
  const handleChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      onTabChange(newValue);
    },
    [onTabChange],
  );

  return (
    <BaseTabs
      value={selectedTab}
      onChange={handleChange}
      centered
      variant="standard"
      sx={{ flexShrink: 0 }}
    >
      {tabList.map(({ id, label, Icon }) => (
        <Tab
          icon={Icon ? <Icon /> : undefined}
          key={id}
          label={label}
          sx={{
            '.MuiSvgIcon-root': {
              marginBottom: '15px',
            },
          }}
        />
      ))}
    </BaseTabs>
  );
};
