// lib
import { useMemo, useCallback, Suspense, memo } from 'react';

// components
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { ADMIN_ITEMS } from './config';
import { centerVertically } from 'styles/styleObjects';

// hooks

// helpers

// constants

// types

type Props = {};

export const AdminContainer = (): JSX.Element => (
  <Box display="flex" flexDirection="column" gap={2}>
    {ADMIN_ITEMS.map((item) => (
      <Box {...centerVertically} gap={4}>
        <Typography width={70}>{item.category}</Typography>
        <ButtonGroup inputMode="text">
          {item.items.map((_item) => (
            <Button>{_item.label}</Button>
          ))}
        </ButtonGroup>
      </Box>
    ))}
  </Box>
);
