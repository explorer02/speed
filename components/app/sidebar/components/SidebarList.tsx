// lib
import { useMemo } from 'react';

// components
import { List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

// hooks
import { useToggle } from 'hooks/useToggle';
import { useLoginInfo } from 'contexts/LoginContext';
import { useRouter } from 'next/router';
import { useAdminInfo } from 'contexts/AdminContext';

// constants
import { SidebarItem, SIDEBAR_ITEMS } from '../config';

const ListItem = ({
  item: { title, Icon, path },
  isSelected,
}: {
  item: Omit<SidebarItem, 'loginRequired'>;
  isSelected: boolean;
}): JSX.Element => {
  const { value: isOpen, set, unset } = useToggle(true);

  return (
    <Link prefetch={false} href={path}>
      <ListItemButton onClick={isOpen ? unset : set} selected={isSelected} sx={{ paddingLeft: 4 }}>
        <Icon color="primary" fontSize="small" sx={{ marginRight: 2 }} />
        <ListItemText primary={title} />
      </ListItemButton>
    </Link>
  );
};

const isItemEnabled = ({
  item,
  isLoggedIn,
  isAdmin,
}: {
  item: SidebarItem;
  isLoggedIn: boolean;
  isAdmin: boolean;
}): boolean => {
  if (!isAdmin && item.isAdminPath) return false;
  if (!isLoggedIn && item.loginRequired) return false;
  return true;
};

export const SidebarList = (): JSX.Element => {
  const { isLoggedIn } = useLoginInfo();
  const { isAdmin } = useAdminInfo();
  const { pathname } = useRouter();

  const items = useMemo(
    () => SIDEBAR_ITEMS.filter((item) => isItemEnabled({ item, isLoggedIn, isAdmin })),
    [isAdmin, isLoggedIn],
  );

  return (
    <List>
      {items.map((item) => (
        <ListItem item={item} key={item.path} isSelected={pathname === item.path} />
      ))}
    </List>
  );
};
