type AdminItem = {
  category: string;
  items: {
    path: string;
    label: string;
  }[];
};

type AdminItems = AdminItem[];

export const ADMIN_ITEMS: AdminItems = [
  {
    category: 'Items',
    items: [
      {
        label: 'Update Items',
        path: '',
      },
      {
        label: 'Update Base Item',
        path: '',
      },
      {
        label: 'Create Item',
        path: '',
      },
    ],
  },
  {
    category: 'Order',
    items: [
      {
        label: 'View Order',
        path: '',
      },
      {
        label: 'Update Orders',
        path: '',
      },
    ],
  },
  {
    category: 'Store',
    items: [
      {
        label: 'Create Store',
        path: '',
      },
      {
        label: 'Update Store',
        path: '',
      },
    ],
  },
  {
    category: 'User',
    items: [
      {
        label: 'View Profile',
        path: '',
      },
    ],
  },
];
