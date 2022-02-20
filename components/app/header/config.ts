// components
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

// constants
import {
  AVAILABILITY_PATH,
  HOME_PATH,
  LOCATE_PATH,
  ORDER_PATH,
  PROFILE_PATH,
} from 'constants/paths';

export const NAV_BUTTONS = [
  {
    key: 'home',
    title: 'Home',
    loginRequired: false,
    path: HOME_PATH,
    startIcon: HomeOutlinedIcon,
  },
  {
    key: 'availability',
    title: 'Availability',
    loginRequired: false,
    path: AVAILABILITY_PATH,
    startIcon: TrendingUpOutlinedIcon,
  },
  {
    key: 'order',
    title: 'Order',
    loginRequired: true,
    path: ORDER_PATH,
    startIcon: NoteAltOutlinedIcon,
  },
  {
    key: 'profile',
    title: 'Profile',
    loginRequired: true,
    path: PROFILE_PATH,
    startIcon: AccountCircleOutlinedIcon,
  },
  {
    key: 'locate',
    title: 'Locate Us',
    loginRequired: false,
    path: LOCATE_PATH,
    startIcon: LocationOnOutlinedIcon,
  },
];
