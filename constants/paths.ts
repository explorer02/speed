// types
import { StringStringMap } from 'types/generic';

export const HOME_PATH = '/';
export const AVAILABILITY_PATH = '/availability';
export const ORDER_PATH = '/order';
export const CREATE_ORDER_PATH = '/order/new';
export const PROFILE_PATH = '/profile';
export const LOCATE_PATH = '/locate';

export const PROTECTED_PATHS = [HOME_PATH, PROFILE_PATH, ORDER_PATH, AVAILABILITY_PATH];
export const UNPROTECTED_PATHS = [HOME_PATH, LOCATE_PATH];

export const PAGE_TITLE = {
  [HOME_PATH]: 'Home',
  [AVAILABILITY_PATH]: 'Availability',
  [PROFILE_PATH]: 'My Profile',
  [ORDER_PATH]: 'Order',
  [LOCATE_PATH]: 'Locate Us',
} as StringStringMap;
