// components
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// constants
import {
  AVAILABILITY_PATH,
  HOME_PATH,
  LOCATE_PATH,
  ORDER_PATH,
  PROFILE_PATH,
  ADMIN_PATH,
} from 'constants/paths';

// types
import { SvgIconComponent } from '@mui/icons-material';

export type SidebarItem = {
  title: string;
  loginRequired: boolean;
  path: string;
  Icon: SvgIconComponent;
  isAdminPath?: boolean;
};

const HOME: SidebarItem = {
  title: 'Home',
  loginRequired: false,
  path: HOME_PATH,
  Icon: HomeOutlinedIcon,
};
const AVAILABILITY: SidebarItem = {
  title: 'Availability',
  loginRequired: true,
  path: AVAILABILITY_PATH,
  Icon: TrendingUpOutlinedIcon,
};

const ORDER: SidebarItem = {
  title: 'Order',
  loginRequired: true,
  path: ORDER_PATH,
  Icon: NoteAltOutlinedIcon,
};

const PROFILE: SidebarItem = {
  title: 'Profile',
  loginRequired: true,
  path: PROFILE_PATH,
  Icon: AccountCircleOutlinedIcon,
};

const LOCATE: SidebarItem = {
  title: 'Locate Us',
  loginRequired: false,
  path: LOCATE_PATH,
  Icon: LocationOnOutlinedIcon,
};

const ADMIN: SidebarItem = {
  title: 'Admin',
  loginRequired: true,
  path: ADMIN_PATH,
  Icon: AdminPanelSettingsIcon,
  isAdminPath: true,
};

export const SIDEBAR_ITEMS = [HOME, AVAILABILITY, ORDER, PROFILE, LOCATE, ADMIN];
