// types
import { StringStringMap } from 'types/generic';

export const HOME_PATH = '/';
export const AVAILABILITY_PATH = '/availability';
export const ORDER_PATH = '/order';
export const PROFILE_PATH = '/profile';
export const LOCATE_PATH = '/locate';

export const PROTECTED_PATHS = [HOME_PATH, PROFILE_PATH, ORDER_PATH];

export const PAGE_TITLE = {
  [HOME_PATH]: 'Home',
  [AVAILABILITY_PATH]: 'Availability',
  [PROFILE_PATH]: 'My Profile',
  [ORDER_PATH]: 'Order',
  [LOCATE_PATH]: 'Locate Us',
} as StringStringMap;
