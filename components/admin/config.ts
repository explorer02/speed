import { KeyTMap, ValueOf } from 'types/generic';
import { ViewOrder } from './components/viewOrder';

export const ADMIN_ITEM_ID_MAP = {
  UPDATE_ITEMS: 'UPDATE_ITEMS',
  UPDATE_BASE_ITEMS: 'UPDATE_BASE_ITEMS',
  CREATE_ITEM: 'CREATE_ITEM',
  CREATE_OFFLINE_ORDER: 'CREATE_OFFLINE_ORDER',
  UPDATE_ORDERS: 'UPDATE_ORDERS',
  VIEW_ORDERS: 'VIEW_ORDERS',
  CREATE_STORE: 'CREATE_STORE',
  UPDATE_STORE: 'UPDATE_STORE',
  VIEW_PROFILE: 'VIEW_PROFILE',
} as const;

export type AdminItem = {
  label: string;
  Component?: () => JSX.Element;
  id: ValueOf<typeof ADMIN_ITEM_ID_MAP>;
};

export type AdminCategory = {
  category: string;
  items: AdminItem[];
};

export const ADMIN_ITEMS_MAP: KeyTMap<ValueOf<typeof ADMIN_ITEM_ID_MAP>, AdminItem> = {
  [ADMIN_ITEM_ID_MAP.UPDATE_ITEMS]: {
    id: ADMIN_ITEM_ID_MAP.UPDATE_ITEMS,
    label: 'Update Items',
  },
  [ADMIN_ITEM_ID_MAP.UPDATE_BASE_ITEMS]: {
    id: ADMIN_ITEM_ID_MAP.UPDATE_BASE_ITEMS,
    label: 'Update Base Items',
  },
  [ADMIN_ITEM_ID_MAP.CREATE_ITEM]: {
    id: ADMIN_ITEM_ID_MAP.CREATE_ITEM,
    label: 'Create Item',
  },
  [ADMIN_ITEM_ID_MAP.CREATE_OFFLINE_ORDER]: {
    id: ADMIN_ITEM_ID_MAP.CREATE_OFFLINE_ORDER,
    label: 'Create Offline Order',
  },
  [ADMIN_ITEM_ID_MAP.UPDATE_ORDERS]: {
    id: ADMIN_ITEM_ID_MAP.UPDATE_ORDERS,
    label: 'Update Orders',
  },
  [ADMIN_ITEM_ID_MAP.VIEW_ORDERS]: {
    id: ADMIN_ITEM_ID_MAP.VIEW_ORDERS,
    label: 'View Orders',
    Component: ViewOrder,
  },
  [ADMIN_ITEM_ID_MAP.CREATE_STORE]: {
    id: ADMIN_ITEM_ID_MAP.CREATE_STORE,
    label: 'Create Store',
  },
  [ADMIN_ITEM_ID_MAP.UPDATE_STORE]: {
    id: ADMIN_ITEM_ID_MAP.UPDATE_STORE,
    label: 'Update Store',
  },
  [ADMIN_ITEM_ID_MAP.VIEW_PROFILE]: {
    id: ADMIN_ITEM_ID_MAP.VIEW_PROFILE,
    label: 'View Profile',
  },
};

export const ADMIN_ITEMS: AdminCategory[] = [
  {
    category: 'Items',
    items: [
      ADMIN_ITEMS_MAP.UPDATE_ITEMS,
      ADMIN_ITEMS_MAP.UPDATE_BASE_ITEMS,
      ADMIN_ITEMS_MAP.CREATE_ITEM,
    ],
  },
  {
    category: 'Order',
    items: [
      ADMIN_ITEMS_MAP.CREATE_OFFLINE_ORDER,
      ADMIN_ITEMS_MAP.UPDATE_ORDERS,
      ADMIN_ITEMS_MAP.VIEW_ORDERS,
    ],
  },
  {
    category: 'Store',
    items: [ADMIN_ITEMS_MAP.CREATE_STORE, ADMIN_ITEMS_MAP.UPDATE_STORE],
  },
  {
    category: 'User',
    items: [ADMIN_ITEMS_MAP.VIEW_PROFILE],
  },
];
