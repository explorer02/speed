import * as React from 'react';

// components
import { Button, Typography, Box, IconButton } from '@mui/material';

// icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// hooks
import { useRouter } from 'next/dist/client/router';
import { useLoginInfo } from 'contexts/LoginContext';
import { useColorMode } from 'contexts/AppThemeProvider';

// constants
import { centerVertically, expandXY } from 'styles/styleObjects';

import {
  AVAILABILITY_PATH,
  HOME_PATH,
  LOCATE_PATH,
  ORDER_PATH,
  PROFILE_PATH,
} from 'constants/paths';

const NAV_BUTTONS = [
  {
    key: 'home',
    title: 'Home',
    loginRequired: false,
    path: HOME_PATH,
    startIcon: <HomeOutlinedIcon />,
  },
  {
    key: 'availability',
    title: 'Availability',
    loginRequired: false,
    path: AVAILABILITY_PATH,
    startIcon: <TrendingUpOutlinedIcon />,
  },
  {
    key: 'order',
    title: 'Order',
    loginRequired: true,
    path: ORDER_PATH,
    startIcon: <NoteAltOutlinedIcon />,
  },
  {
    key: 'profile',
    title: 'Profile',
    loginRequired: true,
    path: PROFILE_PATH,
    startIcon: <AccountCircleOutlinedIcon />,
  },
  {
    key: 'locate',
    title: 'Locate Us',
    loginRequired: false,
    path: LOCATE_PATH,
    startIcon: <LocationOnOutlinedIcon />,
  },
];

const Header = (): React.ReactElement => {
  const { push, pathname } = useRouter();
  const { isLoggedIn } = useLoginInfo();
  const selected = NAV_BUTTONS.find((btn) => btn.path === pathname)?.key;
  const colorMode = useColorMode();

  const ModeIcon = colorMode.mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />;

  return (
    <Box
      {...expandXY}
      borderBottom={1}
      borderColor="silver"
      {...centerVertically}
      justifyContent="space-between"
      px={4}
      id="header"
    >
      <Box display="flex" flexDirection="row">
        <StarBorderIcon color="primary" fontSize="large" />
        <Typography variant="h5" component="div" ml={1} {...centerVertically}>
          Speed
        </Typography>
      </Box>
      <Box display="flex" gap="16px">
        {NAV_BUTTONS.map((btn) => {
          const ButtonComp = (
            <Button
              key={btn.key}
              variant={btn.key === selected ? 'contained' : 'outlined'}
              startIcon={btn.startIcon}
              onClick={(): void => {
                if (btn.key !== selected) push(btn.path);
              }}
            >
              {btn.title}
            </Button>
          );
          if (btn.loginRequired) {
            return isLoggedIn ? ButtonComp : null;
          }
          return ButtonComp;
        })}
        <IconButton color="primary" onClick={colorMode.toggleColorMode}>
          {ModeIcon}
        </IconButton>
      </Box>
    </Box>
  );
};

const MemoizedHeader = React.memo(Header);
export { MemoizedHeader as Header };
