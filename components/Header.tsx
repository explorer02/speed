import * as React from 'react';

// components
import { Button, Typography, Box } from '@mui/material';

// icons
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

// helper
import { isBrowserMode } from 'helper/localStorage';

// hooks
import { useRouter } from 'next/dist/client/router';

// constants
import { centerVertically } from 'utils/commonProps';
import {
  AVAILABILITY_PATH,
  HOME_PATH,
  LOCATE_PATH,
  ORDER_PATH,
  PROFILE_PATH,
} from 'constants/paths';

// types
import { StringAnyMap } from 'types/generic';
import { PhoneContext } from 'contexts/UserContext';

const NAV_BUTTONS = [
  {
    key: 'home',
    title: 'Home',
    loginRequired: false,
    path: HOME_PATH,
    hideAfterLogin: true,
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

export const Header = ({ containerStyles }: { containerStyles?: StringAnyMap }) => {
  const { push, pathname } = useRouter();
  const isLoggedIn = !!React.useContext(PhoneContext).phone;

  const selected = NAV_BUTTONS.find((btn) => btn.path === pathname)?.key;

  return (
    <Box
      {...containerStyles}
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
              onClick={() => {
                push(btn.path);
              }}
            >
              {btn.title}
            </Button>
          );
          // TODO: find a better solution
          if (!isBrowserMode()) return null;
          if (isLoggedIn) {
            return btn.hideAfterLogin ? null : ButtonComp;
          }
          return btn.loginRequired ? null : ButtonComp;
        })}
      </Box>
    </Box>
  );
};
