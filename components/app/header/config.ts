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
import { SvgIconComponent } from '@mui/icons-material';
import { Breakpoint } from '@mui/system';
import { KeyTMap } from 'types/generic';

type NavItem = {
  key: string;
  title: string;
  loginRequired: boolean;
  path: string;
  startIcon: SvgIconComponent;
};

const HOME: NavItem = {
  key: 'home',
  title: 'Home',
  loginRequired: false,
  path: HOME_PATH,
  startIcon: HomeOutlinedIcon,
};
const AVAILABILITY = {
  key: 'availability',
  title: 'Availability',
  loginRequired: true,
  path: AVAILABILITY_PATH,
  startIcon: TrendingUpOutlinedIcon,
};

const ORDER = {
  key: 'order',
  title: 'Order',
  loginRequired: true,
  path: ORDER_PATH,
  startIcon: NoteAltOutlinedIcon,
};

const PROFILE = {
  key: 'profile',
  title: 'Profile',
  loginRequired: true,
  path: PROFILE_PATH,
  startIcon: AccountCircleOutlinedIcon,
};
const LOCATE = {
  key: 'locate',
  title: 'Locate Us',
  loginRequired: false,
  path: LOCATE_PATH,
  startIcon: LocationOnOutlinedIcon,
};

export const NAV_BUTTONS: NavItem[] = [HOME, AVAILABILITY, ORDER, PROFILE, LOCATE];

export const NAV_CONFIG: KeyTMap<Breakpoint, { list: NavItem[]; menu: NavItem[] }> = {
  xs: {
    list: [],
    menu: [HOME, AVAILABILITY, ORDER, PROFILE, LOCATE],
  },
  sm: {
    list: [HOME, AVAILABILITY, ORDER, PROFILE, LOCATE],
    menu: [],
  },
  md: {
    list: [HOME, AVAILABILITY, ORDER, PROFILE, LOCATE],
    menu: [],
  },
  lg: {
    list: [HOME, AVAILABILITY, ORDER, PROFILE, LOCATE],
    menu: [],
  },
  xl: {
    list: [HOME, AVAILABILITY, ORDER, PROFILE, LOCATE],
    menu: [],
  },
};
