// lib
import { useMemo } from 'react';

// components
import { List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

// hooks
import { useToggle } from 'hooks/useToggle';
import { useLoginInfo } from 'contexts/LoginContext';
import { useRouter } from 'next/router';

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

export const SidebarList = (): JSX.Element => {
  const { isLoggedIn } = useLoginInfo();
  const { pathname } = useRouter();

  const items = useMemo(
    () => SIDEBAR_ITEMS.filter((item) => (isLoggedIn && item.loginRequired) || !item.loginRequired),
    [isLoggedIn],
  );

  return (
    <List>
      {items.map((item) => (
        <ListItem item={item} key={item.path} isSelected={pathname === item.path} />
      ))}
    </List>
  );
};
