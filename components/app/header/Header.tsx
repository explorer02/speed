// lib
import * as React from 'react';

// components
import { Typography, Box } from '@mui/material';
import { LightModeButton } from './LightModeButton';

// constants
import { centerVertically } from 'styles/styleObjects';

const Header = ({ title }: { title: string }): JSX.Element => (
  <Box {...centerVertically} justifyContent="space-between" id="header" px={4} pt={2}>
    <Typography variant="h6" fontWeight={600}>
      {title}
    </Typography>
    <LightModeButton />
  </Box>
);

const MemoizedHeader = React.memo(Header);
export { MemoizedHeader as Header };
