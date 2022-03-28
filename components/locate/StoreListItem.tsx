// lib
import { useCallback } from 'react';

// components
import { ListItemButton, ListItemText } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// types
import { Store } from 'types/store';

export const StoreListItem = ({
  selected,
  store,
  onClick,
}: {
  selected?: boolean;
  store: Store;
  onClick?: (_store: Store) => void;
}): JSX.Element => {
  const handleClick = useCallback(() => {
    onClick?.(store);
  }, [onClick, store]);

  return (
    <ListItemButton
      selected={selected}
      key={store._id}
      onClick={handleClick}
      sx={{ flexGrow: 0, borderRadius: 2, cursor: onClick ? 'pointer' : 'default' }}
      disableRipple={!onClick}
    >
      <StorefrontIcon fontSize="small" color="action" />
      <ListItemText
        sx={{ maxWidth: 300, marginX: 3 }}
        primaryTypographyProps={{ variant: 'body2' }}
        secondaryTypographyProps={{ variant: 'caption' }}
        primary={store.name}
        secondary={store.address}
      />
      <OpenInNewIcon
        color="action"
        fontSize="small"
        onClick={(): void => {
          window.open(
            `https://maps.google.com/?q=${store.location.lat},${store.location.lng}`,
            '_blank',
          );
        }}
      />
    </ListItemButton>
  );
};
