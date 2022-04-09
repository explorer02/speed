// components
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

// hooks
import { useLocalStorage } from 'hooks/useLocalStorage';

// constants
import { AdminItem, ADMIN_ITEMS, ADMIN_ITEMS_MAP, ADMIN_ITEM_ID_MAP } from './config';
import { centerVertically } from 'styles/styleObjects';
import { EMPTY_OBJECT } from 'constants/empty';

// types
import { ValueOf } from 'types/generic';

export const AdminContainer = (): JSX.Element => {
  const [selectedItemId, setSelectedItemId] = useLocalStorage<ValueOf<typeof ADMIN_ITEM_ID_MAP>>(
    'admin_container_item_id',
    ADMIN_ITEM_ID_MAP.VIEW_ORDERS,
  );

  const selectedItem = selectedItemId
    ? ADMIN_ITEMS_MAP[selectedItemId]
    : (EMPTY_OBJECT as AdminItem);

  const { Component } = selectedItem;

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {ADMIN_ITEMS.map((item) => (
          <Box {...centerVertically} gap={4}>
            <Typography width={70}>{item.category}</Typography>
            <ButtonGroup inputMode="text">
              {item.items.map((_item) => (
                <Button
                  variant={_item.id === selectedItemId ? 'contained' : 'outlined'}
                  onClick={(): void => setSelectedItemId(_item.id)}
                >
                  {_item.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        ))}
      </Box>
      <Box mt={8}>{Component ? <Component /> : null}</Box>
    </Box>
  );
};
