// lib
import * as React from 'react';

// components
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// icons
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
    <ListItemButton selected={selected} key={store.id} onClick={handleClick}>
      <ListItemIcon>
        <StorefrontIcon />
      </ListItemIcon>
      <ListItemText sx={{ maxWidth: 300 }} primary={store.name} secondary={store.address} />
      {showOpenInNewTab ? (
        <ListItemIcon
          onClick={(): void => {
            window.open(
              `https://maps.google.com/?q=${store.location.lat},${store.location.lng}`,
              '_blank',
            );
          }}
        >
          <OpenInNewIcon />
        </ListItemIcon>
      ) : null}
    </ListItemButton>
  );
};
