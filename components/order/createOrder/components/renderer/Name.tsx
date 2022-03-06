// lib
import * as React from 'react';

// components
import { Box, Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

// constants
import { centerVertically } from 'styles/styleObjects';

// types
import { ColumnRendererProps } from 'reusable/table';
import { Item } from 'types/store';

export const Name = ({ value, entity: item }: ColumnRendererProps<Item>): JSX.Element => (
  <Box {...centerVertically} gap={3}>
    <Typography maxWidth="100%">{value}</Typography>
    <Tooltip title={item.description}>
      <InfoIcon fontSize="small" color="action" />
    </Tooltip>
  </Box>
);
