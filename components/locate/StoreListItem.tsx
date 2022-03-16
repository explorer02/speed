// lib
import * as React from 'react';

// components
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// types
import { Store } from 'types/store';

export const StoreListItem = ({
  selected,
  store,
  onClick,
  showOpenInNewTab = true,
}: {
  selected?: boolean;
  store: Store;
  onClick?: (_store: Store) => void;
  showOpenInNewTab?: boolean;
}): JSX.Element => {
  const handleClick = React.useCallback(() => {
    onClick?.(store);
  }, [onClick, store]);
  return (
    <ListItemButton
      selected={selected}
      key={store._id}
      onClick={handleClick}
      sx={{ width: 400, flexGrow: 0 }}
    >
      <ListItemIcon>
        <StorefrontIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        sx={{ maxWidth: 300 }}
        primaryTypographyProps={{ variant: 'body2' }}
        secondaryTypographyProps={{ variant: 'caption' }}
        primary={store.name}
        secondary={store.address}
      />
      {showOpenInNewTab ? (
        <ListItemIcon
          sx={{ marginLeft: 2 }}
          onClick={(): void => {
            window.open(
              `https://maps.google.com/?q=${store.location.lat},${store.location.lng}`,
              '_blank',
            );
          }}
        >
          <OpenInNewIcon fontSize="small" />
        </ListItemIcon>
      ) : null}
    </ListItemButton>
  );
};
