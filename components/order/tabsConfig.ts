// icons
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// types
import { Tab } from 'reusable/tabs';

export const TAB = {
  NEW_ORDER: 'new_order',
  MY_ORDERS: 'my_orders',
};

export const TABS_LIST: Tab[] = [
  {
    id: TAB.NEW_ORDER,
    label: 'New Order',
    Icon: BorderColorIcon as unknown as () => JSX.Element,
  },
  {
    id: TAB.MY_ORDERS,
    label: 'My Orders',
    Icon: MenuBookIcon as unknown as () => JSX.Element,
  },
];
