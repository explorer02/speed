import * as React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// icons
import StorefrontIcon from '@mui/icons-material/Storefront';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// styles
import { centerAll, expandXY } from 'styles/styleObjects';

// type
import { Store } from 'types/store';

const StoreList = ({
  stores,
  selectedStore,
  onClick,
}: {
  stores: Store[];
  selectedStore?: Store;
  onClick?: (store: Store) => void;
}): React.ReactElement => (
  <Box {...expandXY} {...centerAll} flexDirection="column">
    <Typography variant="h4">Stores</Typography>
    <List>
      {stores.map((store) => (
        <ListItemButton
          selected={selectedStore?.id === store.id}
          key={store.id}
          onClick={(): void => onClick?.(store)}
        >
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText sx={{ maxWidth: 300 }} primary={store.name} secondary={store.address} />
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
        </ListItemButton>
      ))}
    </List>
  </Box>
);

const MemoizedStoreList = React.memo(StoreList);
export { MemoizedStoreList as StoreList };
