// lib
import { memo } from 'react';

// components
import { Box, Drawer, NoSsr } from '@mui/material';
import { SIDEBAR_WIDTH } from 'containers/pageLayout/constants';
import { SidebarList } from './components/SidebarList';
import { Hero } from './components/Hero';
import { Login } from './components/Login';

const Sidebar = (): JSX.Element => (
  <Drawer
    sx={{
      width: SIDEBAR_WIDTH,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: SIDEBAR_WIDTH,
        boxSizing: 'border-box',
      },
    }}
    variant="permanent"
    anchor="left"
  >
    <Box pt={4}>
      <Hero sx={{ marginBottom: 3, marginLeft: 4 }} />
      <NoSsr>
        <SidebarList />
      </NoSsr>
      <NoSsr>
        <Login sx={{ marginTop: 3, marginLeft: 4 }} />
      </NoSsr>
    </Box>
  </Drawer>
);

const MemoizedSidebar = memo(Sidebar);
MemoizedSidebar.displayName = 'Sidebar';

export { MemoizedSidebar as Sidebar };
